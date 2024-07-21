import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const EmissionByCompany = lazy(() => import('../pages/4_emissions/4_2_company/ByCompany'));
const EmissionByWorkplace = lazy(() => import('../pages/4_emissions/4_3_workplace/ByWorkplace'));
const EmissionByFuel = lazy(() => import('../pages/4_emissions/4_4_fuel/ByFuel'));
const EmissionByScope = lazy(() => import('../pages/4_emissions/4_5_scope/ByScope'));

const EmissionAmount = props => {
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
          <Route exact path="company" element={<EmissionByCompany />} />
          <Route exact path="workplace" element={<EmissionByWorkplace />} />
          <Route exact path="fuel" element={<EmissionByFuel />} />
          <Route exact path="scope" element={<EmissionByScope />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default EmissionAmount;
