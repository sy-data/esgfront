import { Suspense, lazy, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStateAtom } from "../States/auth/auth";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const EnergyUsage = () => {
  const userState = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState === null) {
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

export default EnergyUsage;
