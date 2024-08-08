import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "./TableComponent";
import EditDialog from "./EditDialog";
import {
  createFormulaGroup,
  deleteFormulaGroup,
  fetchUserFormulaGroups,
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
      // fetchUserFormulaGroups 함수를 호출하여 데이터를 가져옵니다.
      const data = await fetchUserFormulaGroups();
      console.log(data);

      // 데이터가 유효한 경우 상태를 업데이트합니다.
      if (data) {
        // 가져온 데이터의 data 필드를 rows 상태로 설정합니다.
        setRows(data.data);
      }
    };
    // 비동기 함수를 호출하여 데이터 로드를 시작합니다.
    loadGroups();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const handleAddRow = async () => {
    // 그룹 이름이나 메모가 비어 있는지 확인합니다.
    if (!editGroupName.trim() || !editNote.trim()) {
      console.error("그룹 이름과 메모가 필요합니다.");
      return;
    }

    // 새로운 그룹 ID를 생성합니다. (현재 행의 수에 1을 더한 값)
    const groupId = rows.length + 1;

    // createFormulaGroup 함수를 호출하여 새로운 그룹을 생성합니다.
    const result = await createFormulaGroup(groupId, editGroupName, editNote);

    // 그룹 생성이 성공했는지 확인합니다.
    if (result) {
      // 새로운 행을 생성하고 기존의 행들에 추가합니다.
      const newRows = [
        {
          id: result.data.id, // 생성된 그룹의 ID
          groupId: result.data.groupId, // 생성된 그룹의 그룹 ID
          groupName: editGroupName, // 입력된 그룹 이름
          note: editNote, // 입력된 메모
        },
        ...rows, // 기존의 행들
      ];

      // 새로운 행 목록으로 상태를 업데이트합니다.
      setRows(newRows);

      // 편집 상태를 초기화합니다.
      setEditIndex(-1);
      setEditGroupName("");
      setEditNote("");
    } else {
      console.error("새 행을 추가하지 못했습니다.");
    }
  };

  const handleDeleteRows = async () => {
    // 선택된 각 행의 ID에 대해 반복합니다.
    for (const id of selected) {
      // deleteFormulaGroup 함수를 호출하여 그룹을 삭제합니다.
      await deleteFormulaGroup(id);
    }

    // 선택된 행을 제외한 새로운 행 목록을 만듭니다.
    const newRows = rows.filter((row) => !selected.includes(row.id));

    // 새로운 행 목록으로 상태를 업데이트합니다.
    setRows(newRows);

    // 선택된 항목 배열을 비워 상태를 업데이트합니다.
    setSelected([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = useCallback(async () => {
    // 편집 중인 행의 인덱스가 0 이상인 경우에만 실행됩니다.
    if (editIndex >= 0) {
      // updateFormulaGroup 함수를 호출하여 편집된 데이터를 저장합니다.
      const result = await updateFormulaGroup(
        rows[editIndex].id, // 편집 중인 행의 ID
        rows[editIndex].groupId, // 편집 중인 행의 그룹 ID
        editGroupName, // 편집된 그룹 이름
        editNote // 편집된 메모
      );

      // 업데이트가 성공한 경우 상태를 업데이트합니다.
      if (result) {
        // 기존 행 배열을 복사하여 새로운 배열을 만듭니다.
        const newRows = [...rows];
        // 편집 중인 행의 데이터를 업데이트합니다.
        newRows[editIndex] = {
          ...newRows[editIndex], // 기존 행 데이터
          groupName: editGroupName, // 편집된 그룹 이름으로 업데이트
          note: editNote, // 편집된 메모로 업데이트
        };

        // 새로운 행 배열로 상태를 업데이트합니다.
        setRows(newRows);
        // 편집 인덱스를 초기화하여 편집 상태를 종료합니다.
        setEditIndex(-1);
        // 다이얼로그를 열어 성공적으로 저장되었음을 알립니다.
        setIsDialogOpen(true);
      }
    }
  }, [editIndex, editGroupName, editNote, rows]);

  const handleDocumentClick = useCallback(
    (event) => {
      // containerRef.current가 존재하고, event.target이 containerRef.current의 자식이 아니며, editIndex가 -1이 아닌 경우
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        editIndex !== -1
      ) {
        // handleSave 함수를 호출합니다.
        handleSave();
      }
    },
    [editIndex, handleSave] // 의존성 배열: editIndex와 handleSave에 의존하여 함수가 재생성됩니다.
  );

  useEffect(() => {
    // 컴포넌트가 마운트될 때 문서에 "mousedown" 이벤트 리스너를 추가합니다.
    document.addEventListener("mousedown", handleDocumentClick);

    // useEffect 훅의 클린업 함수: 컴포넌트가 언마운트되거나 의존성 배열의 값이 변경될 때 호출됩니다.
    return () => {
      // "mousedown" 이벤트 리스너를 제거합니다.
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
        rows={rows} // 테이블에 표시할 행 데이터 배열
        setRows={setRows} // 행 데이터를 업데이트하는 함수
        page={page} // 현재 페이지 번호
        rowsPerPage={rowsPerPage} // 한 페이지에 표시할 행 수
        setPage={setPage} // 페이지 번호를 업데이트하는 함수
        setRowsPerPage={setRowsPerPage} // 페이지당 표시할 행 수를 업데이트하는 함수
        selected={selected} // 선택된 행들의 ID 배열
        setSelected={setSelected} // 선택된 행들의 ID 배열을 업데이트하는 함수
        setEditIndex={setEditIndex} // 편집 중인 행의 인덱스를 설정하는 함수
        setEditGroupName={setEditGroupName} // 편집 중인 행의 그룹 이름을 설정하는 함수
        setEditNote={setEditNote} // 편집 중인 행의 메모를 설정하는 함수
        editIndex={editIndex} // 현재 편집 중인 행의 인덱스
        editGroupName={editGroupName} // 편집 중인 행의 그룹 이름
        editNote={editNote} // 편집 중인 행의 메모
        handleSave={handleSave} // 행 데이터를 저장하는 함수
      />
      <EditDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Box>
  );
}

export default CalcGroupMgmt;
