import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainContent } from "../../components/Styles";
import LeftNavigation from "../../components/LeftNavigation";

const ManageWorkplace = lazy(() => import('../1_emission_source/ManageWorkplace'));
const SamplePage = lazy(() => import('../sample/SamplePage'));

const EmissionSource = () => {
  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="workplace" element={<ManageWorkplace />} />
          <Route exact path='sample' element={<SamplePage />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionSource;
