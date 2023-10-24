import './App.css';
import Index from './pages/Index';
import Esgran from './pages/Esgran';
import Tanso from './pages/Tanso';
import Muni from './pages/Muni';
import PageHeader from './components/PageHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/esgran' element={<Esgran />} />
        <Route path='/tanso' element={<Tanso />} />
        <Route path='/muni' element={<Muni />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
