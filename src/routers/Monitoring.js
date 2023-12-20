import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainContent } from "../components/Styles";
import LeftNavigation from "../components/LeftNavigation";

const Monitoring = () => {
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
