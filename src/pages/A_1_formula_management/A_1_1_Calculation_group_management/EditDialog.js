import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function EditDialog({ isDialogOpen, handleDialogClose }) {
  return (
    <Dialog //모달 대화 상자 컴포넌트
      open={isDialogOpen} // isDialogOpen이라는 boolean 값에 따라 Dialog가 열리거나 닫힘
      onClose={handleDialogClose} // Dialog가 닫힐 때 호출되는 함수, 주로 부모 컴포넌트에서 이 함수를 정의하여 상태를 변경
      aria-labelledby="alert-dialog-title" // 접근성을 위해 사용되는 속성입니다. 스크린 리더가 Dialog의 제목과 내용을 올바르게 읽을 수 있도록 함
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">저장되었습니다.</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          변경 사항이 성공적으로 저장되었습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
