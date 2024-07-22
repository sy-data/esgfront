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
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuList from "./MenuList";
import { fetchParameterGroupDetails } from "./api";

const ExpandLess = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 16.5002L4.5 9.00019L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.00019L12 16.5002Z"
      fill="#111111"
    />
  </svg>
);

const ExpandMore = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
      fill="#757575"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
      fill="#757575"
    />
  </svg>
);

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

  const ExpandLess = ({ isSelected }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 16.5002L4.5 9.00019L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.00019L12 16.5002Z"
        fill={isSelected ? "#00B096" : "#111111"}
      />
    </svg>
  );

  const ExpandMore = ({ isSelected }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
        fill={isSelected ? "#00B096" : "#757575"}
      />
    </svg>
  );

  const ArrowRight = ({ isSelected }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
        fill={isSelected ? "#00B096" : "#757575"}
      />
    </svg>
  );

  const renderTree = (nodes) =>
    nodes.map((node) => {
      const isSelected = selectedGroup === node.id;
      return (
        <React.Fragment key={node.id}>
          <ListItem
            button
            onClick={() => {
              handleToggle(node.id);
              setSelectedGroup(node.id);
            }}
            selected={isSelected}
            sx={{
              color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
              fontFamily: isSelected ? "'Pretendard Variable'" : "inherit",
              fontSize: isSelected ? "16px" : "inherit",
              fontStyle: isSelected ? "normal" : "inherit",
              fontWeight: isSelected ? 700 : "inherit",
              lineHeight: isSelected ? "150%" : "inherit", // 24px
              letterSpacing: isSelected ? "-0.32px" : "inherit",
            }}
          >
            <ListItemIcon
              sx={{
                color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
                marginRight: "-20px",
              }}
            >
              {node.children ? (
                open[node.id] ? (
                  <ExpandLess isSelected={isSelected} />
                ) : (
                  <ExpandMore isSelected={isSelected} />
                )
              ) : (
                <ArrowRight isSelected={isSelected} />
              )}
            </ListItemIcon>
            <ListItemText primary={node.name} />
          </ListItem>
          {node.children && (
            <Collapse in={open[node.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {renderTree(node.children)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

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
            display: "flex",
            height: "40px",
            padding: "6px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid var(--Gray-eaeaea, #EAEAEA)",
            background: "var(--Gray-fff, #FFF)",
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.63633 2.5C7.42268 2.5 6.23628 2.85989 5.22717 3.53416C4.21806 4.20843 3.43155 5.16679 2.9671 6.28806C2.50266 7.40932 2.38114 8.64314 2.61791 9.83347C2.85468 11.0238 3.43911 12.1172 4.29729 12.9754C5.15547 13.8335 6.24886 14.418 7.43919 14.6547C8.62952 14.8915 9.86334 14.77 10.9846 14.3056C12.1059 13.8411 13.0642 13.0546 13.7385 12.0455C14.4128 11.0364 14.7727 9.84998 14.7727 8.63633C14.7726 7.0089 14.126 5.44817 12.9753 4.2974C11.8245 3.14664 10.2638 2.5001 8.63633 2.5Z"
                stroke="#111111"
                stroke-width="1.25"
                stroke-miterlimit="10"
              />
              <path
                d="M13.2144 13.2144L17.4999 17.4999"
                stroke="#111111"
                stroke-width="1.25"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>
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
      <Box // 파라미터 그룹정보
        sx={{
          flex: "1",
          paddingLeft: 2,
          backgroundColor: "#F7F8F8",
          padding: "15px",
          margin: "-15px -15px -15px 0",
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
