import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";
import CorporationTarget from "../pages/6_target_result/6_1_corporation_target/CorporationTarget";

const TargetResult = () => {
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
            <Route exact path={'corporation-target'} element={<CorporationTarget />} />
        </Routes>
      </Suspense>
    </MainContent>
  )
}

export default TargetResult;
