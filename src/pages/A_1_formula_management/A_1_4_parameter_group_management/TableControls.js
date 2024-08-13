import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { addButtonStyle, deleteButtonStyle } from "./Styles";

const TableControls = ({
  handleAddGroup,
  handleOpenDialog,
  handleCloseDialog,
  handleDeleteSelected,
  selected,
  openDialog,
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={addButtonStyle}
        onClick={handleAddGroup}
      >
        그룹 추가
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleOpenDialog}
        disabled={selected.length === 0}
        sx={deleteButtonStyle(selected.length === 0)}
      >
        삭제
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">그룹 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            선택하신 {selected.length}개의 항목을 삭제 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleDeleteSelected} color="error" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableControls;
