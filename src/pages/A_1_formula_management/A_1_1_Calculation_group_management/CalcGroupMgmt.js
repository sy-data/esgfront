import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Box,
} from "@mui/material";
import { esgFetch } from "./FetchWrapper";

const API_URL = "/v1/admin/calc/group";

function CalcGroupMgmt() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [note, setNote] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddingNewGroup, setIsAddingNewGroup] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await esgFetch(`${API_URL}/all`, "GET");
      const sortedGroups = data.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setGroups(sortedGroups);
    } catch (error) {
      console.error("그룹을 불러오는 데 실패했습니다:", error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const adminId = "12345"; // 예시 관리자 ID
      const parentGroupId = "67890"; // 예시 부모 그룹 ID

      const response = await esgFetch(`${API_URL}`, "POST", {
        adminId,
        groupName, // 여기에서 상태를 그대로 전송
        parentGroupId: parseInt(parentGroupId),
        note,
      });

      if (response.success) {
        // 추가된 그룹을 성공적으로 저장했는지 확인
        fetchGroups(); // 데이터를 다시 가져오기
        clearForm(); // 폼 초기화
        setIsAddingNewGroup(false); // 추가 모드 종료
      } else {
        console.error("그룹 추가에 실패했습니다:", response.message);
      }
    } catch (error) {
      console.error("그룹 추가 중 오류가 발생했습니다:", error);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      const adminId = "test"; // 예시 관리자 ID
      await esgFetch(`${API_URL}/${editGroupId}`, "PUT", {
        adminId,
        groupName,
        note,
      });

      fetchGroups();
      clearForm();
      setIsEditMode(false);
    } catch (error) {
      console.error("그룹 수정에 실패했습니다:", error);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await esgFetch(`${API_URL}/${id}`, "DELETE");
      fetchGroups();
    } catch (error) {
      console.error("그룹 삭제에 실패했습니다:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) => esgFetch(`${API_URL}/${id}`, "DELETE"))
      );
      fetchGroups();
      setSelected([]);
    } catch (error) {
      console.error("그룹 일괄 삭제에 실패했습니다:", error);
    }
  };

  const handleEditGroup = (group) => {
    setGroupName(group.name);
    setNote(group.note || "");
    setEditGroupId(group.groupId);
    setIsEditMode(true);
    setIsAddingNewGroup(false);
  };

  const clearForm = () => {
    setGroupName("");
    setNote("");
    setIsEditMode(false);
    setEditGroupId(null);
    setIsAddingNewGroup(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = groups.map((n) => n.groupId);
      setSelected(newSelected);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRowDoubleClick = (group) => {
    handleEditGroup(group);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handleUpdateGroup();
    }
  };

  const handleAddNewGroup = () => {
    clearForm();
    setIsAddingNewGroup(true);
  };

  return (
    <Container>
      <h1>산정식 그룹 기본정보</h1>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewGroup}
            style={{ marginRight: 8 }}
          >
            그룹 추가
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBulkDelete}
            disabled={selected.length === 0}
          >
            삭제
          </Button>
        </Box>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < groups.length
                  }
                  checked={
                    groups.length > 0 && selected.length === groups.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>산정식 그룹 ID</TableCell>
              <TableCell>산정식그룹명</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddingNewGroup && (
              <TableRow>
                <TableCell />
                <TableCell>신규</TableCell>
                <TableCell>자동 생성됨</TableCell>
                <TableCell>
                  <TextField
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="그룹명을 입력하세요"
                    fullWidth
                    autoFocus
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="비고를 입력하세요"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateGroup}
                  >
                    저장
                  </Button>
                  <Button onClick={clearForm} style={{ marginLeft: 8 }}>
                    취소
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {groups
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((group, index) => {
                const isItemSelected = isSelected(group.groupId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, group.groupId)}
                    onDoubleClick={() => handleRowDoubleClick(group)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={group.groupId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell>{groups.length - index}</TableCell>
                    <TableCell>{group.groupId}</TableCell>
                    <TableCell>
                      {isEditMode && editGroupId === group.groupId ? (
                        <TextField
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          onKeyPress={handleKeyPress}
                          fullWidth
                          autoFocus
                        />
                      ) : (
                        group.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditMode && editGroupId === group.groupId ? (
                        <TextField
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          onKeyPress={handleKeyPress}
                          fullWidth
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={groups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default CalcGroupMgmt;
