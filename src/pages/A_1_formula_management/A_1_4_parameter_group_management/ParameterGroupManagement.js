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
    groupId: "",
    parentGroupId: "",
    inputDivision: "",
    isEarthWarming: false,
    isActive: true,
  });

  useEffect(() => {
    fetchParameterGroups();
  }, []);

  const fetchParameterGroups = async () => {
    try {
      const response = await fetch(
        "http://54.180.242.25:8001/v1/admin/calc/parameter/group/all"
      );
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error("파라미터 그룹을 가져오는 중 오류 발생:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]:
        name === "groupId" ||
        name === "parentGroupId" ||
        name === "inputDivision"
          ? value === ""
            ? ""
            : parseInt(value, 10)
          : value,
    }));
  };

  const handleAddGroup = async () => {
    try {
      const response = await fetch(
        "http://54.180.242.25:8001/v1/admin/calc/parameter/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGroup),
        }
      );

      if (response.ok) {
        fetchParameterGroups();
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
            <TableCell>선택</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>그룹 ID</TableCell>
            <TableCell>그룹명</TableCell>
            <TableCell>상위 그룹 ID</TableCell>
            <TableCell>입력 구분</TableCell>
            <TableCell>지구 온난화 여부</TableCell>
            <TableCell>활성화 여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((group) => (
            <TableRow key={group.id}>
              <TableCell>
                <Checkbox
                  checked={selectedGroups.includes(group.groupId)}
                  onChange={() => handleCheckboxChange(group.groupId)}
                />
              </TableCell>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.groupId}</TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.parentGroupId}</TableCell>
              <TableCell>{group.inputDivision}</TableCell>
              <TableCell>{group.isEarthWarming ? "예" : "아니오"}</TableCell>
              <TableCell>{group.isActive ? "예" : "아니오"}</TableCell>
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
            name="groupId"
            label="그룹 ID"
            fullWidth
            variant="outlined"
            value={newGroup.groupId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="parentGroupId"
            label="상위 그룹 ID"
            fullWidth
            variant="outlined"
            value={newGroup.parentGroupId}
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
          <TextField
            margin="dense"
            name="isEarthWarming"
            label="지구 온난화 여부 (true/false)"
            fullWidth
            variant="outlined"
            value={newGroup.isEarthWarming}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="isActive"
            label="활성화 여부 (true/false)"
            fullWidth
            variant="outlined"
            value={newGroup.isActive}
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
