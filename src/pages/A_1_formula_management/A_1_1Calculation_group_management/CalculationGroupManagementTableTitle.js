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

// 스타일이 적용된 AddButton 컴포넌트 정의
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

// 스타일이 적용된 DeleteButton 컴포넌트 정의
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

// 스타일이 적용된 메뉴 제목 컨테이너 정의
const StyledMenuTitleContainer = styled("div")({
  color: "#000",
  fontFamily: "Pretendard Variable",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "-0.36px",
});

// 버튼 컨테이너 스타일 정의
const TitleButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const ButtonContainer = styled("div")({
  display: "flex",
});

const ParameterGroupTableTitle = (props) => {
  // props로 전달된 값들 추출
  const { setData, selectedRow, editRowId, setEditRowId } = props;

  // 삭제 다이얼로그의 열림 상태 관리
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // 행 추가 함수
  const handleAddRow = () => {
    setData((prevState) => {
      const newNo = prevState[0].id + 1; // 새로운 행의 번호 계산

      const defaultGroup = parameterGroupListDummy[0]; // 기본 그룹 설정
      const newRow = {
        no: newNo,
        id: newNo,
        groupId: defaultGroup.groupId,
        groupName: defaultGroup.groupName,
        description: "",
      };
      return [newRow, ...prevState]; // 새로운 행 추가
    });

    setEditRowId(-1); // 편집 모드 설정
  };

  // 삭제 버튼 클릭 처리 함수
  const handleDeleteButton = () => {
    setOpenDeleteDialog(true); // 삭제 다이얼로그 열기
  };

  // 삭제 다이얼로그 닫기 처리 함수
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false); // 삭제 다이얼로그 닫기
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

// 삭제 다이얼로그 컴포넌트 정의
const DeleteDialog = (props) => {
  const { openDeleteDialog, handleCloseDialog, selectedRow, setData } = props;

  // 삭제 확인 버튼 클릭 처리 함수
  const handleDeleteConfirmButtonClick = () => {
    setData(
      (prevState) => prevState.filter((v) => !selectedRow.includes(v.id)) // 선택된 행 삭제
    );
    handleCloseDialog(); // 다이얼로그 닫기
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
