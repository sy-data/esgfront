import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ManageWorkplace = lazy(() => import('../1_emission_source/ManageWorkplace'));
const SamplePage = lazy(() => import('../sample/SamplePage'));

const EmissionSource = () => {
  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route exact path="workplace" element={<ManageWorkplace />} />
        <Route exact path='sample' element={<SamplePage />} />
      </Routes>
    </Suspense>
  )
}

export default EmissionSource;
