import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ display: "flex", alignItems: "center", height: "40px", padding: "0px 20px", backgroundColor: "lightgreen" }}>
      <div style={{ flexGrow: 1, padding: "10px 20px" }} onClick={() => navigate("/")}>E-Scope+</div>
      <div style={{ padding: "10px 20px" }} onClick={() => navigate("/esgran")}>ESG란?</div>
      <div style={{ padding: "10px 20px" }} onClick={() => navigate("/tanso")}>탄소배출관리</div>
      <div style={{ padding: "10px 20px" }} onClick={() => navigate("/muni")}>문의하기</div>
    </div>
  )
}

export default PageHeader;
