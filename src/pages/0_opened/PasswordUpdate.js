import React, { useState } from "react";
import { Paper, Typography, Button, Grid, Icon, Container, TextField } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: "100%" }}>
        <Paper elevation={4} style={{ padding: "2em", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <WarningAmberIcon color="warning" style={{ fontSize: "3rem", marginRight: "1rem" }} />
            <Typography variant="h5" gutterBottom>
              비밀번호 재설정 안내
            </Typography>
          </div>
          <Typography variant="body1" gutterBottom style={{ marginTop: "2rem" }}>
            비밀번호를 잊으셨나요?
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "1em" }}>
            비밀번호는 8자 이상의 영문, 숫자, 특수문자
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "1em" }}>
            조합으로 입력해 주세요.
          </Typography>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="새 비밀번호"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="비밀번호를 입력하세요"
                variant="outlined"
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", marginTop: "1rem", display: "flex", justifyContent: "space-around" }}
          >
            <Button variant="outlined" color="primary" className="ly-padding-xm">
              비밀번호 변경
            </Button>
            <Button variant="outlined" color="primary" className="ly-padding-xm">
              나중에 변경
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default PasswordUpdate;
