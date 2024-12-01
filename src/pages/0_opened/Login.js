import React, { useCallback, useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Container, Checkbox, FormControlLabel, Link, Paper } from "@mui/material";
import "../../style/auth/login.css";
import { esgFetch } from "../../components/FetchWrapper";
import { userStateAtom, loginFailCountAtom } from "../../States/auth/auth";
import { Router, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getCookie, setCookie } from "../../States/storage/Cookie";
import loginLogo from "./images/loginLogo.svg"

//! 요구사항
// 1. 아이디, 비밀번호 미 입력 시 모달 출력 (하나라도 입력 안했을 시) -> 아이디, 비번 팝업 (완료)
// 3. 아이디 비번 중 1가지라도 잘못 입력 시 로그인 실패 페이지 이동 (완료)
// 4. 회원 가입 페이지 이동 (완료)
// 5. 아이디 저장 체크박스 기능 (완료)
//   - 로그인 성공 시 로컬 스토리지에 저장
// 2. 비밀번호 재 설정 기한이 지났을 시 안내 페이지 이동 (미 개발)
// - 기한? 백앤드에서 알려주는거? update 기준으로 하는 것?

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("esguser1");
  const [password, setPassword] = useState("123456");
  const [isChecked, setIsChecked] = useState(true);
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const [loginFailCount, setLoginFailCount] = useRecoilState(loginFailCountAtom);
  const [processing, setProcessing] = useState(false);

  const saveId = (id) => {
    setCookie("user_id", id);
  };
  useEffect(() => {
    if (getCookie("user_id")) {
      setId(getCookie("user_id"));
    }
  });

  const checkPasswordDate = (date) => {
    const currendtDate = new Date();
    const passwordDate = new Date(date);

    currendtDate.setMonth(currendtDate.getMonth() + 3);

    if (currendtDate > passwordDate) {
      navigate("/changePassword");
    }
  };

  const onLogin = async (e) => {
    // localStorage.setItem("token", "tempToken");
    // setCookie("token", "tempToken");
    // const user = {
    //   email: "test@test.test",
    // }
    // e.preventDefault();
    if (id === "" || password === "") {
      if (id === "") alert("아이디를 입력해주세요");
      if (password === "") alert("비밀번호를 입력해주세요");
      return;
    }
    setProcessing(true);
    const session = await esgFetch("/account/login-id", "POST", {provideruserid : id, password: password}).then(res=>res.json());
    if("id" in session) {
      localStorage.setItem("__session", session.id);
      
      const userInfo = await esgFetch("/account/user-info").then(res=>res.json());
      //userInfo ==>>
      // {
      //     "id": "ID6",
      //     "uid": "e56bfca0487b46a",
      //     "providerid": "id",
      //     "email": null,
      //     "displayname": "담당",
      //     "emailverified": null,
      //     "photourl": null,
      //     "disabled": null,
      //     "isadmin": null,
      //     "platform": "E-SCOPE",
      //     "metadata": {
      //         "company_id": "COM5"
      //     }
      // }
      if("displayname" in userInfo){
        setLoginFailCount(0);
        setUserState({
          ...userInfo,
          expires_at: session.expires_at
        });
        navigate("/facility/workplace");
        return;
      }
      alert("유저 정보 업데이트 실패");
    }
    setProcessing(false);
    setLoginFailCount(loginFailCount + 1);
    navigate("/loginFaile");

    // if (user) {
    //   // checkPasswordDate(user.password_date);
    //   // setUserState(user);
    //   // saveId(user.email);
    //   // setLoginFailCount(0);
    //   // navigate("/emissions");
    // } else if (user === undefined) {
    //   setLoginFailCount(loginFailCount + 1);
    //   navigate("/loginFaile");
    // }
  };
  // useEffect(() => {
  //   onLogin();
  // }, []);

  const onJoin = () => {
    navigate("/signup");
  };

  const onFindIdPassword = () => {
    navigate("/UserFind");
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "40px"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "16px"}}>
          <Typography style={{color: "var(--Gray-111, #111)",
            fontFamily: "Pretendard Variable",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "150%", /* 36px */
            letterSpacing: "-0.48px", textAlign: "center"}}
          >
            쉽고 빠르게 시작하는 탄소배출관리
          </Typography>
          <img alt="" src={loginLogo} />
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
            <Typography style={{color: "var(--Gray-111, #111)",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%", /* 21px */
              letterSpacing: "-0.28px"}}>
              로그인
            </Typography>
            <input
              value={id}
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={(e) => setId(e.target.value)}
              style={{display: "flex", width: "460px", padding: "10px 16px", alignItems: "center",
              borderRadius: "8px",
              border: "1px solid var(--Gray-eee, #EEE)",
              background: "var(--Gray-fff, #FFF)"}}
            />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
            <Typography style={{color: "var(--Gray-111, #111)",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%", /* 21px */
              letterSpacing: "-0.28px"}}>
              비밀번호
            </Typography>
            <input
              value={password}
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
              style={{display: "flex", width: "460px", padding: "10px 16px", alignItems: "center",
              borderRadius: "8px",
              
              border: "1px solid var(--Gray-eee, #EEE)",
              background: "var(--Gray-fff, #FFF)"
            }}>
            </input>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", width: "100%"}}>
          <div style={{marginRight: "auto", display: "flex", alignItems: "center"}}>
            <input type="checkbox" id="rememberId" />
            <label 
              for="rememberId"
              style={{color: "var(--Gray-111, #111)",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontWeight: 600,
              marginLeft: "6px"}}
            >
              <span className="custom-checkbox"></span>
              아이디저장
            </label>
          </div>
          {processing ? 
            <Button
              fullWidth
              disabled
              variant="btnDisabled"
            >
              처리중 입니다
            </Button>
            :
            <Button
              fullWidth
              onClick={onLogin}
              {...{
                disabled: !(id && password),
                variant: (id && password) ? "btnActive": "btnDisabled"
              }}
            >
              로그인
            </Button>
          }
        </div>
        <div
          style={{
            display: "flex", alignItems: "center", gap: "14px", height: "21px",
            fontFamily: "Pretendard Variable", fontSize: "14px",fontWeight: 600
          }}
        >
          <div style={{cursor: "pointer"}} onClick={() => onJoin()}>회원가입</div>
          <div style={{width: "1px", height: "14px", backgroundColor: "black"}}/>
          <div style={{cursor: "pointer"}} onClick={() => onFindIdPassword()}>아이디/비밀번호 찾기</div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
