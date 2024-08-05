import React, { useRef } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { CustomArrowRightIcon } from "./CustomArrowIcon";
import { commonStyles } from "./styles";

const DatePicker = ({
  startDate, // 시작일 값
  endDate, // 종료일 값
  handleStartDateChange, // 시작일 변경 핸들러 함수
  handleEndDateChange, // 종료일 변경 핸들러 함수
}) => {
  const startDateRef = useRef(null); // 시작일 입력 필드에 대한 레퍼런스 생성
  const endDateRef = useRef(null); // 종료일 입력 필드에 대한 레퍼런스 생성
  const today = new Date().toISOString().split("T")[0]; // 현재 날짜를 ISO 형식으로 변환하여 문자열로 저장

  const handleStartDateClick = () => {
    // 시작일 필드 클릭 시 호출되는 함수
    if (startDateRef.current) {
      // 레퍼런스가 존재하는 경우
      startDateRef.current.showPicker(); // 날짜 선택기를 보여줌
    }
  };

  const handleEndDateClick = () => {
    // 종료일 필드 클릭 시 호출되는 함수
    if (endDateRef.current) {
      // 레퍼런스가 존재하는 경우
      endDateRef.current.showPicker(); // 날짜 선택기를 보여줌
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ ...commonStyles }}>
      <TextField
        label="시작일" // 라벨 설정
        variant="outlined" // 아웃라인 스타일 적용
        size="small" // 작은 크기로 설정
        type="date" // 입력 유형을 날짜로 설정
        value={startDate} // 시작일 값을 설정
        onChange={handleStartDateChange} // 값 변경 시 호출되는 핸들러 설정
        InputLabelProps={{ shrink: true }} // 라벨을 항상 축소 상태로 설정
        fullWidth // 필드가 전체 너비를 차지하도록 설정
        inputRef={startDateRef} // 시작일 입력 필드에 대한 레퍼런스 설정
        onClick={handleStartDateClick} // 필드 클릭 시 호출되는 핸들러 설정
        InputProps={{
          endAdornment: <InputAdornment position="end" />, // 입력 필드 끝에 여백 추가
          inputProps: {
            max: today, // 최대 날짜를 오늘 날짜로 설정
            style: {
              color: startDate && startDate > today ? "gray" : "inherit", // 날짜가 오늘보다 늦으면 회색으로 표시
              cursor:
                startDate && startDate > today ? "not-allowed" : "pointer", // 날짜가 오늘보다 늦으면 커서 모양을 변경
            },
          },
        }}
        sx={{ flex: 1, marginRight: -2, backgroundColor: "#FFF" }}
      />
      <CustomArrowRightIcon />
      <TextField
        label="종료일" // 라벨 설정
        variant="outlined" // 아웃라인 스타일 적용
        size="small" // 작은 크기로 설정
        type="date" // 입력 유형을 날짜로 설정
        value={endDate} // 종료일 값을 설정
        onChange={handleEndDateChange} // 값 변경 시 호출되는 핸들러 설정
        InputLabelProps={{ shrink: true }} // 라벨을 항상 축소 상태로 설정
        fullWidth // 필드가 전체 너비를 차지하도록 설정
        inputRef={endDateRef} // 종료일 입력 필드에 대한 레퍼런스 설정
        onClick={handleEndDateClick} // 필드 클릭 시 호출되는 핸들러 설정
        InputProps={{
          endAdornment: <InputAdornment position="end" />, // 입력 필드 끝에 여백 추가
          inputProps: {
            max: today, // 최대 날짜를 오늘 날짜로 설정
            style: {
              color: endDate && endDate > today ? "gray" : "inherit", // 날짜가 오늘보다 늦으면 회색으로 표시
              cursor: endDate && endDate > today ? "not-allowed" : "pointer", // 날짜가 오늘보다 늦으면 커서 모양을 변경
            },
          },
        }}
        sx={{ flex: 1, marginLeft: -2, backgroundColor: "#FFF" }}
      />
    </Box>
  );
};

export default DatePicker;
