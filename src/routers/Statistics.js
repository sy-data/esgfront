import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";
import PageNotFound from "../pages/99_error/PageNotFound";

const EmissionsStatus = lazy(() => import("../pages/7_statistics/7_1_emissions_status/EmissionsStatus"));
const ProductionEmissions = lazy(() => import("../pages/7_statistics/7_3_production_emissions/productionEmissions"));
const ProductionEnergy = lazy(() => import("../pages/7_statistics/7_4_product_energy/productionEnergy"));
const EnergyUsage = lazy(() => import("../pages/7_statistics/7_5_energy_usage/energyUsage"));
const EnergyCosts = lazy(() => import("../pages/7_statistics/7_6_energy_costs/energyCosts"));

const Statistics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="emissions-status" element={<EmissionsStatus />} />
          <Route exact path="production-emiisions" element={<ProductionEmissions />} />
          <Route exact path="production-energy" element={<ProductionEnergy />} />
          <Route exact path="energy-usage" element={<EnergyUsage />} />
          <Route exact path="energy-costs" element={<EnergyCosts />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  );
};

export default Statistics;
