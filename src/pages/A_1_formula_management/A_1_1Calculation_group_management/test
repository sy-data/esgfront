import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { parameterGroupListDummy } from "./CalculationGroupManagementList";

const AddButton = styled(Button)({
  width: "122px",
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  borderRadius: "8px",
  background: "var(--Primary-Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%" /* 21px */,
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
  marginBottom: "16px",
  marginRight: "8px",
});

const DeleteButton = styled(Button)({
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  flex: "1 0 0",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  color: "var(--Gray-111, #111)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%" /* 21px */,
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
  marginRight: "10px",
});

const StyledMenuTitleContainer = styled("div")({
  color: "#000",
  fontFamily: "Pretendard Variable",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "-0.36px",
});

const TitleButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ButtonContainer = styled("div")({
  display: "flex",
});

const ParameterGroupTableTitle = (props) => {
  const { setData, selectedRow, editRowId, setEditRowId } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleAddRow = () => {
    setData((prevState) => {
      const newNo = prevState[0].id + 1;

      const defaultGroup = parameterGroupListDummy[0];
      const newRow = {
        no: newNo,
        id: newNo,
        groupId: defaultGroup.groupId,
        groupName: defaultGroup.groupName,
        description: "",
      };
      return [newRow, ...prevState];
    });

    setEditRowId(-1);
  };

  const handleDeleteButton = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TitleButtonContainer>
        <StyledMenuTitleContainer>산정식 기본 정보</StyledMenuTitleContainer>
        <ButtonContainer>
          <AddButton onClick={handleAddRow} disabled={editRowId !== null}>
            그룹 추가
          </AddButton>
          <DeleteButton
            onClick={handleDeleteButton}
            disabled={selectedRow.length === 0}
          >
            삭제
          </DeleteButton>
        </ButtonContainer>
      </TitleButtonContainer>

      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDialog={handleCloseDialog}
        selectedRow={selectedRow}
        setData={setData}
      />
    </>
  );
};

export default ParameterGroupTableTitle;

const DeleteDialog = (props) => {
  const { openDeleteDialog, handleCloseDialog, selectedRow, setData } = props;

  const handleDeleteConfirmButtonClick = () => {
    setData((prevState) =>
      prevState.filter((v) => !selectedRow.includes(v.id))
    );
    handleCloseDialog();
  };

  return (
    <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
      <DialogTitle>그룹삭제</DialogTitle>

      <DialogContent>
        <DialogContentText>
          선택하신 {selectedRow.length}개의 항목을 삭제 하시겠습니까?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog}>취소</Button>
        <Button onClick={handleDeleteConfirmButtonClick}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};
