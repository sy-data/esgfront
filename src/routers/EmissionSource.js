import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";
import PageNotFound from "../pages/99_error/PageNotFound";

const ManageEmissionProduct = lazy(() => import ('../pages/2_emission_management/2_1_manage_product/EmissionProductManagement'));
const SamplePage = lazy(() => import('../pages/sample/SamplePage'));

const EmissionSource = () => {
  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="product" element={<ManageEmissionProduct/>} />
          <Route exact path='sample' element={<SamplePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionSource;
