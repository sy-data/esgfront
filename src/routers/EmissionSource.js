import { Suspense, lazy, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStateAtom } from "../States/auth/auth";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";
import PageNotFound from "../pages/99_error/PageNotFound";

const ManageEmissionProduct = lazy(() => import ('../pages/2_emission_management/2_1_manage_product/EmissionProductManagement'));
const ManageEmissionFuel = lazy(() => import ('../pages/2_emission_management/2_2_manage_fuel/EmissionFuelManagement'));
const SamplePage = lazy(() => import('../pages/sample/SamplePage'));

const EmissionSource = () => {
  const userState = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState === null) {
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
          <Route exact path='sample' element={<SamplePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionSource;
