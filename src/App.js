import PageHeader from './components/PageHeader';
import { Routes, Route } from 'react-router-dom';
import { MasterLayout } from './components/Styles';
import OpenedPages from './pages/routers/OpenedPages';
import EmissionSource from './pages/routers/EmissionSource';


function App() {
  return (
    <MasterLayout>
      <PageHeader />
      <Routes>
        <Route path="/*" element={<OpenedPages />} />
        <Route path="/e_s/*" element={<EmissionSource />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
