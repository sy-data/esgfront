import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginDev } from "./FetchWrapper";
import { getCookie, removeCookie, useAuth } from "../States/storage/Cookie";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStateAtom } from "../States/auth/auth";

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
  const navigate = useNavigate();
  const isLogin = useAuth(); // useAuth 훅을 호출하여 로그인 상태를 확인합니다.
  const setUserState = useSetRecoilState(userStateAtom);
  const userState = useRecoilValue(userStateAtom);

  console.log(userState);
  const onLoginOut = () => {
    removeCookie("token");
    setUserState(null); // Recoil 상태를 초기화
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderItem style={{ flexGrow: 1 }} onClick={() => navigate("/")}>
        E-Scope+
      </HeaderItem>
      <HeaderItem onClick={() => navigate("/esgran")}>ESG란?</HeaderItem>
      <HeaderItem onClick={() => navigate("/tanso")}>탄소배출관리</HeaderItem>
      <HeaderItem onClick={() => navigate("/muni")}>문의하기</HeaderItem>
      {isLogin ? (
        <>
          <HeaderItem>내 정보</HeaderItem>
          <div style={{ width: "10px", textAlign: "center" }}>|</div>
          <HeaderItem onClick={onLoginOut}>로그아웃</HeaderItem>
        </>
      ) : (
        <>
          <HeaderItem>회원가입</HeaderItem>
          <div style={{ width: "10px", textAlign: "center" }}>|</div>
          <HeaderItem
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
