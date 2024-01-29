import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageFooter from "../components/PageFooter";

const Index = lazy(() => import("../pages/0_opened/Index"));
const Esgran = lazy(() => import("../pages/0_opened/Esgran"));
const Tanso = lazy(() => import("../pages/0_opened/Tanso"));
const Muni = lazy(() => import("../pages/0_opened/Muni"));
const Login = lazy(() => import("../pages/0_opened/Login"));
const LoginFail = lazy(() => import("../pages/0_opened/LoginFail"));
const Unauthorized = lazy(() => import("../pages/99_error/Unauthorized"));
const PageNotFound = lazy(() => import("../pages/99_error/PageNotFound"));

const OpenedPages = () => {
  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route exact path="/esgran" element={<Esgran />} />
        <Route exact path="/tanso" element={<Tanso />} />
        <Route exact path="/muni" element={<Muni />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/loginFaile" element={<LoginFail />} />
        <Route exact path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <PageFooter />
    </Suspense>
  );
};

export default OpenedPages;
