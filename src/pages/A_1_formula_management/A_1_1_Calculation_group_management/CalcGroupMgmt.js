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

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const data = await esgFetch(`${API_URL}/all`, "GET");
    const sortedGroups = data.data.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setGroups(sortedGroups);
  };

  const handleCreateGroup = async () => {
    const adminId = "12345"; // 예시 관리자 ID
    const parentGroupId = "67890"; // 예시 부모 그룹 ID

    await esgFetch(`${API_URL}`, "POST", {
      adminId,
      groupName,
      parentGroupId: parseInt(parentGroupId),
      note,
    });

    fetchGroups();
    clearForm();
  };

  const handleUpdateGroup = async () => {
    const adminId = "12345"; // 예시 관리자 ID
    await esgFetch(`${API_URL}/${editGroupId}`, "PUT", {
      adminId,
      groupName,
      note,
    });

    fetchGroups();
    clearForm();
    setIsEditMode(false);
  };

  const handleDeleteGroup = async (id) => {
    await esgFetch(`${API_URL}/${id}`, "DELETE");
    fetchGroups();
  };

  const handleBulkDelete = async () => {
    await Promise.all(
      selected.map((id) => esgFetch(`${API_URL}/${id}`, "DELETE"))
    );
    fetchGroups();
    setSelected([]);
  };

  const handleEditGroup = (group) => {
    setGroupName(group.name);
    setNote(group.note || "");
    setEditGroupId(group.groupId);
    setIsEditMode(true);
  };

  const clearForm = () => {
    setGroupName("");
    setNote("");
    setIsEditMode(false);
    setEditGroupId(null);
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

  return (
    <Container>
      <h1>산정식 그룹 기본정보</h1>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="산정식그룹명"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginRight: 16 }}
          />
          <TextField
            label="비고"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginRight: 16 }}
          />
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={isEditMode ? handleUpdateGroup : handleCreateGroup}
              style={{ marginRight: 8 }}
            >
              {isEditMode ? "그룹 수정" : "그룹 추가"}
            </Button>
            {isEditMode && (
              <Button onClick={clearForm} style={{ marginRight: 8 }}>
                취소
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBulkDelete}
              disabled={selected.length === 0}
            >
              삭제
            </Button>
          </Box>
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
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.note}</TableCell>
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
