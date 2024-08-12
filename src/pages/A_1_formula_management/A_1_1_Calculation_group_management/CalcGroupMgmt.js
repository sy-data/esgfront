import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "./TableComponent";
import EditDialog from "./EditDialog";
import {
  createFormulaGroup,
  deleteFormulaGroup,
  fetchAllUserFormulaGroups,
  updateFormulaGroup,
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
    // 비동기 함수 선언: 사용자 공식 그룹 데이터를 가져옵니다.
    const loadGroups = async () => {
      const adminId = "test"; // 실제 adminId를 여기에 설정
      const userId = "test"; // 실제 userId를 여기에 설정
      const data = await fetchAllUserFormulaGroups(adminId, userId);

      // 데이터가 유효한 경우 상태를 업데이트합니다.
      if (data) {
        setRows(data); // 가져온 데이터를 rows 상태로 설정합니다.
      }
    };
    // 비동기 함수를 호출하여 데이터 로드를 시작합니다.
    loadGroups();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const handleAddRow = async () => {
    if (!editGroupName.trim() || !editNote.trim()) {
      console.error("그룹 이름과 메모가 필요합니다.");
      return;
    }

    const groupId = rows.length + 1;

    const adminId = "test"; // 실제 adminId를 여기에 설정
    const result = await createFormulaGroup(
      adminId,
      groupId,
      editGroupName,
      editNote
    );

    if (result) {
      const newRows = [
        {
          id: result.id,
          groupId: result.groupId,
          name: editGroupName,
          note: editNote,
        },
        ...rows,
      ];

      setRows(newRows);
      setEditIndex(-1);
      setEditGroupName("");
      setEditNote("");
    } else {
      console.error("새 행을 추가하지 못했습니다.");
    }
  };

  const handleDeleteRows = async () => {
    for (const id of selected) {
      await deleteFormulaGroup(id);
    }

    const newRows = rows.filter((row) => !selected.includes(row.id));

    setRows(newRows);
    setSelected([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = useCallback(async () => {
    if (editIndex >= 0) {
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
          name: editGroupName,
          note: editNote,
        };

        setRows(newRows);
        setEditIndex(-1);
        setIsDialogOpen(true);
      }
    }
  }, [editIndex, editGroupName, editNote, rows]);

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
            lineHeight: "150%",
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
              lineHeight: "150%",
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
              lineHeight: "150%",
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
      <TableComponent
        rows={rows}
        setRows={setRows}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        selected={selected}
        setSelected={setSelected}
        setEditIndex={setEditIndex}
        setEditGroupName={setEditGroupName}
        setEditNote={setEditNote}
        editIndex={editIndex}
        editGroupName={editGroupName}
        editNote={editNote}
        handleSave={handleSave}
      />
      <EditDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Box>
  );
}

export default CalcGroupMgmt;
