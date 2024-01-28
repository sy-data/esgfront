import React, { useCallback, useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Container, Checkbox, FormControlLabel, Link, Paper } from "@mui/material";
import "../../style/auth/login.css";
import { loginDev } from "../../components/FetchWrapper";
import { userStateAtom, loginFailCountAtom } from "../../States/auth/auth";
import { Router, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getCookie, setCookie } from "../../States/storage/Cookie";

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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const [loginFailCount, setLoginFailCount] = useRecoilState(loginFailCountAtom);

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
    e.preventDefault();
    const date = new Date();
    console.log(date);
    const loginData = { id, password };

    if (id === "" || password === "") {
      if (id === "") alert("아이디를 입력해주세요");
      if (password === "") alert("비밀번호를 입력해주세요");
      return;
    }

    const user = await loginDev(loginData);

    if (user) {
      checkPasswordDate(user.password_date);
      setUserState(user);
      saveId(user.email);
      setLoginFailCount(0);
      navigate("/");
    } else if (user === undefined) {
      setLoginFailCount(loginFailCount + 1);
      navigate("/loginFaile");
    }
  };

  const onJoin = () => {
    navigate("/signup");
  };

  const onFindIdPassword = () => {
    navigate("/findIdPassword");
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: "100%" }}>
        <Paper elevation={3} style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              쉽고 빠르게 시작하는 탄소배출관리
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              E-Scope+
            </Typography>
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="아이디를 입력하세요"
                variant="outlined"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="비밀번호를 입력하세요"
                variant="outlined"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="saveId"
                    color="primary"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                }
                label="아이디 저장"
                style={{ justifyContent: "center" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" onClick={onLogin}>
                로그인
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Link href="#" variant="body2" className="ly-padding-xm" onClick={onJoin}>
                회원가입
              </Link>
              <Link href="#" variant="body2" className="ly-padding-xm" onClick={onFindIdPassword}>
                아이디/비밀번호 찾기
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Login;
