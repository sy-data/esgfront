import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const FuelMapping = lazy(() => import ('../pages/A_2_fuel_management/A_2_1_fuel_mapping/FuelMapping'));
const FuelCost = lazy(() => import ('../pages/A_2_fuel_management/A_2_2_fuel_cost/FuelCost'));


const AdminFuel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);
  
  return (
    <MainContent>
      <LeftNavigation />
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
