import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";
import CorporationTarget from "../pages/6_target_result/6_1_corporation_target/CorporationTarget";
import FactoryTarget from "../pages/6_target_result/6_2_factory_target/FactoryTarget";
import CompanyPerformanceStatus from "../pages/6_target_result/6_3_company_performance_status/CompanyPerformanceStatus";
import PerformanceStatus from "../pages/6_target_result/6_4_factory_performance_status/PerformanceStatus";
import MonthlyPerformanceStatus from "../pages/6_target_result/6_5_factory_monthly_performance_status/PerformanceStatus";

const TargetResult = props => {
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
            <Route exact path={'corporation-target'} element={<CorporationTarget />} />
            <Route exact path={'factory-target'} element={<FactoryTarget />} />
            <Route exact path={'performance-status/company'} element={<CompanyPerformanceStatus />} />
            <Route exact path={'performance-status/factory'} element={<PerformanceStatus />} />
            <Route exact path={'performance-status/factory-monthly'} element={<MonthlyPerformanceStatus />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default TargetResult;
