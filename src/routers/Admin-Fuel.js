import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const FuelMapping = lazy(() => import ('../pages/A_2_fuel_management/A_2_1_fuel_mapping/FuelMapping'));
const FuelCost = lazy(() => import ('../pages/A_2_fuel_management/A_2_2_fuel_cost/FuelCost'));


const AdminFuel = props => {
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
        minWidth: '236px',
        padding: '0 14px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflow: 'auto'
      }}>
        <NavigationTree items={props.items} stateAtom={props.stateAtom} leafAtom={props.leafAtom} />
      </Box>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path='mapping' element={<FuelMapping />} />
          <Route exact path='cost' element={<FuelCost />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default AdminFuel;
