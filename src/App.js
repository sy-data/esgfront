import PageHeader from './components/PageHeader';
import { Routes, Route } from 'react-router-dom';
import { MasterLayout, MainContent } from './components/Styles';
import OpenedPages from './pages/routers/OpenedPages';
import EmissionSource from './pages/routers/EmissionSource';


function App() {
  return (
    <MasterLayout>
      <PageHeader />
      <MainContent>
        <Routes>
          <Route path="/*" element={<OpenedPages />} />
          <Route path="/e_s/*" element={<EmissionSource />} />
        </Routes>
      </MainContent>
    </MasterLayout>
  );
}

export default App;
