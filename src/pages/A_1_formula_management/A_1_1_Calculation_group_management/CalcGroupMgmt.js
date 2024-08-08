import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  createFormulaGroup,
  updateFormulaGroup,
  deleteFormulaGroup,
  fetchUserFormulaGroups,
} from "./FetchWrapper";

function CalcGroupMgmt() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editGroupName, setEditGroupName] = useState("");
  const [editNote, setEditNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadGroups = async () => {
      const data = await fetchUserFormulaGroups();
      console.log("Fetched Data:", data); // API 응답 데이터 콘솔에 출력
      if (data) {
        setRows(data.data); // 데이터 응답 형식에 맞게 수정
      }
    };
    loadGroups();
  }, []);

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

  const handleSave = useCallback(async () => {
    if (editIndex >= 0) {
      // 수정 API 호출
      const result = await updateFormulaGroup(
        rows[editIndex].id,
        rows[editIndex].groupId,
        editGroupName,
        editNote
      );
      if (result) {
        const newRows = [...rows];
        newRows[editIndex] = {
          ...newRows[editIndex],
          groupName: editGroupName,
          note: editNote,
        };
        setRows(newRows);
        setEditIndex(-1);
        setIsDialogOpen(true);
      }
    }
  }, [editIndex, editGroupName, editNote, rows]);

  const handleAddRow = async () => {
    // 그룹 이름과 노트가 입력되었는지 검증
    if (!editGroupName.trim() || !editNote.trim()) {
      console.error("Group name and note are required.");
      return;
    }

    // 디버깅을 위해 현재 입력 값을 출력
    console.log("Group name:", editGroupName);
    console.log("Note:", editNote);

    const groupId = rows.length + 1; // 고유한 groupId 생성 예시

    // API 호출
    const result = await createFormulaGroup(groupId, editGroupName, editNote);

    // 디버깅을 위해 API 호출 결과를 출력
    console.log("API call result:", result);

    if (result) {
      const newRows = [
        {
          id: result.data.id,
          groupId: result.data.groupId,
          groupName: editGroupName,
          note: editNote,
        },
        ...rows,
      ];
      setRows(newRows);
      setEditIndex(-1); // 수정 모드를 종료
      setEditGroupName(""); // 입력 필드 초기화
      setEditNote(""); // 입력 필드 초기화
    } else {
      console.error("Failed to add new row");
    }
  };

  const handleDeleteRows = async () => {
    for (const id of selected) {
      // 삭제 API 호출
      await deleteFormulaGroup(id);
    }
    const newRows = rows.filter((row) => !selected.includes(row.id));
    setRows(newRows);
    setSelected([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDocumentClick = useCallback(
    (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        editIndex !== -1
      ) {
        handleSave();
      }
    },
    [editIndex, handleSave]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <Box sx={{ width: "85%", border: "2px solid #ccc" }} ref={containerRef}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginLeft: 3,
            color: "var(--Neutral-100, #000)",
            fontFamily: "Pretendard Variable",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%" /* 27px */,
            letterSpacing: "-0.36px",
            marginTop: 3,
          }}
        >
          산정식 기본 그룹정보
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            sx={{
              mr: 2,
              mt: 3,
              color: "var(--Gray-fff, #FFF)",
              textAlign: "center",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%" /* 21px */,
              letterSpacing: "-0.28px",
              width: 120,
              height: 40,
            }}
          >
            그룹 추가
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon sx={{ minHeight: 23 }} />}
            onClick={handleDeleteRows}
            disabled={selected.length === 0}
            sx={{
              mr: 3,
              mt: 3,
              textAlign: "center",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%" /* 21px */,
              letterSpacing: "-0.28px",
              background:
                selected.length === 0
                  ? "var(--Gray-fff, #FFF)"
                  : "var(--Primary-Primary, #00CD9B)",
              color:
                selected.length === 0
                  ? "var(--Gray-ccc, #CCC)"
                  : "var(--Gray-fff, #FFF)",
              width: 120,
              height: 40,
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2, border: "2px solid #ccc" }}>
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
                          sx={{
                            width: "70%",
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                width: 70,
                                height: "0.5rem",
                              },
                          }}
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
                          sx={{
                            width: "70%",
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                width: 70,
                                height: "0.5rem",
                              },
                          }}
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
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
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
    </Box>
  );
}

export default CalcGroupMgmt;

// function generateInitialRows(numRows) {
//   return Array.from({ length: numRows }, (_, index) => ({
//     id: `00${index + 1}`,
//     groupName: `산정식그룹${index + 1}`,
//     note: `${index + 1}번 그룹`,
//   }));
// }
