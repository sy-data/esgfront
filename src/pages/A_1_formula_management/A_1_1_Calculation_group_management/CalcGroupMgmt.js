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
    // 그룹 이름과 메모가 입력되었는지 확인합니다.
    if (!editGroupName.trim() || !editNote.trim()) {
      console.error("그룹 이름과 메모가 필요합니다.");
      return;
    }

    // 새로 추가될 그룹의 ID를 설정합니다. 현재 행의 수에 1을 더한 값을 사용합니다.
    const groupId = rows.length + 1;
    try {
      // createFormulaGroup 함수를 호출하여 새로운 그룹을 생성합니다.
      const result = await createFormulaGroup(
        adminId,
        groupId,
        editGroupName,
        editNote
      );

      if (result) {
        // 새로운 행을 생성하고 기존의 행들에 추가합니다.
        const newRows = [
          {
            id: result.id, // 생성된 그룹의 ID를 설정
            groupId: result.groupId, // 생성된 그룹의 그룹 ID를 설정
            name: editGroupName, // 입력된 그룹 이름을 설정
            note: editNote, // 입력된 메모를 설정
          },
          ...rows, // 기존의 행들을 추가
        ];

        setRows(newRows); // 새로운 행 목록으로 상태를 업데이
        setEditIndex(-1); // 편집 인덱스를 초기화하여 편집 상태를 종료
        setEditGroupName(""); // 입력 필드를 초기
        setEditNote("");
      }
    } catch (error) {
      // 그룹 생성이 성공했는지 확인합니다.
      console.error("새 행을 추가하지 못했습니다.");
    }
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
    // 편집 중인 행의 인덱스가 유효한지 확인
    if (editIndex >= 0) {
      try {
        // updateFormulaGroup 함수를 호출하여 편집된 데이터를 서버에 저장
        const result = await updateFormulaGroup(
          rows[editIndex].id, // 현재 편집 중인 행의 ID
          rows[editIndex].groupId, // 현재 편집 중인 행의 그룹 ID
          editGroupName, // 새로운 그룹 이름
          editNote // 새로운 메모
        );

        // 업데이트가 성공했는지 확인
        if (result) {
          // 기존의 행 배열을 복사하여 새로운 배열을 만듭니다.
          const newRows = [...rows];

          // 편집 중인 행의 데이터를 업데이트
          newRows[editIndex] = {
            ...newRows[editIndex], // 기존의 행 데이터
            name: editGroupName, // 새로운 그룹 이름으로 업데이트
            note: editNote, // 새로운 메모로 업데이트
          };

          setRows(newRows); // 새로운 행 배열로 상태를 업데이트
          setEditIndex(-1); // 편집 인덱스를 초기화하여 편집 상태를 종료
          setIsDialogOpen(true); // 다이얼로그를 열어 성공적으로 저장되었음을 알립니다.
        }
      } catch (error) {
        console.error("수정 내용을 저장하지 못했습니다.:", error);
      }
    }
  }, [editIndex, editGroupName, editNote, rows]);

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
