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
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuList from "./MenuList"; // 필요한 경우 경로를 조정하세요
import { fetchParameterGroupDetails } from "./api"; // 필요한 경우 경로를 조정하세요

const ParameterManagement = ({ userId }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState({});

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

  const handleToggle = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const filteredGroups = MenuList.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <React.Fragment key={node.id}>
        <ListItem
          button
          onClick={() => {
            handleToggle(node.id);
            setSelectedGroup(node.id);
          }}
          selected={selectedGroup === node.id}
        >
          <ListItemText primary={node.name} />
          {node.children ? (
            open[node.id] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        {node.children && (
          <Collapse in={open[node.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              {renderTree(node.children)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

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
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%", // 27px
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
        <List>
          {filteredGroups.length > 0 ? (
            renderTree(filteredGroups)
          ) : (
            <Typography sx={{ paddingLeft: 2 }}>
              조회된 정보가 없습니다.
            </Typography>
          )}
        </List>
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
