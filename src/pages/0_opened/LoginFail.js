import React, { useCallback } from "react";
import { Paper, Typography, Button, Grid, Icon, Container } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useRecoilState } from "recoil";
import { loginFailCountAtom } from "../../States/auth/auth";
import { useNavigate } from "react-router-dom";

const LoginFail = () => {
  const [loginFailCount, setLoginFailCount] = useRecoilState(loginFailCountAtom);

  const navigate = useNavigate();

  const goLoginPage = useCallback(() => {
    navigate("/login");
  }, []);

  return (
    <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: "100%" }}>
        <Paper elevation={4} style={{ padding: "2em", textAlign: "center" }}>
          <WarningAmberIcon color="warning" style={{ fontSize: "3rem" }} />
          <Typography variant="h5" gutterBottom>
            비밀번호 재설정 안내
          </Typography>
          <Typography variant="body1" gutterBottom>
            등록되지 않은 아이디거나, 비밀번호를 잘못 입력하셨습니다.
          </Typography>
          <Typography variant="body1" gutterBottom>
            아이디 또는 비밀번호를 다시 확인하세요
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "1em" }}>
            로그인 실패 횟수 제한 5회 중 {loginFailCount}회 실패
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "1em" }}>
            5회 실패 시 계정이 잠깁니다.
          </Typography>

          <Button variant="outlined" color="primary" onClick={goLoginPage}>
            로그인 페이지로 가기
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
};

export default LoginFail;
