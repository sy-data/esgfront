import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { getCookie } from "../States/storage/Cookie";
import { MainContent } from "../components/Styles";
import NavigationTree from "../components/navigationTree/NavigationTree";
import PageNotFound from "../pages/99_error/PageNotFound";

const ReportList = lazy(() => import("../pages/9_report/list/ReportList"));
const CreateReport = lazy(() => import("../pages/9_report/create/CreateReport"));

const Report = props => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <MainContent>
      <Box sx={{
        minWidth: '236px',
        padding: '0 14px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflow: 'auto'
      }}>
        <NavigationTree items={props.items} stateAtom={props.stateAtom} leafAtom={props.leafAtom} />
      </Box>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route exact path="list" element={<ReportList />} />
          <Route exact path="create" element={<CreateReport />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainContent>
  );
};

export default Report;
