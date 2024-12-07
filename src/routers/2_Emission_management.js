import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const ManageFuel = lazy(() => import('../pages/2_emission_management/2_1_manage_fuel/ManageFuel'));
const Monitoring = lazy(() => import('../pages/2_emission_management/2_2_monitoring/Monitoring'));

const EmissionManagement = props => {
  const navigate = useNavigate();

  return (
    <MainContent>
      <Box sx={{
        minWidth: '236px',
        padding: '0 14px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflow: 'auto'
      }}>
        <NavigationTree items={props.items} stateAtom={props.stateAtom} leafAtom={props.leafAtom} />
      </Box>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="fuel" element={<ManageFuel />} />
          <Route exact path="monitoring" element={<Monitoring />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionManagement;
