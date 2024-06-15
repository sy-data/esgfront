import React, {useState} from "react";
import MenuTitle from "../../../components/MenuTitle";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled} from "@mui/material";


const TitleButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const ButtonContainer = styled('div')({
    display: 'flex',
});


const ParameterGroupTableTitle = (props) => {
    const { setData, selectedRow } = props;

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleAddRow = () => {
        setData(prevState => {
            // 새로 추가되는 행은 현재 가장 큰 No 다음 값으로 설정
            const newNo = prevState[0].id + 1;
            const newRow = { no: newNo, id: newNo, groupId: '', groupName: '', description: '' };
            return [newRow, ...prevState];
        });
    };

    const handleDeleteButton = () => {
        setOpenDeleteDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    }

    return (
        <>
            <TitleButtonContainer>
                <MenuTitle title={"파라미터 그룹 목록"}/>
                <ButtonContainer>
                    <Button onClick={handleAddRow}>그룹 추가</Button>
                    <Button onClick={handleDeleteButton} disabled={selectedRow.length === 0}>삭제</Button>
                </ButtonContainer>
            </TitleButtonContainer>

            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleCloseDialog={handleCloseDialog}
                selectedRow={selectedRow}
                setData={setData}
            />
        </>
    )
};

export default ParameterGroupTableTitle;

const DeleteDialog = (props) => {
    const {openDeleteDialog, handleCloseDialog, selectedRow, setData} = props;

    const handleDeleteConfirmButtonClick = () => {
        setData(prevState => prevState.filter(v => !selectedRow.includes(v.id)));
        handleCloseDialog()
    }

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
    )
}
