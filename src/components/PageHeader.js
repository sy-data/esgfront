import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginDev } from "./FetchWrapper";

const HeaderContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  padding: '0px 20px',
  backgroundColor: 'lightgreen'
}));

const HeaderItem = styled('div')(() => ({
  padding: '10px 20px'
}));

const PageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <HeaderContainer>
      <HeaderItem style={{ flexGrow: 1 }} onClick={() => navigate("/")}>E-Scope+</HeaderItem>
      <HeaderItem onClick={() => navigate("/esgran")}>ESG란?</HeaderItem>
      <HeaderItem onClick={() => navigate("/tanso")}>탄소배출관리</HeaderItem>
      <HeaderItem onClick={() => navigate("/muni")}>문의하기</HeaderItem>
      <HeaderItem onClick={() => navigate("/signup")}>회원가입</HeaderItem>
      <div style={{width: '10px', textAlign: 'center'}} onClick={() => loginDev()}>|</div>
      <HeaderItem>로그인</HeaderItem>
    </HeaderContainer>
  )
}

export default PageHeader;
