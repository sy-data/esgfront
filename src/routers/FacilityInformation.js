import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const ManageWorkplace = lazy(() => import('../pages/1_facility_information/1_1_manage_workplace/ManageWorkplace'));
const ManageFacility = lazy(() => import('../pages/1_facility_information/1_2_manage_facility/ManageFacility'));

const FacilityInformation = () => {
  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="workplace" element={<ManageWorkplace />} />
          <Route exact path="information" element={<ManageFacility />} />
          <Route exact path="history" element={<ManageWorkplace />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default FacilityInformation;
