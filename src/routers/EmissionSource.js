import { Suspense, lazy, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStateAtom } from "../States/auth/auth";
import { MainContent } from "../components/Styles";
import { getCookie } from "../States/storage/Cookie";
import LeftNavigation from "../components/LeftNavigation";
import PageNotFound from "../pages/99_error/PageNotFound";

const ManageEmissionProduct = lazy(() => import ('../pages/2_emission_management/2_1_manage_product/EmissionProductManagement'));
const ManageEmissionFuel = lazy(() => import ('../pages/2_emission_management/2_2_manage_fuel/EmissionFuelManagement'));
// const ManageEmissionParameter = lazy(() => import ('../pages/2_emission_management/2_3_manage_parameter/EmissionParameterManagement'));

const EmissionSource = () => {
  const userState = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);

  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="product" element={<ManageEmissionProduct/>} />
          <Route exact path="fuel" element={<ManageEmissionFuel />} />
          {/* <Route exact path="parameter" element={<ManageEmissionParameter />} /> */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionSource;
