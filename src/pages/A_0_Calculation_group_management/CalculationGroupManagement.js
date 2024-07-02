import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  Pagination,
  TextField,
} from "@mui/material";
import {
  Container,
  ContentContainer,
  HeaderContainer,
  StyledTypography,
  ButtonGroup,
  AddButton,
  DeleteButton,
  TableContainer,
  TableHeader,
  StyledCheckbox,
  HeaderItem,
  HeaderTitle,
  TableContent,
  ContentMessage,
} from "./StyledComponents";
import Icon from "./Icon";

const CalculationGroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleAddGroup = () => {
    setNewGroups([
      ...newGroups,
      { id: newGroups.length + groups.length + 1, name: "", remark: "" },
    ]);
  };

  const handleSaveGroup = (event, index) => {
    if (event.key === "Enter") {
      const newGroup = newGroups[index];
      // 백엔드 API를 호출하여 새 그룹을 저장합니다.
      // API 호출이 성공했다고 가정하고 로컬 상태를 업데이트합니다.
      setGroups([...groups, newGroup]);
      setNewGroups(newGroups.filter((_, i) => i !== index));
    }
  };

  const handleChange = (event, field, index) => {
    const updatedGroups = [...newGroups];
    updatedGroups[index] = {
      ...updatedGroups[index],
      [field]: event.target.value,
    };
    setNewGroups(updatedGroups);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setGroups((prevGroups) =>
      prevGroups.map((group) => ({ ...group, isSelected: isChecked }))
    );
  };

  const handleSelectGroup = (id) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, isSelected: !group.isSelected } : group
      )
    );
  };

  const handleDeleteGroups = () => {
    setGroups(groups.filter((group) => !group.isSelected));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedGroups = groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <ContentContainer>
        <HeaderContainer>
          <StyledTypography>산정식그룹 기본정보</StyledTypography>
          <ButtonGroup>
            <AddButton variant="contained" onClick={handleAddGroup}>
              그룹 추가
            </AddButton>
            <DeleteButton
              variant="contained"
              disabled={!groups.some((group) => group.isSelected)}
              onClick={handleDeleteGroups}
            >
              삭제
            </DeleteButton>
          </ButtonGroup>
        </HeaderContainer>
        <TableContainer>
          <TableHeader>
            <StyledCheckbox onChange={handleSelectAll} />
            <HeaderItem>
              <HeaderTitle variant="body2">No</HeaderTitle>
            </HeaderItem>
            <Box sx={{ flex: 1, display: "flex", gap: 8 }}>
              <HeaderTitle variant="body2">산정식그룹 ID</HeaderTitle>
              <HeaderTitle variant="body2">산정식그룹명</HeaderTitle>
              <HeaderTitle variant="body2">비고</HeaderTitle>
            </Box>
          </TableHeader>
          {newGroups.map((newGroup, index) => (
            <Box
              key={`new-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eaeaea",
                height: "42px",
                padding: 16,
              }}
            >
              <StyledCheckbox disabled />
              <HeaderItem>
                <HeaderTitle variant="body2">
                  {groups.length + index + 1}
                </HeaderTitle>
              </HeaderItem>
              <Box sx={{ flex: 1, display: "flex", gap: 8 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newGroup.name}
                  onChange={(e) => handleChange(e, "name", index)}
                  onKeyPress={(e) => handleSaveGroup(e, index)}
                  fullWidth
                  sx={{
                    marginLeft: "270px",
                    maxWidth: "200px",
                    marginBottom: "250px",
                    maxHeight: "100px",
                    borderRadius: "8px",
                    border: "1px solid var(--Gray-eee, #EEE)",
                    background: "var(--Gray-fff, #FFF)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    "& .MuiInputBase-input": {
                      padding: "0",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  value={newGroup.remark}
                  onChange={(e) => handleChange(e, "remark", index)}
                  onKeyPress={(e) => handleSaveGroup(e, index)}
                  fullWidth
                  sx={{
                    maxHeight: "100px",
                    marginLeft: "180px",
                    maxWidth: "350px",
                    marginBottom: "250px",
                    borderRadius: "8px",
                    border: "1px solid var(--Gray-eee, #EEE)",
                    background: "var(--Gray-fff, #FFF)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    "& .MuiInputBase-input": {
                      padding: "0",
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
          {paginatedGroups.length === 0 && newGroups.length === 0 ? (
            <TableContent>
              <Icon />
              <ContentMessage variant="body2">
                조회된 정보가 없습니다
              </ContentMessage>
            </TableContent>
          ) : (
            paginatedGroups.map((group, index) => (
              <Box
                key={group.id}
                sx={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  border: "1px solid var(--Gray-eee, #EEE)",
                  background: "var(--Gray-fff, #FFF)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  "& .MuiInputBase-input": {
                    padding: "0",
                  },
                }}
              >
                <StyledCheckbox
                  checked={group.isSelected || false}
                  onChange={() => handleSelectGroup(group.id)}
                />
                <HeaderItem>
                  <HeaderTitle variant="body2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </HeaderTitle>
                </HeaderItem>
                <Box sx={{ flex: 1, display: "flex", gap: 8 }}>
                  <HeaderTitle variant="body2">{group.id}</HeaderTitle>
                  <HeaderTitle variant="body2">{group.name}</HeaderTitle>
                  <HeaderTitle variant="body2">{group.remark}</HeaderTitle>
                </Box>
              </Box>
            ))
          )}
        </TableContainer>
      </ContentContainer>
      <Pagination
        count={Math.ceil(groups.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </Container>
  );
};

export default CalculationGroupManagement;
