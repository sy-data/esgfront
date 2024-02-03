import { Suspense, lazy, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStateAtom } from "../States/auth/auth";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const ManageWorkplace = lazy(() => import('../pages/1_facility_information/1_1_manage_workplace/ManageWorkplace'));
const ManageFacility = lazy(() => import('../pages/1_facility_information/1_2_manage_facility/ManageFacility'));
const FacilityHistory = lazy(() => import('../pages/1_facility_information/1_3_facility_history/FacilityHistory'));

const FacilityInformation = () => {
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
          <Route exact path="workplace" element={<ManageWorkplace />} />
          <Route exact path="information" element={<ManageFacility />} />
          <Route exact path="history" element={<FacilityHistory />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default FacilityInformation;
