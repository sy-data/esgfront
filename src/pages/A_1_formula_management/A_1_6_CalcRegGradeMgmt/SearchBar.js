import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import CustomSelect from "./CustomSelect";
import DatePicker from "./DatePicker";
import DialogAlert from "./DialogAlert";
import { activeButtonStyles, inactiveButtonStyles } from "./styles";

const SearchBar = ({ onSearch, onClear }) => {
  const [activity, setActivity] = useState(""); // 활동 상태
  const [startDate, setStartDate] = useState(""); // 시작일 상태
  const [endDate, setEndDate] = useState(""); // 종료일 상태
  const [openDialog, setOpenDialog] = useState(false); // 대화 상자 열림 상태
  const [isButtonActive, setIseButtonActive] = useState(false); // 버튼 활성화 상태
  const [dialogMessage, setDialogMessage] = useState(""); // 대화 상자 메시지 상태

  const handleDialogClose = () => {
    // 대화 상자 닫기 핸들러
    setOpenDialog(false); // 대화 상자 닫기
  };

  const handleStartDateChange = (e) => {
    // 시작일 변경 핸들러
    const selectedDate = e.target.value; // 선택된 날짜
    if (endDate && selectedDate > endDate) {
      // 선택된 날짜가 종료일보다 늦으면
      setDialogMessage("종료일 날짜보다 늦습니다."); // 경고 메시지 설정
      setOpenDialog(true); // 대화 상자 열기
    } else {
      setStartDate(selectedDate); // 시작일 설정
    }
  };

  const handleEndDateChange = (e) => {
    // 종료일 변경 핸들러
    const selectedDate = e.target.value; // 선택된 날짜
    if (startDate && selectedDate < startDate) {
      // 선택된 날짜가 시작일보다 이르면
      setDialogMessage("시작일 앞으로 지정할 수 없습니다."); // 경고 메시지 설정
      setOpenDialog(true); // 대화 상자 열기
    } else {
      setEndDate(selectedDate); // 종료일 설정
    }
  };

  useEffect(() => {
    // 활동, 시작일, 종료일이 변경될 때마다 실행되는 효과
    if (activity && startDate && endDate) {
      // 모든 필드가 입력되면
      setIseButtonActive(true); // 버튼 활성화
    } else {
      setIseButtonActive(false); // 버튼 비활성화
    }
  }, [activity, startDate, endDate]);

  const handleSearchClick = () => {
    // 검색 버튼 클릭 핸들러
    onSearch({ activity, startDate, endDate }); // 검색 조건 전달
  };

  const handleClearClick = () => {
    // 초기화 버튼 클릭 핸들러
    setActivity(""); // 활동 상태 초기화
    setStartDate(""); // 시작일 상태 초기화
    setEndDate(""); // 종료일 상태 초기화
    onClear(); // 초기화 함수 호출
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={2}
      gap={2}
      sx={{ marginTop: 3 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <CustomSelect activity={activity} setActivity={setActivity} />
        <DatePicker
          startDate={startDate} // 시작일 값 전달
          endDate={endDate} // 종료일 값 전달
          handleStartDateChange={handleStartDateChange} // 시작일 변경 핸들러 전달
          handleEndDateChange={handleEndDateChange} // 종료일 변경 핸들러 전달
        />
        <Button
          variant="contained"
          sx={{
            ...(isButtonActive ? activeButtonStyles : inactiveButtonStyles), // 버튼 스타일 설정
            marginRight: 2,
          }}
          disabled={!isButtonActive} // 버튼 활성화 여부 설정
          onClick={handleSearchClick} // 검색 버튼 클릭 핸들러 설정
        >
          검색
        </Button>
        <Button
          variant="outlined"
          sx={{ marginRight: 40 }}
          onClick={handleClearClick} // 초기화 버튼 클릭 핸들러 설정
        >
          초기화
        </Button>
      </Box>
      <DialogAlert
        open={openDialog} // 대화 상자 열림 상태 전달
        handleClose={handleDialogClose} // 대화 상자 닫기 핸들러 전달
        message={dialogMessage} // 대화 상자 메시지 전달
      />
    </Box>
  );
};

export default SearchBar;
