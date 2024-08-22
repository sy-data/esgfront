import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
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

const adminId = "test"; // 실제 adminId를 설정
const userId = "test"; // 실제 userId를 설정

function CalcGroupMgmt() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editGroupName, setEditGroupName] = useState("");
  const [editNote, setEditNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [isNewGroup, setIsNewGroup] = useState(false);

  useEffect(() => {
    // 비동기 함수 선언: 사용자 공식 그룹 데이터를 가져옵니다.
    const loadGroups = async () => {
      try {
        const data = await fetchAllUserFormulaGroups(adminId, userId);

        // 데이터가 유효한 경우 상태를 업데이트합니다.
        if (data) {
          setRows(data); // 가져온 데이터를 rows 상태로 설정합니다.
        }
      } catch (error) {
        console.log("데이터를 가져오는 중 오류가 발생했습니다.:", error);
      } finally {
        setLoading(false);
      }
    };
    // 비동기 함수를 호출하여 데이터 로드를 시작합니다.
    loadGroups();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const handleAddRow = async () => {
    // 새로 추가될 그룹의 ID를 설정합니다. 현재 행의 수에 1을 더한 값을 사용합니다.
    const newRow = {
      id: undefined,
      groupId: rows.length + 1,
      groupName: "",
      note: "",
      parentGroupId: 0,
    };

    // 새로운 빈 행을 추가하고 편집 모드로 전환
    setRows([newRow, ...rows]);
    setEditIndex(0); // 새로 추가된 행을 편집 모드로 설정
    setEditGroupName(""); // 그룹 이름 필드를 비웁니다.
    setEditNote(""); // 메모 필드를 비웁니다.
    setIsNewGroup(true);
  };

  const handleDeleteRows = async () => {
    try {
      // 선택된 각 행의 ID에 대해 반복문을 실행
      for (const id of selected) {
        // deleteFormulaGroup 함수를 호출하여 해당 ID의 그룹을 삭제
        await deleteFormulaGroup(id);
      }
      // 삭제된 그룹을 제외한 새로운 행 목록을 생성
      const newRows = rows.filter((row) => !selected.includes(row.id));

      // 새로운 행 목록으로 상태를 업데이트
      setRows(newRows);
      setSelected([]); // 선택된 항목 배열을 비웁니다.
    } catch (error) {
      console.error("행을 삭제하지 못했습니다.:", error);
    }
  };

  // const handleDialogClose = () => {
  //   // 다이얼로그의 열림 상태를 false로 설정하여 다이얼로그를 닫습니다.
  //   setIsDialogOpen(false);
  // };

  // 삭제 확인 다이얼로그의 상태를 추가
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // 삭제 버튼 클릭 시 다이얼로그를 여는 함수
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // 삭제 확인 후 실제로 삭제를 수행하는 함수
  const handleConfirmDelete = async () => {
    await handleDeleteRows();
    handleCloseDeleteDialog(); // 삭제 후 다이얼로그 닫기
  };

  const handleSave = useCallback(async () => {
    // 현재 편집 중인 행의 데이터를 저장합니다.
    if (editIndex >= 0 && editGroupName.trim() && editNote.trim()) {
      try {
        const rowToUpdate = rows[editIndex];

        if (isNewGroup) {
          //새로운 그룹 추가 로직
          const result = await createFormulaGroup(
            adminId,
            rowToUpdate.groupId,
            editGroupName,
            rowToUpdate.parentGroupId,
            editNote
          );
          if (result) {
            console.log("새로운 그룹이 생성되었습니다.", result);
            setRows([result, ...rows]);
          }
        } else {
          //기존 그룹 수정 로직
          // 여기서 updateFormulaGroup 함수를 호출합니다.
          const result = await updateFormulaGroup(
            rowToUpdate.id, // 수정할 그룹의 ID
            adminId, // 관리자의 ID
            rowToUpdate.groupId, // 그룹 ID (고유 식별자)
            editGroupName, // 수정된 그룹 이름
            editNote // 수정된 비고
          );
          if (result) {
            console.log("서버 응답 데이터:", result); // 서버에서 반환된 전체 데이터 확인

            // 업데이트된 데이터를 반영합니다.
            const updatedRows = [...rows];
            updatedRows[editIndex] = {
              ...rowToUpdate,
              name: result.name, // 서버에서 반환된 데이터로 업데이트
              note: result.note, // 서버에서 반환된 데이터로 업데이트
            };
            console.log("업데이트된 행 데이터:", updatedRows[editIndex]); // 업데이트된 데이터 확인
            setRows(updatedRows);
          }
        }
        setEditIndex(-1); // 편집 모드를 해제합니다.
        setIsDialogOpen(true); // 저장 완료 후 다이얼로그 표시
        setIsNewGroup(false); // 작업이 완료되면 새로운 그룹 플래그를 초기화
      } catch (error) {
        console.error("그룹 저장 중 오류가 발생했습니다.", error);
      }
    } else {
      alert("그룹 이름과 메모를 입력해 주세요.");
    }
  }, [editIndex, editGroupName, editNote, rows, isNewGroup]);

  const handleDocumentClick = useCallback(
    (event) => {
      // containerRef.current가 존재하고, event.target이 containerRef.current의 자식이 아니며, 편집 인덱스가 유효한 경우
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        editIndex !== -1
      ) {
        handleSave(); // handleSave 함수를 호출하여 현재 편집 중인 내용을 저장합니다.
      }
    },
    [editIndex, handleSave]
  );

  useEffect(() => {
    // "mousedown" 이벤트 리스너를 추가
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // "mousedown" 이벤트 리스너를 제거
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <Box sx={{ width: "85%", border: "2px solid #ccc" }} ref={containerRef}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
                onClick={handleOpenDeleteDialog}
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
            handleDialogClose={() => setIsDialogOpen(false)}
          />
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">그룹 삭제</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                선택하신 {selected.length}개의 항목을 삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>취소</Button>
              <Button onClick={handleConfirmDelete} color="error" autoFocus>
                삭제
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default CalcGroupMgmt;
