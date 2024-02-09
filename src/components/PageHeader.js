import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../States/storage/Cookie";
import { useEffect, useState } from "react";

const HeaderContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  padding: "0px 20px",
  backgroundColor: "lightgreen",
}));

const HeaderItem = styled("div")(() => ({
  padding: "10px 20px",
}));

const PageHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    // 토큰의 존재 여부에 따라 로그인 상태를 설정합니다.
    setIsLogin(!!token);
  }, [setIsLogin, isLogin]);

  const onLoginOut = () => {
    removeCookie("token");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderItem style={{ flexGrow: 1 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>E-Scope+</span>
      </HeaderItem>
      {isLogin ? (
        <>
          <HeaderItem>내 정보</HeaderItem>
          <div style={{ width: "10px", textAlign: "center" }}>|</div>
          <HeaderItem style={{ cursor: 'pointer' }} onClick={onLoginOut}>로그아웃</HeaderItem>
        </>
      ) : (
        <>
          <HeaderItem>회원가입</HeaderItem>
          <div style={{ width: "10px", textAlign: "center" }}>|</div>
          <HeaderItem
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </HeaderItem>
        </>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;
