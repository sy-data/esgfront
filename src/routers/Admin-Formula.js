import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const CalcGroupMgmt = lazy(() =>
  import(
    "../pages/A_1_formula_management/A_1_1_Calculation_group_management/CalcGroupMgmt"
  )
);

const RegCalcFormulaMgmt = lazy(() =>
  import(
    "../pages/A_1_formula_management/A_1_2_RegistrationCalculationFormula/RegCalcFormulaMgmt"
  )
);
const CalcFCHistoryInquiry = lazy(() =>
  import(
    "../pages/A_1_formula_management/A_1_3_CalculationFormulaChangeHistoryInquiry/CalcFCHistoryInquiry"
  )
);

const ParameterGroupManagement = lazy(() =>
  import(
    "../pages/A_1_formula_management/A_1_4_parameter_group_management/ParameterGroupManagement"
  )
);

const AdminFormula = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <MainContent>
      <Box
        sx={{
          width: "236px",
          padding: "0 14px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <NavigationTree
          items={props.items}
          stateAtom={props.stateAtom}
          leafAtom={props.leafAtom}
        />
      </Box>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="calcGroupMgmt" element={<CalcGroupMgmt />} />
          <Route
            exact
            path="regCalcFormulaMgmt"
            element={<RegCalcFormulaMgmt />}
          />
          <Route
            exact
            path="calcFCHistoryInquiry"
            element={<CalcFCHistoryInquiry />}
          />
          <Route
            exact
            path="groupManagement"
            element={<ParameterGroupManagement />}
          />
        </Routes>
      </Suspense>
    </MainContent>
  );
};

export default AdminFormula;
