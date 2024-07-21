import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const ManageWorkplace = lazy(() => import('../pages/1_facility_information/1_1_manage_workplace/ManageWorkplace'));
const ManageFacility = lazy(() => import('../pages/1_facility_information/1_2_manage_facility/ManageFacility'));
const FacilityHistory = lazy(() => import('../pages/1_facility_information/1_3_facility_history/FacilityHistory'));

const FacilityInformation = props => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);

  return (
    <MainContent>
      <Box sx={{
        width: '236px',
        padding: '0 14px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflow: 'auto'
      }}>
        <NavigationTree items={props.items} stateAtom={props.stateAtom} leafAtom={props.leafAtom} />
      </Box>
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
