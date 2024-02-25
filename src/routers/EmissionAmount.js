import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const EmissionByCompany = lazy(() => import('../pages/4_emissions/4_2_company/ByCompany'));
const EmissionByWorkplace = lazy(() => import('../pages/4_emissions/4_3_workplace/ByWorkplace'));
const EmissionByFuel = lazy(() => import('../pages/4_emissions/4_4_fuel/ByFuel'));
const EmissionByScope = lazy(() => import('../pages/4_emissions/4_5_scope/ByScope'));

const EmissionAmount = () => {
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
          <Route exact path="company" element={<EmissionByCompany />} />
          <Route exact path="workplace" element={<EmissionByWorkplace />} />
          <Route exact path="fuel" element={<EmissionByFuel />} />
          <Route exact path="scope" element={<EmissionByScope />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionAmount;
