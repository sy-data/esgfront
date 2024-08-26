import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ParameterGroupList = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({
    adminId: "",
    name: "",
    inputDivision: "",
  });
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    fetchParameterGroups();
  }, []);

  const fetchParameterGroups = async () => {
    try {
      const response = await fetch(
        "http://54.180.242.25:8001/v1/admin/calc/parameter/group/all"
      );
      const result = await response.json();

      if (Array.isArray(result.data)) {
        // createdAt을 기준으로 오름차순 정렬하여 최신 항목이 맨 마지막에 오도록 설정
        const sortedData = result.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setData(sortedData);
      } else {
        setData([]); // 데이터가 배열이 아닐 경우 빈 배열 설정
      }
    } catch (error) {
      console.error("파라미터 그룹을 가져오는 중 오류 발생:", error);
      setData([]); // 오류 발생 시 빈 배열로 설정
    }
  };

  const findNextGroupId = () => {
    const groupIds = data.map((group) => group.groupId);
    let nextGroupId = 1;
    while (groupIds.includes(nextGroupId)) {
      nextGroupId += 1;
    }
    return nextGroupId;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]: name === "inputDivision" ? parseInt(value, 10) : value,
    }));
  };

  const handleAddGroup = async () => {
    try {
      const groupData = { ...newGroup, groupId: findNextGroupId() }; // 사용되지 않은 groupId 할당

      const response = await fetch(
        "http://54.180.242.25:8001/v1/admin/calc/parameter/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(groupData),
        }
      );

      if (response.ok) {
        const newGroupFromResponse = await response.json(); // 추가된 그룹의 실제 데이터를 서버에서 받아옵니다.
        setData((prevData) => [...prevData, newGroupFromResponse.data]); // 새 데이터를 배열의 마지막에 추가
        setOpen(false);
      } else {
        console.error("그룹 추가 실패");
      }
    } catch (error) {
      console.error("그룹을 추가하는 중 오류 발생:", error);
    }
  };

  const handleCheckboxChange = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(data.map((group) => group.groupId));
    }
    setAllSelected(!allSelected);
  };

  const handleDeleteGroups = async () => {
    try {
      await Promise.all(
        selectedGroups.map((groupId) =>
          fetch(
            `http://54.180.242.25:8001/v1/admin/calc/parameter/group/${groupId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer <token>", // 여기에 적절한 토큰을 삽입하세요
              },
            }
          )
        )
      );
      fetchParameterGroups();
      setSelectedGroups([]); // 선택 항목 초기화
    } catch (error) {
      console.error("그룹을 삭제하는 중 오류 발생:", error);
    }
  };

  return (
    <Container component={Paper} style={{ marginTop: "20px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        파라미터 그룹 리스트
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        그룹 추가
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteGroups}
        disabled={selectedGroups.length === 0}
        style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        선택한 그룹 삭제
      </Button>

      <Table>
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
            <TableCell>입력 구분</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((group, index) => (
            <TableRow key={group.id} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedGroups.includes(group.groupId)}
                  onChange={() => handleCheckboxChange(group.groupId)}
                />
              </TableCell>
              <TableCell>{data.length - index}</TableCell>
              <TableCell>{group.groupId}</TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.inputDivision}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>새 그룹 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="adminId"
            label="관리자 ID"
            fullWidth
            variant="outlined"
            value={newGroup.adminId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="그룹명"
            fullWidth
            variant="outlined"
            value={newGroup.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="inputDivision"
            label="입력 구분"
            fullWidth
            variant="outlined"
            value={newGroup.inputDivision}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            취소
          </Button>
          <Button onClick={handleAddGroup} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ParameterGroupList;
