import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const Monitoring = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/unauthorized');
    }
  }, []);

  return (
    <MainContent>
      <LeftNavigation />
      <Suspense fallback={"loading"}>
        <Routes>
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default Monitoring;
