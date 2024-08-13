import React, { useState, useEffect, useCallback } from "react";
import { Box, Button } from "@mui/material";
import CustomSelect from "./CustomSelect";
import DatePicker from "./DatePicker";
import DialogAlert from "./DialogAlert";
import { activeButtonStyles, inactiveButtonStyles } from "./styles";

const DIALOG_MESSAGES = {
  INVALID_START_DATE: "종료일 날짜보다 늦습니다.",
  INVALID_END_DATE: "시작일 앞으로 지정할 수 없습니다.",
};

const SearchBar = ({ onSearch, onClear }) => {
  const [activity, setActivity] = useState(""); // 활동 상태
  const [startDate, setStartDate] = useState(""); // 시작일 상태
  const [endDate, setEndDate] = useState(""); // 종료일 상태
  const [openDialog, setOpenDialog] = useState(false); // 대화 상자 열림 상태
  const [isButtonActive, setIsButtonActive] = useState(false); // 버튼 활성화 상태
  const [dialogMessage, setDialogMessage] = useState(""); // 대화 상자 메시지 상태

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false); // 대화 상자 닫기
  }, []);

  const handleStartDateChange = useCallback(
    (e) => {
      const selectedDate = e.target.value;
      if (endDate && selectedDate > endDate) {
        setDialogMessage(DIALOG_MESSAGES.INVALID_START_DATE); // 경고 메시지 설정
        setOpenDialog(true); // 대화 상자 열기
      } else {
        setStartDate(selectedDate); // 시작일 설정
      }
    },
    [endDate]
  );

  const handleEndDateChange = useCallback(
    (e) => {
      const selectedDate = e.target.value;
      if (startDate && selectedDate < startDate) {
        setDialogMessage(DIALOG_MESSAGES.INVALID_END_DATE); // 경고 메시지 설정
        setOpenDialog(true); // 대화 상자 열기
      } else {
        setEndDate(selectedDate); // 종료일 설정
      }
    },
    [startDate]
  );

  useEffect(() => {
    setIsButtonActive(activity && startDate && endDate);
  }, [activity, startDate, endDate]);

  const handleSearchClick = useCallback(() => {
    onSearch({ activity, startDate, endDate }); // 검색 조건 전달
  }, [activity, startDate, endDate, onSearch]);

  const handleClearClick = useCallback(() => {
    setActivity(""); // 활동 상태 초기화
    setStartDate(""); // 시작일 상태 초기화
    setEndDate(""); // 종료일 상태 초기화
    onClear(); // 초기화 함수 호출
  }, [onClear]);

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
            ...(isButtonActive ? activeButtonStyles : inactiveButtonStyles),
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
          onClick={handleClearClick}
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
