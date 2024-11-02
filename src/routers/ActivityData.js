import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";
import ActivityDataAdd from "../pages/3_activity_data/3-1_activtity_data_add/activityDataAdd";
import EnergyCostAdd from "../pages/3_activity_data/3-2_energy_cost_add/energyCostAdd";
import SewageWastewaterAdd from "../pages/3_activity_data/3-3_sewage_wastewater_activity_add/sewageWastewaterAdd";
import SteamAdd from "../pages/3_activity_data/3-4_steam_information_add/steamAdd";
import ProductionAdd from "../pages/3_activity_data/3-5_production_activity_add/productionAdd";

const ActivityData = props => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/unauthorized");
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
          <Route exact path="activityDataAdd" element={<ActivityDataAdd />} />
          <Route exact path="energyCostAdd" element={<EnergyCostAdd />} />
          <Route exact path="sewageWastewaterAdd" element={<SewageWastewaterAdd />} />
          <Route exact path="steamAdd" element={<SteamAdd />} />
          <Route exact path="productionAdd" element={<ProductionAdd />} />
        </Routes>
      </Suspense>
    </MainContent>
  );
};

export default ActivityData;
