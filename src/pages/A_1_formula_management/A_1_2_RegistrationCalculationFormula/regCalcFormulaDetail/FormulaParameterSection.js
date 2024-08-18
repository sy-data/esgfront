import {ButtonContainer, CancelButton, ConfirmButton, StyledMenuTitleContainer, TitleButtonContainer} from "../styles";
import {FormulaDetailSectionContainer} from "./styles";
import React, {useState} from "react";
import {useGridApiRef} from "@mui/x-data-grid";
import {FormulaParameterList} from "./FormulaParameterList";
import {ParameterGroupSearchModal} from "./ParameterGroupSearchModal";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const dummyData = Array.from({length: 50}, (_, index) => {
  return {
    no: index + 1,
    id: index + 1,
    parentGroupName: "배출량",
    groupId: "00010",
    groupName: "CO2배출량",
    inputType: '00733',
    inputTypeCode: '사용자입력값'
  }
})

/**
 * A_1_2. 산정식 등록 > 산정식 파라미터 섹션
 */
export const FormulaParameterSection = () => {
  const gridApiRef = useGridApiRef();

  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState([]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleClickAdd = () => {
    setIsSearchModalOpen(true);
  }

  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <FormulaDetailSectionContainer>
      <TitleButtonContainer>
        <StyledMenuTitleContainer>산정식 파라미터</StyledMenuTitleContainer>
        <ButtonContainer>
          <ConfirmButton onClick={handleClickAdd}>
            추가
          </ConfirmButton>
          <CancelButton
            onClick={handleClickDelete}
            disabled={selectedRow.length === 0}
          >
            삭제
          </CancelButton>
        </ButtonContainer>
      </TitleButtonContainer>

      <FormulaParameterList
        gridApiRef={gridApiRef}
        data={data}
        setData={setData}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />

      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDialog={handleCloseDialog}
        selectedRow={selectedRow}
        setData={setData}
      />

      <ParameterGroupSearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}/>
    </FormulaDetailSectionContainer>
  )
}

const DeleteDialog = (props) => {
  const {openDeleteDialog, handleCloseDialog, selectedRow, setData} = props;

  // 삭제 확인 버튼 클릭 처리 함수
  const handleDeleteConfirmButtonClick = () => {
    setData((prevState) =>
      prevState.filter((v) => !selectedRow.includes(v.id))
    ); // 선택된 행 삭제 (선택된 행의 id를 포함하지 않는 항목들로 필터링)
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
