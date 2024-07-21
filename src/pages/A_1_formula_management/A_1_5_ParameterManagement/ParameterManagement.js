import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuList from "./MenuList"; // Adjust the path as necessary
import { fetchParameterGroupDetails } from "./api"; // Adjust the path as necessary

const ParameterManagement = ({ userId }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedGroup) {
      const loadGroupDetails = async () => {
        const details = await fetchParameterGroupDetails(selectedGroup);
        setGroupDetails(details);
      };
      loadGroupDetails();
    }
  }, [selectedGroup]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGroups = MenuList.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fff",
        padding: 2,
        border: "1px solid var(--Gray-eee, #EEE)",
      }}
    >
      <Box
        sx={{
          width: "20%",
          paddingRight: 2,
          borderRight: "1px solid var(--Gray-eee, #EEE)",
          backgroundColor: "#FFF",
          marginTop: "-15px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#FFF",
            color: "var(--Gray-111, #111)",
            fontFamily: "'Pretendard Variable'",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: "150%",
            letterSpacing: "-0.36px",
            marginBottom: "25px",
            marginTop: "10px",
          }}
        >
          파라미터 목록
        </Typography>
        <Paper
          sx={{
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
            marginBottom: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="파라미터 이름으로 검색"
            inputProps={{ "aria-label": "파라미터 이름으로 검색" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box>
          {filteredGroups.map((group) => (
            <Box
              key={group.id}
              sx={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  selectedGroup === group.id ? "#F2F9F8" : "#FFF",
              }}
              onClick={() => setSelectedGroup(group.id)}
            >
              {group.name}
              {group.children && (
                <Box sx={{ paddingLeft: 2 }}>
                  {group.children.map((child) => (
                    <Box
                      key={child.id}
                      sx={{
                        padding: "5px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedGroup === child.id ? "#E6F7FF" : "#FFF",
                      }}
                      onClick={() => setSelectedGroup(child.id)}
                    >
                      {child.name}
                      {child.children && (
                        <Box sx={{ paddingLeft: 2 }}>
                          {child.children.map((subChild) => (
                            <Box
                              key={subChild.id}
                              sx={{
                                padding: "5px",
                                cursor: "pointer",
                                backgroundColor:
                                  selectedGroup === subChild.id
                                    ? "#E6F7FF"
                                    : "#FFF",
                              }}
                              onClick={() => setSelectedGroup(subChild.id)}
                            >
                              {subChild.name}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          paddingLeft: 2,
          backgroundColor: "#F7F8F8",
          padding: "15px",
        }}
      >
        {selectedGroup ? (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              파라미터 그룹 정보
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>그룹 ID</TableCell>
                    <TableCell>그룹명</TableCell>
                    <TableCell>입력구분</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupDetails.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ marginLeft: 1 }}>
                            조회된 정보가 없습니다.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    groupDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{detail.parameterId}</TableCell>
                        <TableCell>{detail.parameterName}</TableCell>
                        <TableCell>{detail.inputType}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography>파라미터 그룹을 선택하세요.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ParameterManagement;
