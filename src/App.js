import PageHeader from './components/PageHeader';
import { Routes, Route } from 'react-router-dom';
import { MasterLayout } from './components/Styles';
import OpenedPages from './routers/OpenedPages';
import EmissionSource from './routers/EmissionSource';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <MasterLayout>
        <PageHeader />
        <Routes>
          <Route path="/*" element={<OpenedPages />} />
          <Route path="/e_s/*" element={<EmissionSource />} />
        </Routes>
      </MasterLayout>
    </RecoilRoot>
  );
}

export default App;
