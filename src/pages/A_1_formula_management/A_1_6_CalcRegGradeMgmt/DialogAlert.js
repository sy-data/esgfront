import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DIALOG_TITLE = "잘못된 날짜 선택";
const CONFIRM_BUTTON_TEXT = "확인";

const DialogAlert = ({ open, handleClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{DIALOG_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {CONFIRM_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogAlert);
