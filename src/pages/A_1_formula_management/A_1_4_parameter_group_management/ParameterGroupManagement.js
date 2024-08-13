import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";

const generateRows = () => {
  return Array.from({ length: 50 }, (_, index) => ({
    id: 50 - index,
    groupId: String(Math.floor(Math.random() * 90000) + 10000), // 임의의 5자리 숫자 생성
    groupName: `산정식그룹 ${50 - index}`,
    note: `비고${50 - index}`,
  }));
};

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataTable = () => {
  const [rows, setRows] = useState(generateRows());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const groupNameInputRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddGroup = () => {
    const newRow = {
      id: rows.length + 1,
      groupId: String(Math.floor(Math.random() * 90000) + 10000), // 임의의 5자리 숫자 생성
      groupName: "",
      note: "",
    };
    setRows([newRow, ...rows]);
    setEditingRowId(newRow.id);

    // 짧은 지연 후에 텍스트 필드로 포커스 이동
    setTimeout(() => {
      if (groupNameInputRef.current) {
        groupNameInputRef.current.focus();
      }
    }, 100);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if (event.target.type === "checkbox") {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSave = () => {
    setOpenSnackbar(true);
  };

  const handleGroupNameChange = (id, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, groupName: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleNoteChange = (id, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, note: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleBlur = (id) => {
    setEditingRowId(null);
    handleSave();
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      setEditingRowId(null);
      handleSave();
      event.target.blur(); // 포커스 잃기
    }
  };

  const handleDeleteSelected = () => {
    const currentPageRows = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    const newRows = rows.filter(
      (row) => !selected.includes(row.id) || !currentPageRows.includes(row)
    );
    setRows(newRows);
    setSelected([]);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOutside = (event) => {
    if (editingRowId !== null && !event.target.closest(".edit-field")) {
      setEditingRowId(null);
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingRowId]);

  return (
    <Box p={3} sx={{ width: "83%", border: "2px solid #ccc " }}>
      <Typography
        variant="h6"
        sx={{
          color: "var(--Neutral-100, #000)",
          fontFamily: "Pretendard Variable",
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        파라미터 그룹 목록
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ marginRight: 8 }}
          onClick={handleAddGroup}
        >
          그룹 추가
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleOpenDialog}
          disabled={selected.length === 0}
          sx={{
            color: selected.length === 0 ? "grey.500" : "primary.main",
            borderColor: selected.length === 0 ? "grey.500" : "primary.main",
          }}
        >
          삭제
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ border: "2px solid #ccc " }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Box display="flex" alignItems="center">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length <
                        rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).length
                    }
                    checked={
                      rows.length > 0 &&
                      selected.length ===
                        rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).length
                    }
                    onChange={handleSelectAllClick}
                  />
                  No
                </Box>
              </TableCell>
              <TableCell sx={{ paddingLeft: 10, paddingRight: -10 }}>
                그룹ID
              </TableCell>
              <TableCell>그룹명</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    key={row.id}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    onClick={(event) => handleClick(event, row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ paddingLeft: 10, paddingRight: -10 }}>
                      {row.groupId}
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="edit-field"
                        fullWidth
                        variant="outlined"
                        value={row.groupName}
                        onChange={(e) =>
                          handleGroupNameChange(row.id, e.target.value)
                        }
                        onBlur={() => handleBlur(row.id)}
                        onKeyDown={(e) => handleKeyDown(e, row.id)}
                        size="small"
                        inputRef={
                          editingRowId === row.id ? groupNameInputRef : null
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="edit-field"
                        fullWidth
                        variant="outlined"
                        value={row.note}
                        onChange={(e) =>
                          handleNoteChange(row.id, e.target.value)
                        }
                        onBlur={() => handleBlur(row.id)}
                        onKeyDown={(e) => handleKeyDown(e, row.id)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          저장되었습니다.
        </Alert>
      </Snackbar>
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

export default DataTable;
