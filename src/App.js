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
        <Route exact path="/admin-formula/*" element={<AdminFormula />} />
        <Route exact path="/admin-fuel/*" element={<AdminFuel />} />
        <Route exact path="/admin-management/*" element={<AdminManagement />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
