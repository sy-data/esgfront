import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";
import PageNotFound from "../pages/99_error/PageNotFound";

const EmissionsStatus = lazy(() => import ('../pages/7_statistics/7_1_emissions_status/EmissionsStatus'));

const Statistics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);
  
  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="emissions-status" element={<EmissionsStatus />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default Statistics;
