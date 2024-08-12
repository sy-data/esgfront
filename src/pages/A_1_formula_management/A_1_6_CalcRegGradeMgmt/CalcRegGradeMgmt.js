import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";
import { data as initialData } from "./data";
import { fetchData, addData, deleteData, updateData } from "./CRGMapi";
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [focusRowNo, setFocusRowNo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 데이터 불러오기
    fetchData().then((response) => {
      // fetchData 함수가 반환한 데이터를 상태에 설정
      setData(response);
      // 필터링된 데이터 상태도 초기 데이터로 설정
      setFilteredData(response);
    });
  }, []);

  const handleAddRow = useCallback(async () => {
    const newRow = {
      no: data.length + 1, // 새로운 행 번호 (현재 데이터 길이에 1을 더한 값)
      activity: "",
      emissionFacility: "",
      regulatoryGrade: "",
      usageGrade: "",
      netEmissionGrade: "",
      emissionCalcGrade: "",
      calculationCoefficienGrade: "",
      calcDate: "",
    };
    // 새로운 행 데이터를 서버에 추가하는 API 호출을 수행
    const response = await addData(newRow);

    // 새로운 행 데이터를 포함한 새로운 데이터 배열을 생성하고 상태를 업데이트
    setData([response, ...data]);

    // 필터링된 데이터 배열도 동일하게 업데이트
    setFilteredData([response, ...data]);

    // 포커스를 새로운 행 번호로 설정
    setFocusRowNo(response.no);
  }, [data]);

  const handleDelete = useCallback(async () => {
    // 선택된 행들의 ID에 대해 비동기 삭제 요청을 병렬로 보냅니다.
    await Promise.all(selectedRows.map((rowId) => deleteData(rowId)));

    // 선택된 행들을 제외한 새로운 데이터 배열을 생성합니다.
    const newData = data.filter((row) => !selectedRows.includes(row.no));

    // 새로운 데이터 배열로 상태를 업데이트
    setData(newData);

    // 필터링된 데이터 배열도 동일하게 업데이트
    setFilteredData(newData);

    // 선택된 행들을 초기화
    setSelectedRows([]);
  }, [data, selectedRows]);

  const handleSearch = useCallback((filters) => {
    // 전달된 필터를 상태로 설정
    setFilters(filters);

    // 초기 데이터를 필터링하여 조건에 맞는 데이터를 찾습니다.
    const filtered = initialData.filter((row) => {
      // 활동(activity) 필터가 설정된 경우, 행의 활동 값이 필터 값과 일치하는지 확인합니다.
      const isActivityMatch = filters.activity
        ? row.activity === filters.activity
        : true;

      // 시작 날짜(startDate) 필터가 설정된 경우, 행의 계산 날짜(calcDate)가 시작 날짜 이후인지 확인합니다.
      const isStartDateMatch = filters.startDate
        ? new Date(row.calcDate) >= new Date(filters.startDate)
        : true;

      // 종료 날짜(endDate) 필터가 설정된 경우, 행의 계산 날짜(calcDate)가 종료 날짜 이전인지 확인합니다.
      const isEndDateMatch = filters.endDate
        ? new Date(row.calcDate) <= new Date(filters.endDate)
        : true;

      // 모든 필터 조건이 일치하는 경우에만 true를 반환하여 필터링합니다.
      return isActivityMatch && isStartDateMatch && isEndDateMatch;
    });
    setFilteredData(filtered);
  }, []);

  const handleSave = useCallback(async () => {
    await Promise.all(data.map((row) => updateData(row.no, row)));
    setOpenSnackbar(true);
  }, [data]);

  const handleCloseSnackbar = useCallback(() => {
    // 스낵바의 열림 상태를 false로 설정하여 스낵바를 닫습니다.
    setOpenSnackbar(false);
  }, []);

  return (
    <Container sx={containerStyles}>
      <SearchBar
        onSearch={handleSearch}
        onClear={() => setFilteredData(initialData)}
      />
      <Box sx={innerBoxStyles}>
        <Box>
          <Box sx={headerStyles}>
            <Typography variant="h6" gutterBottom sx={titleStyles}>
              산정식규정등급 목록
            </Typography>
            <Box sx={buttonBoxStyles}>
              <Button
                variant="contained"
                color="primary"
                sx={addButtonStyles}
                onClick={handleAddRow}
              >
                추가
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={selectedRows.length === 0}
                sx={deleteButtonStyles(selectedRows.length)}
                onClick={handleDelete}
              >
                삭제
              </Button>
            </Box>
          </Box>
          <DataTable
            data={filteredData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setData={setData}
            focusRowNo={focusRowNo}
            filters={filters}
            initialData={initialData}
          />
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          저장되었습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CalcRegGradeMgmt;
