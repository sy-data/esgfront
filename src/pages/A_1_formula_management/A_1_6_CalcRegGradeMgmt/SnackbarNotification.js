import React, { useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const SNACKBAR_AUTOHIDE_DURATION = 3000;
const ALERT_SEVERITY = "success";
const ALERT_MESSAGE = "저장되었습니다";

const SnackbarNotification = ({ openSnackbar, setOpenSnackbar }) => {
  const handleClose = useCallback(() => {
    setOpenSnackbar(false);
  }, [setOpenSnackbar]);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={SNACKBAR_AUTOHIDE_DURATION}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={ALERT_SEVERITY}
        sx={{ width: "100%" }}
      >
        {ALERT_MESSAGE}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
