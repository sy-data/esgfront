import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const UsageByCompany = lazy(() => import('../pages/5_usage/5_2_company/ByCompany'));
const UsageByWorkplace = lazy(() => import('../pages/5_usage/5_3_workplace/ByWorkplace'));
const UsageByFuel = lazy(() => import('../pages/5_usage/5_4_fuel/ByFuel'));
const UsageByScope = lazy(() => import('../pages/5_usage/5_5_scope/ByScope'));

const EnergyUsage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);
  
  return (
    <MainContent>
      <NavigationTree />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="company" element={<UsageByCompany />} />
          <Route exact path="workplace" element={<UsageByWorkplace />} />
          <Route exact path="fuel" element={<UsageByFuel />} />
          <Route exact path="scope" element={<UsageByScope />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EnergyUsage;
