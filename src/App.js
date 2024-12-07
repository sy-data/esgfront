import { Routes, Route } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import { MasterLayout } from './components/Styles';
import OpenedPages from './routers/OpenedPages';
import FacilityInformation from './routers/FacilityInformation';
import EmissionSource from './routers/EmissionSource';
import ActivityData from './routers/ActivityData';
import EmissionManagement from './routers/2_Emission_management';
import EnergyUsage from './routers/EnergeUsage';
import TargetResult from './routers/TargetResult';
import Statistics from './routers/Statistics';
import Monitoring from './routers/Monitoring';
import AdminFuel from './routers/Admin-Fuel';
import AdminFormula from './routers/Admin-Formula';
import AdminManagement from './routers/Admin-Management';
import Report from './routers/Report';

import AdminMenuList from './AdminMenuList';
import { treeStateAtom, treeOpenedLeaf } from './States/leftNavigation/adminTree';
import MenuList from './MenuList';
import { menuStateAtom, menuOpenedLeaf } from './States/leftNavigation/menuTree';

function App() {
  return (
    <MasterLayout>
      <PageHeader />
      <Routes>
        <Route path="/*" element={<OpenedPages />} />
        <Route exact path="/facility/*" element={<FacilityInformation items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/source/*" element={<EmissionSource items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/activity/*" element={<ActivityData items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/emissions/*" element={<EmissionManagement items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/usage/*" element={<EnergyUsage items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/target_result/*" element={<TargetResult items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/statistics/*" element={<Statistics items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/monitoring/*" element={<Monitoring items={MenuList} stateAtom={menuStateAtom} leafAtom={menuOpenedLeaf} />} />
        <Route exact path="/admin-formula/*" element={<AdminFormula items={AdminMenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
        <Route exact path="/admin-fuel/*" element={<AdminFuel items={AdminMenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
        <Route exact path="/admin-management/*" element={<AdminManagement items={AdminMenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
        <Route exact path="/report/*" element={<Report items={AdminMenuList} stateAtom={treeStateAtom} leafAtom={treeOpenedLeaf} />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
