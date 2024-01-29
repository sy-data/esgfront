import PageHeader from './components/PageHeader';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getCookie } from './States/storage/Cookie';
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
  const isAuthenticated = () => {
    const token = getCookie('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <MasterLayout>
      <PageHeader />
      <Routes>
        <Route path="/*" element={<OpenedPages />} />
        <Route exact path="/facility/*" element={
            isAuthenticated() ? <FacilityInformation /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/source/*" element={
            isAuthenticated() ? <EmissionSource /> : <Navigate replace to="/unauthorized" />
          }
        />
        <Route exact path="/activity/*" element={
            isAuthenticated() ? <ActivityData /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/emissions/*" element={
            isAuthenticated() ? <EmissionAmount /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/usage/*" element={
            isAuthenticated() ? <EnergyUsage /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/target_result/*" element={
            isAuthenticated() ? <TargetResult /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/statistics/*" element={
            isAuthenticated() ? <Statistics /> : <Navigate replace to="/unauthorized" />
          } 
        />
        <Route exact path="/monitoring/*" element={
            isAuthenticated() ? <Monitoring /> : <Navigate replace to="/unauthorized" />
          } 
        />
      </Routes>
    </MasterLayout>
  );
}

export default App;
