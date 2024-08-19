import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import Alert from "./Alert";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRowComponent";
import TableControls from "./TableControls";
import { boxStyle, typographyStyle, tableContainerStyle } from "./Styles";
import {
  fetchParameterGroups,
  addParameter,
  updateParameter,
  deleteParameter,
} from "./ParameterGroupApi";

const ParameterGroupManagement = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const groupNameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchParameterGroups();
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setRows([]);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddGroup = async () => {
    const newRow = {
      id: rows.length + 1,
      groupId: String(Math.floor(Math.random() * 90000) + 10000),
      groupName: "",
      note: "",
    };
    await addParameter(newRow);
    setRows([newRow, ...rows]);
    setEditingRowId(newRow.id);

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

  const handleSave = async (row) => {
    await updateParameter(row.id, row);
    setOpenSnackbar(true);
  };

  const handleGroupNameChange = (id, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        row.groupName = value;
      }
      return row;
    });
    setRows(newRows);
  };

  const handleNoteChange = (id, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        row.note = value;
      }
      return row;
    });
    setRows(newRows);
  };

  const handleBlur = (id) => {
    const row = rows.find((row) => row.id === id);
    handleSave(row); // 변경 사항 저장
    setEditingRowId(null);
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      const row = rows.find((row) => row.id === id);
      handleSave(row); // 변경 사항 저장
      setEditingRowId(null);
      event.target.blur(); // 포커스 해제
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selected) {
      await deleteParameter(id);
    }
    const newRows = rows.filter((row) => !selected.includes(row.id));
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
      const row = rows.find((row) => row.id === editingRowId);
      handleSave(row); // 변경 사항 저장
      setEditingRowId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingRowId, rows]);

  return (
    <Box p={3} sx={boxStyle}>
      <Typography variant="h6" sx={typographyStyle}>
        파라미터 그룹 목록
      </Typography>
      <TableControls
        handleAddGroup={handleAddGroup}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleDeleteSelected={handleDeleteSelected}
        selected={selected}
        openDialog={openDialog}
      />
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table>
          <TableHeader
            numSelected={selected.length}
            rowCount={
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .length
            }
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRowComponent
                    key={row.id}
                    row={row}
                    isSelected={isItemSelected}
                    handleClick={handleClick}
                    handleGroupNameChange={handleGroupNameChange}
                    handleNoteChange={handleNoteChange}
                    handleBlur={handleBlur}
                    handleKeyDown={handleKeyDown}
                    editingRowId={editingRowId}
                    groupNameInputRef={groupNameInputRef}
                  />
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
    </Box>
  );
};

export default ParameterGroupManagement;
