import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, InputBase, Paper, IconButton } from "@mui/material";
import { fetchParameterGroupDetails } from "./api";
import ParameterGroupTree from "./ParameterGroupTree";
import newMenuList from "./MenuList";
import ParameterInfo from "./ParameterInfo";

const ParameterManagement = ({ userId }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState({});
  const searchTimeout = useRef(null);

  useEffect(() => {
    if (selectedGroup) {
      const loadGroupDetails = async () => {
        const details = await fetchParameterGroupDetails(selectedGroup);
        setGroupDetails(details);
      };
      loadGroupDetails();
    }
  }, [selectedGroup]);

  const handleToggle = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const filterMenu = (menuList, searchTerm) => {
    return menuList.reduce((filtered, item) => {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        filtered.push(item);
      } else if (item.children && item.children.length > 0) {
        const filteredChildren = filterMenu(item.children, searchTerm);
        if (filteredChildren.length > 0) {
          filtered.push({ ...item, children: filteredChildren });
        }
      }
      return filtered;
    }, []);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  const filteredGroups = filterMenu(newMenuList, searchTerm);

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
        <ParameterGroupTree
          nodes={filteredGroups}
          open={open}
          handleToggle={handleToggle}
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
        />
      </Box>
      <Box
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
            <ParameterInfo />
          </>
        ) : (
          <Typography
            sx={{ fontWeight: "bold", marginBottom: 2, fontSize: "30px" }}
          >
            파라미터 그룹을 선택하세요.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ParameterManagement;
