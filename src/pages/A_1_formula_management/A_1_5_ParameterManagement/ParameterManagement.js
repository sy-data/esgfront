import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, InputBase, Paper, IconButton } from "@mui/material";
import { fetchParameterGroupDetails, fetchParameterGroups } from "./api";
import ParameterGroupTree from "./ParameterGroupTree";
import newMenuList from "./MenuList";
import ParameterInfo from "./ParameterInfo";

const ParameterManagement = ({ userId }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState({});
  const searchTimeout = useRef(null);
  const [menuList, setMenuList] = useState([]); // 리스트 관리

  useEffect(() => {
    //파라미터 그룹 목록 가져오기
    const loadParameterGroups = async () => {
      const groups = await fetchParameterGroups();
      //상태 업데이트 로직 추가
      setMenuList(groups); //api에서 가져온 데이터로 메뉴 리스트 설정
    };
    loadParameterGroups();
  }, []);

  useEffect(() => {
    // selectedGroup이 null 또는 undefined가 아닌 경우에만 실행합니다.
    if (selectedGroup) {
      // 그룹 세부 정보를 비동기로 로드하는 함수입니다.
      const loadGroupDetails = async () => {
        // selectedGroup을 사용하여 그룹 세부 정보를 가져옵니다.
        const details = await fetchParameterGroupDetails(selectedGroup);

        // 가져온 세부 정보를 상태로 설정합니다.
        setGroupDetails(details);
      };
      // 그룹 세부 정보를 로드하는 함수를 호출합니다.
      loadGroupDetails();
    }
    // selectedGroup이 변경될 때마다 이 useEffect 훅을 실행합니다.
  }, [selectedGroup]);

  // 노드의 확장/축소 상태를 토글하는 함수입니다.
  const handleToggle = (id) => {
    // setOpen 함수를 사용하여 open 상태를 업데이트합니다.
    setOpen((prevState) =>
      // 이전 상태(prevState)를 복사하고, 특정 id의 값을 반전시킵니다.
      ({
        ...prevState, // 이전 상태 객체를 스프레드 연산자로 복사합니다.

        [id]: !prevState[id], // id에 해당하는 값을 반전시킵니다.
      })
    );
  };

  // 메뉴 리스트와 검색어를 기반으로 필터링된 메뉴 리스트를 반환하는 함수입니다.
  const filterMenu = (menuList, searchTerm) => {
    // menuList 배열을 순회하며 필터링을 수행합니다.
    return menuList.reduce((filtered, item) => {
      // 현재 아이템의 이름이 검색어를 포함하는 경우
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        // 현재 아이템을 필터링된 배열에 추가합니다.
        filtered.push(item);
      } else if (item.children && item.children.length > 0) {
        // 현재 아이템에 자식 아이템이 있는 경우
        // 자식 아이템들을 재귀적으로 필터링합니다.
        const filteredChildren = filterMenu(item.children, searchTerm);
        // 필터링된 자식 아이템이 있는 경우
        if (filteredChildren.length > 0) {
          // 현재 아이템을 복사하고, 자식 아이템을 필터링된 자식 아이템으로 설정하여 필터링된 배열에 추가합니다.
          filtered.push({ ...item, children: filteredChildren });
        }
      }
      // 필터링된 배열을 반환합니다.
      return filtered;
    }, []);
  };

  // 검색 입력 필드의 변경을 처리하는 함수입니다.
  const handleSearchChange = (event) => {
    // 이벤트 대상의 값(입력된 검색어)을 변수에 저장합니다.
    const value = event.target.value;

    // 이전에 설정된 타임아웃이 있으면 이를 제거합니다.
    clearTimeout(searchTimeout.current);

    // 새로운 타임아웃을 설정합니다. 타임아웃이 완료되면 검색어 상태를 업데이트합니다.
    searchTimeout.current = setTimeout(() => {
      // 입력된 값을 검색어 상태로 설정합니다.
      setSearchTerm(value);
    }, 300); // 300밀리초 후에 검색어 상태를 업데이트합니다.
  };

  const filteredGroups = filterMenu(newMenuList, searchTerm); // 필터링된 메뉴 리스트 사용

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
              파라미터 정보
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
