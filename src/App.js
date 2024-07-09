import { Routes, Route } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import { MasterLayout } from './components/Styles';
import OpenedPages from './routers/OpenedPages';
import FacilityInformation from './routers/FacilityInformation';
import EmissionSource from './routers/EmissionSource';
import ActivityData from './routers/ActivityData';
import EmissionAmount from './routers/EmissionAmount';
import EnergyUsage from './routers/EnergeUsage';
import TargetResult from './routers/TargetResult';
import Statistics from './routers/Statistics';
import Monitoring from './routers/Monitoring';
import AdminFuel from './routers/Admin-Fuel';
import AdminFormula from './routers/Admin-Formula';
import AdminManagement from './routers/Admin-Management';

import MenuList from './MenuList';
import { treeStateAtom, treeOpenedLeaf } from './States/leftNavigation/tree';

function App() {
  return (
    <MasterLayout>
      <PageHeader />
      <Routes>
        <Route path="/*" element={<OpenedPages />} />
        <Route exact path="/facility/*" element={<FacilityInformation />} />
        <Route exact path="/source/*" element={<EmissionSource />} />
        <Route exact path="/activity/*" element={<ActivityData />} />
        <Route exact path="/emissions/*" element={<EmissionAmount />} />
        <Route exact path="/usage/*" element={<EnergyUsage />} />
        <Route exact path="/target_result/*" element={<TargetResult />} />
        <Route exact path="/statistics/*" element={<Statistics />} />
        <Route exact path="/monitoring/*" element={<Monitoring />} />
        <Route exact path="/admin-formula/*" element={<AdminFormula items={MenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
        <Route exact path="/admin-fuel/*" element={<AdminFuel items={MenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
        <Route exact path="/admin-management/*" element={<AdminManagement items={MenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
