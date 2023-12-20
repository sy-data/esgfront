import PageHeader from './components/PageHeader';
import { Routes, Route } from 'react-router-dom';
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
      </Routes>
    </MasterLayout>
  );
}

export default App;
