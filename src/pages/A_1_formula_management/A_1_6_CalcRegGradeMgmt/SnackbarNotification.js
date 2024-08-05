import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ openSnackbar, setOpenSnackbar }) => {
  return (
    <Snackbar
      open={openSnackbar} // Snackbar의 열림 상태를 설정
      autoHideDuration={3000} // 3초 후 자동으로 닫히도록 설정
      onClose={() => setOpenSnackbar(false)} // Snackbar 닫기 핸들러 설정
    >
      <Alert
        onClose={() => setOpenSnackbar(false)} // Alert 닫기 핸들러 설정
        severity="success" // Alert의 심각도 설정 (성공 메시지로 설정)
        sx={{ width: "100%" }} // Alert의 스타일 설정 (전체 너비 차지)
      >
        저장되었습니다 {/* Alert에 표시할 메시지 */}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
