import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function CalcGroupMgmt() {
  const [rows, setRows] = useState(generateInitialRows(30));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editGroupName, setEditGroupName] = useState("");
  const [editNote, setEditNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditGroupName(rows[index].groupName);
    setEditNote(rows[index].note);
  };

  const handleSave = () => {
    const newRows = [...rows];
    newRows[editIndex] = {
      ...newRows[editIndex],
      groupName: editGroupName,
      note: editNote,
    };
    setRows(newRows);
    setEditIndex(-1);
    setIsDialogOpen(true);
  };

  const handleAddRow = () => {
    const newRows = [
      { id: `00${rows.length + 1}`, groupName: "", note: "" },
      ...rows,
    ];
    setRows(newRows);
    setEditIndex(0);
    setEditGroupName("");
    setEditNote("");
  };

  const handleDeleteRows = () => {
    const newRows = rows.filter((row) => !selected.includes(row.id));
    setRows(newRows);
    setSelected([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDocumentClick = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      editIndex !== -1
    ) {
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [editIndex, editGroupName, editNote]);

  return (
    <Box sx={{ width: "100%" }} ref={containerRef}>
      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all rows" }}
                  />
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>산정식 ID</TableCell>
                <TableCell>산정식그룹명</TableCell>
                <TableCell>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={selected.indexOf(row.id) !== -1}
                    tabIndex={-1}
                    key={row.id}
                    selected={selected.indexOf(row.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.indexOf(row.id) !== -1}
                        inputProps={{
                          "aria-labelledby": `enhanced-table-checkbox-${index}`,
                        }}
                      />
                    </TableCell>
                    <TableCell>{rows.length - index}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      {editIndex === page * rowsPerPage + index ? (
                        <TextField
                          value={editGroupName}
                          onChange={(e) => setEditGroupName(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyPress={(e) => e.key === "Enter" && handleSave()}
                          fullWidth
                        />
                      ) : (
                        <span
                          onClick={() => handleEdit(page * rowsPerPage + index)}
                        >
                          {row.groupName}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === page * rowsPerPage + index ? (
                        <TextField
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyPress={(e) => e.key === "Enter" && handleSave()}
                          fullWidth
                        />
                      ) : (
                        <span
                          onClick={() => handleEdit(page * rowsPerPage + index)}
                        >
                          {row.note}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddRow}
      >
        그룹 추가
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteRows}
        disabled={selected.length === 0}
        sx={{ ml: 2 }}
      >
        삭제
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">저장되었습니다</DialogTitle>
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
    </Box>
  );
}

function generateInitialRows(numRows) {
  return Array.from({ length: numRows }, (_, index) => ({
    id: `00${index + 1}`,
    groupName: `산정식그룹${index + 1}`,
    note: `${index + 1}번 그룹`,
  }));
}

export default CalcGroupMgmt;
