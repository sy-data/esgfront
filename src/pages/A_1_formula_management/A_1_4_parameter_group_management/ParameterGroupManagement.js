import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  Pagination,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";

const ALERT_MESSAGES = {
  DUPLICATE: "그룹명이 중복됩니다.",
  EMPTY_NAME: "그룹명을 입력해주세요.",
  SAVED: "저장되었습니다.",
  DELETE_CONFIRM: (count) => `선택하신 ${count}개의 항목을 삭제하시겠습니까?`,
};

const API_URL = "http://54.180.242.25:8001/v1/admin/calc/parameter/group";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParameterGroupList = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState({ type: "", isOpen: false });
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGroup, setNewGroup] = useState({
    adminId: "test",
    name: "",
    note: "",
  });
  const [allSelected, setAllSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const itemsPerPage = 10;
  const groupNameRef = useRef(null);

  useEffect(() => {
    fetchParameterGroups();
  }, []);

  const fetchParameterGroups = async () => {
    try {
      const response = await fetch(`${API_URL}/all`);
      const result = await response.json();
      const sortedData = Array.isArray(result.data)
        ? result.data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        : [];
      setData(sortedData);
    } catch (error) {
      console.error("파라미터 그룹을 가져오는 중 오류 발생:", error);
      setData([]);
    }
  };

  const findNextGroupId = () => {
    const groupIds = data.map((group) => group.groupId);
    let nextGroupId = 1;
    while (groupIds.includes(nextGroupId)) nextGroupId += 1;
    return nextGroupId;
  };

  const handleAddMode = () => {
    setIsAdding(true);
    setCurrentPage(1);
    setTimeout(() => groupNameRef.current?.focus(), 0);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveNewGroup = useCallback(async () => {
    if (!newGroup.name.trim()) {
      setOpenDialog({ type: "EMPTY_NAME", isOpen: true });
      return;
    }
    if (data.some((group) => group.name === newGroup.name)) {
      setOpenDialog({ type: "DUPLICATE", isOpen: true });
      return;
    }

    try {
      const groupData = { ...newGroup, groupId: findNextGroupId() };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const newGroupFromResponse = await response.json();
        setData((prevData) => [...prevData, newGroupFromResponse.data]);
        setIsAdding(false);
        setNewGroup({ adminId: "test", name: "", note: "" });
        setSnackbarOpen(true);
      } else {
        console.error("그룹 추가 실패");
      }
    } catch (error) {
      console.error("그룹을 추가하는 중 오류 발생:", error);
    }
  }, [data, newGroup]);

  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditGroup((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveEdit = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/${editGroup.groupId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editGroup),
      });

      if (response.ok) {
        await fetchParameterGroups();
        setIsEditing(null);
        setEditGroup(null);
        setSnackbarOpen(true); // 스낵바 열기
      } else {
        console.error("그룹 수정 실패", await response.text());
      }
    } catch (error) {
      console.error("그룹을 수정하는 중 오류 발생:", error);
    }
  }, [editGroup]);

  const handleBlurSave = useCallback(
    (isNew) => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === "INPUT") return;
        isNew ? handleSaveNewGroup() : handleSaveEdit();
      }, 0);
    },
    [handleSaveNewGroup, handleSaveEdit]
  );

  const handleDoubleClick = (group) => {
    if (isAdding) setIsAdding(false);
    setIsEditing(group.groupId);
    setEditGroup({ ...group });
  };

  const handleCheckboxChange = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
    const currentPageData = data
      .slice()
      .reverse()
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const allChecked = currentPageData.every(
      (group) =>
        selectedGroups.includes(group.groupId) || group.groupId === groupId
    );
    setAllSelected(allChecked);
  };

  const handleSelectAll = () => {
    const currentPageData = data
      .slice()
      .reverse()
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const newSelectedGroups = currentPageData.map((group) => group.groupId);

    setSelectedGroups(
      allSelected
        ? selectedGroups.filter((id) => !newSelectedGroups.includes(id))
        : [...selectedGroups, ...newSelectedGroups]
    );
    setAllSelected(!allSelected);
  };

  const handleDeleteGroups = async () => {
    try {
      await Promise.all(
        selectedGroups.map((groupId) =>
          fetch(`${API_URL}/${groupId}`, { method: "DELETE" })
        )
      );
      fetchParameterGroups();
      setSelectedGroups([]);
    } catch (error) {
      console.error("그룹을 삭제하는 중 오류 발생:", error);
    }
  };

  const handleDialogClose = () => setOpenDialog({ type: "", isOpen: false });

  return (
    <Container
      component={Paper}
      sx={{
        minWidth: "100rem",
        border: "2px solid #D8D8D8",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--Neutral-100, #000)",
          fontFamily: "Pretendard Variable",
          fontStyle: "normal",
          fontWeight: 700,
          letterSpacing: "-0.36px",
          marginTop: "1rem",
        }}
      >
        파라미터 그룹 목록
      </Typography>

      <div
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsEditing(null);
            handleAddMode();
          }}
          sx={{
            height: "40px",
            width: "7rem",
            marginRight: "1rem",
            borderRadius: "8px",
            background: "var(--Primary, #00CD9B)",
            fontWeight: 700,
            color: "var(--Gray-fff, #FFF)",
            textAlign: "center",
            fontFamily: "Pretendard Variable",
            letterSpacing: "-0.28px",
          }}
        >
          그룹 추가
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setOpenDialog({ type: "DELETE_CONFIRM", isOpen: true })
          }
          disabled={!selectedGroups.length}
          sx={{
            height: "40px",
            width: "7rem",
            marginRight: "1rem",
            borderRadius: "8px",
            background: "var(--Primary, #00CD9B)",
            fontWeight: 700,
            color: "var(--Gray-fff, #FFF)",
            textAlign: "center",
            fontFamily: "Pretendard Variable",
            letterSpacing: "-0.28px",
          }}
        >
          삭제
        </Button>
      </div>

      <Table
        sx={{
          border: "2px solid #D8D8D8",
          borderRadius: "1rem",
          marginBottom: "-15rem",
          marginTop: "1rem",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedGroups.length > 0 &&
                  selectedGroups.length < data.length
                }
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>No</TableCell>
            <TableCell>그룹 ID</TableCell>
            <TableCell>그룹명</TableCell>
            <TableCell>비고</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAdding && (
            <TableRow hover>
              <TableCell padding="checkbox" />
              <TableCell>New</TableCell>
              <TableCell>New</TableCell>
              <TableCell>
                <TextField
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlurSave(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNewGroup()}
                  variant="standard"
                  inputRef={groupNameRef}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="note"
                  value={newGroup.note}
                  onChange={handleInputChange}
                  onBlur={() => handleBlurSave(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveNewGroup()}
                  variant="standard"
                />
              </TableCell>
            </TableRow>
          )}
          {data
            .slice()
            .reverse()
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((group, index) => {
              const realIndex =
                data.length - (currentPage - 1) * itemsPerPage - index;
              return (
                <TableRow
                  key={group.id}
                  hover
                  onDoubleClick={() => handleDoubleClick(group)}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGroups.includes(group.groupId)}
                      onChange={() => handleCheckboxChange(group.groupId)}
                    />
                  </TableCell>
                  <TableCell>{realIndex}</TableCell>
                  <TableCell>
                    {isEditing === group.groupId ? (
                      <TextField
                        name="groupId"
                        value={editGroup.groupId}
                        disabled
                        variant="standard"
                      />
                    ) : (
                      group.groupId
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === group.groupId ? (
                      <TextField
                        name="name"
                        value={editGroup.name}
                        onChange={handleEditChange}
                        onBlur={() => handleBlurSave(false)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                        variant="standard"
                      />
                    ) : (
                      group.name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === group.groupId ? (
                      <TextField
                        name="note"
                        value={editGroup.note}
                        onChange={handleEditChange}
                        onBlur={() => handleBlurSave(false)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                        variant="standard"
                      />
                    ) : (
                      group.note
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16rem",
        }}
      >
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>

      <Dialog
        open={openDialog.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
      >
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <Typography>
            {openDialog.type === "DELETE_CONFIRM"
              ? ALERT_MESSAGES.DELETE_CONFIRM(selectedGroups.length)
              : ALERT_MESSAGES[openDialog.type]}
          </Typography>
        </DialogContent>
        <DialogActions>
          {openDialog.type === "DELETE_CONFIRM" ? (
            <>
              <Button onClick={handleDialogClose}>취소</Button>
              <Button
                onClick={() => {
                  handleDialogClose();
                  handleDeleteGroups();
                }}
              >
                삭제
              </Button>
            </>
          ) : (
            <Button onClick={handleDialogClose} color="primary">
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          저장되었습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ParameterGroupList;
