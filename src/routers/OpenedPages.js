import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageFooter from "../components/PageFooter";
import PageNotFound from "../pages/99_error/PageNotFound";

const Index = lazy(() => import("../pages/0_opened/Index"));
const SignUp = lazy(() => import('../pages/0_opened/Signup'))
const Login = lazy(() => import("../pages/0_opened/Login"));
const LoginFail = lazy(() => import("../pages/0_opened/LoginFail"));
const PasswordUpdate = lazy(() => import("../pages/0_opened/PasswordUpdate"));
const UserFind = lazy(() => import("../pages/0_opened/UserFind"));
const Unauthorized = lazy(() => import("../pages/99_error/Unauthorized"));
const PageNotFound = lazy(() => import("../pages/99_error/PageNotFound"));

const OpenedPages = () => {
  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/loginFaile" element={<LoginFail />} />
        <Route exact path="/passwordUpdate" element={<PasswordUpdate />} />
        <Route exact path="/UserFind" element={<UserFind />} />
        <Route exact path="/unauthorized" element={<Unauthorized />} />
        <Route exact path='/signup/*' element={<SignUp />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <PageFooter />
    </Suspense>
  );
};

export default OpenedPages;
