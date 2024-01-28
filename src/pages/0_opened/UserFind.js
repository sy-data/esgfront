import React, { useState } from "react";
import { Paper, Typography, Button, Grid, TextField, Container } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 변경 처리 함수
  const handlePasswordChange = () => {
    // 여기에 비밀번호 변경 로직 구현
    console.log("Password changed to: ", password);
  };

  // 나중에 변경 처리 함수
  const handleLater = () => {
    // 여기에 나중에 변경 로직 구현
    console.log("Decided to change password later.");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
        <Paper elevation={4} style={{ padding: "2em", textAlign: "center", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
            <HelpOutlineIcon color="primary" style={{ fontSize: "3rem", marginRight: "1rem" }} />
            <Typography variant="h5">아이디/비밀번호 찾기</Typography>
          </div>
          <Typography variant="body1" gutterBottom>
            아이디를 잊으셨나요?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            아이디 확인을 위해 사업자 등록번호를 입력해 주세요.
          </Typography>
          <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "2rem" }}>
            <Grid item style={{ marginRight: "1rem" }}>
              <label>사업자등록번호</label>
            </Grid>
            <Grid item xs={2}>
              <TextField fullWidth variant="outlined" required />
            </Grid>
            <div style={{ width: "15px", height: "2px", backgroundColor: "black", margin: "0 10px" }} />
            <Grid item xs={1}>
              <TextField fullWidth variant="outlined" required />
            </Grid>
            <div style={{ width: "15px", height: "2px", backgroundColor: "black", margin: "0 10px" }} />
            <Grid item xs={4}>
              <TextField fullWidth variant="outlined" required />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "2rem" }}
            onClick={handlePasswordChange}
          >
            아이디 찾기
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
};

export default PasswordUpdate;
