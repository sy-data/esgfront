import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";

const CalculationGroupManagement = lazy(() =>
  import("../pages/A_0_Calculation_group_management/CalculationGroupManagement")
);

const ParameterGroupManagement = lazy(() =>
  import(
    "../pages/A_1_formula_management/A_1_4_parameter_group_management/ParameterGroupManagement"
  )
);

const AdminFormula = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <MainContent>
      <NavigationTree />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route
            exact
            path="CalculationGroupManagement"
            element={<CalculationGroupManagement />}
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
