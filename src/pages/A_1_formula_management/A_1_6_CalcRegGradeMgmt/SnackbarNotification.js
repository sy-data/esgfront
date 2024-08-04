import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ openSnackbar, setOpenSnackbar }) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        저장되었습니다
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
