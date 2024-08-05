import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";
import { data as initialData } from "./data";
import {
  containerStyles,
  innerBoxStyles,
  headerStyles,
  titleStyles,
  buttonBoxStyles,
  addButtonStyles,
  deleteButtonStyles,
} from "./styles";

const CalcRegGradeMgmt = () => {
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행들을 관리하는 상태 정의
  const [data, setData] = useState(initialData); // 데이터 상태 정의 및 초기값 설정
  const [filteredData, setFilteredData] = useState(initialData); // 필터링된 데이터 상태 정의 및 초기값 설정
  const [focusRowNo, setFocusRowNo] = useState(null); // 포커스된 행 번호 상태 정의
  const [openSnackbar, setOpenSnackbar] = useState(false); // 스낵바 열림 상태 정의
  const [filters, setFilters] = useState(null); // 필터 상태 정의

  const handleAddRow = useCallback(() => {
    // 행 추가 함수 정의
    const newRow = {
      // 새로운 행 객체 생성
      no: data.length + 1, // 새로운 행의 번호 설정
      activity: "",
      emissionFacility: "",
      regulatoryGrade: "",
      usageGrade: "",
      netEmissionGrade: "",
      emissionCalcGrade: "",
      calculationCoefficienGrade: "",
      calcDate: "",
    };
    const newData = [newRow, ...data]; // 새로운 행을 데이터 배열의 앞에 추가
    setData(newData); // 데이터 상태 업데이트
    setFilteredData(newData); // 필터링된 데이터 상태 업데이트
    setFilters(null); // 검색 조건 초기화
    setFocusRowNo(newRow.no); // 포커스된 행 번호 설정
  }, [data]); // data가 변경될 때마다 업데이트

  const handleDelete = useCallback(() => {
    // 선택된 행 삭제 함수 정의
    const newData = data.filter((row) => !selectedRows.includes(row.no)); // 선택된 행을 제외한 새로운 데이터 배열 생성
    setData(newData); // 데이터 상태 업데이트
    setFilteredData(newData); // 필터링된 데이터 상태 업데이트
    setSelectedRows([]); // 선택된 행 초기화
  }, [data, selectedRows]); // data와 selectedRows가 변경될 때마다 업데이트

  const handleSearch = useCallback((filters) => {
    // 검색 함수 정의
    setFilters(filters); // 필터 상태 설정
    const filteredData = initialData.filter((row) => {
      // 필터 조건에 맞는 데이터 필터링
      const isActivityMatch = filters.activity // activity 필터 조건 확인
        ? row.activity === filters.activity
        : true;
      const isStartDateMatch = filters.startDate // 시작 날짜 필터 조건 확인
        ? new Date(row.calcDate) >= new Date(filters.startDate)
        : true;
      const isEndDateMatch = filters.endDate // 종료 날짜 필터 조건 확인
        ? new Date(row.calcDate) <= new Date(filters.endDate)
        : true;
      return isActivityMatch && isStartDateMatch && isEndDateMatch; // 모든 필터 조건을 만족하는지 확인
    });
    setFilteredData(filteredData); // 필터링된 데이터 상태 업데이트
  }, []);

  const handleSave = useCallback(() => {
    // 저장 함수 정의
    setOpenSnackbar(true); // 스낵바 열림 상태 설정
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    // 스낵바 닫기 함수 정의
    setOpenSnackbar(false); // 스낵바 열림 상태 해제
  }, []);

  return (
    <Container sx={containerStyles}>
      {/* 컨테이너 컴포넌트, 스타일 적용 */}
      <SearchBar
        onSearch={handleSearch} // 검색 함수 핸들러 설정
        onClear={() => setFilteredData(initialData)} // 검색 조건 초기화 핸들러 설정
      />
      <Box sx={innerBoxStyles}>
        {/* 내부 박스 컴포넌트, 스타일 적용 */}
        <Box>
          <Box sx={headerStyles}>
            {/* 헤더 박스, 스타일 적용 */}
            <Typography variant="h6" gutterBottom sx={titleStyles}>
              {/* 제목, 스타일 적용 */}
              산정식규정등급 목록
            </Typography>
            <Box sx={buttonBoxStyles}>
              {/* 버튼 박스, 스타일 적용 */}
              <Button
                variant="contained"
                color="primary"
                sx={addButtonStyles} /* 추가 버튼, 스타일 적용 */
                onClick={handleAddRow} // 추가 함수 핸들러 설정
              >
                추가
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={
                  selectedRows.length === 0
                } /* 선택된 행이 없을 때 비활성화 */
                sx={deleteButtonStyles(
                  selectedRows.length
                )} /* 삭제 버튼, 스타일 적용 */
                onClick={handleDelete} // 삭제 함수 핸들러 설정
              >
                삭제
              </Button>
            </Box>
          </Box>
          <DataTable
            data={filteredData} // 필터링된 데이터 전달
            selectedRows={selectedRows} // 선택된 행 전달
            setSelectedRows={setSelectedRows} // 선택된 행 설정 함수 전달
            setData={setData} // 데이터 설정 함수 전달
            focusRowNo={focusRowNo} // 포커스된 행 번호 전달
            filters={filters} // 필터 전달
            initialData={initialData} // 초기 데이터 전달
          />
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar} // 스낵바 열림 상태
        autoHideDuration={3000} // 자동 닫힘 시간 설정
        onClose={handleCloseSnackbar} // 스낵바 닫기 함수 핸들러 설정
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {/* 알림 메시지, 성공 유형 */}
          저장되었습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CalcRegGradeMgmt;
