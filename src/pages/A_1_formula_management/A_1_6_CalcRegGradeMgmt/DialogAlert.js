import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DialogAlert = ({ open, handleClose, message }) => {
  return (
    <Dialog
      open={open} // open 상태에 따라 Dialog를 열거나 닫음
      onClose={handleClose} // Dialog 외부를 클릭하거나 닫기 버튼을 클릭할 때 호출되는 핸들러
      aria-labelledby="alert-dialog-title" // 접근성을 위한 타이틀 ID 설정
      aria-describedby="alert-dialog-description" // 접근성을 위한 설명 ID 설정
    >
      <DialogTitle id="alert-dialog-title">{"잘못된 날짜 선택"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message} {/* props로 전달된 메시지를 표시 */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
