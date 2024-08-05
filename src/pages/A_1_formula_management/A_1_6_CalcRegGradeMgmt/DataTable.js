import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
} from "@mui/material";
import CheckboxColumn from "./CheckboxColumn";
import TextFieldColumn from "./TextFieldColumn";
import SelectColumn from "./SelectColumn";
import DateFieldColumn from "./DateFieldColumn";
import SnackbarNotification from "./SnackbarNotification";

const DataTable = ({
  data, // 테이블에 표시될 데이터 배열
  selectedRows, // 선택된 행들의 번호 배열
  setSelectedRows, // 선택된 행들을 설정하는 함수
  setData, // 데이터를 설정하는 함수
  focusRowNo, // 포커스될 행의 번호
  filters, // 필터 조건
  initialData, // 초기 데이터 배열
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false); // 스낵바 열림 상태를 관리하는 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호를 관리하는 상태
  const [rowsPerPage, setRowsPerPage] = useState(10); // 페이지당 표시될 행의 수를 관리하는 상태
  const textFieldRefs = useRef([]); // 각 텍스트 필드에 대한 참조를 관리하는 배열

  useEffect(() => {
    // focusRowNo가 변경될 때 호출되는 useEffect
    if (focusRowNo && textFieldRefs.current[focusRowNo]) {
      textFieldRefs.current[focusRowNo].focus(); // 해당 행의 텍스트 필드에 포커스 설정
    }
  }, [focusRowNo]);

  useEffect(() => {
    // filters가 변경될 때 호출되는 useEffect
    if (filters) {
      const filteredData = initialData.filter((row) => {
        // 필터 조건에 맞는 데이터 필터링
        const isActivityMatch = filters.activity
          ? row.activity === filters.activity // filters.activity가 존재하면 row.activity가 동일한지 확인
          : true;
        const isStartDateMatch = filters.startDate
          ? new Date(row.calcDate) >= new Date(filters.startDate) // filters.startDate가 존재하면 row.calcDate가 filters.startDate보다 크거나 같은지 확인
          : true;
        const isEndDateMatch = filters.endDate
          ? new Date(row.calcDate) <= new Date(filters.endDate) // filters.endDate가 존재하면 row.calcDate가 filters.endDate보다 작거나 같은지 확인
          : true;
        return isActivityMatch && isStartDateMatch && isEndDateMatch; // 모든 필터 조건을 만족하는지 확인
      });
      setData(filteredData); // 필터링된 데이터 설정
    } else {
      setData(initialData); // 초기 데이터 설정
    }
  }, [filters, initialData, setData]);

  const handleSelectAllClick = (event) => {
    // 모든 행을 선택하거나 선택을 해제하는 함수
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.no); // 모든 행의 번호를 선택된 번호 배열에 추가
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]); // 선택된 행 초기화
  };

  const handleCheckboxClick = (event, no) => {
    // 개별 행의 체크박스를 클릭할 때 호출되는 함수
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      // 행이 선택되지 않은 경우
      newSelected = newSelected.concat(selectedRows, no);
    } else if (selectedIndex === 0) {
      // 첫 번째 행인 경우
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      // 마지막 행인 경우
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      // 중간 행인 경우
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected); // 새로운 선택된 행 설정
  };

  const handleActivityChange = (event, no) => {
    // 배출활동 값을 변경할 때 호출되는 함수
    const newData = data.map((row) =>
      row.no === no ? { ...row, activity: event.target.value } : row
    );
    setData(newData); // 새로운 데이터 설정
  };

  const handleActivityBlur = (event, no) => {
    // 배출활동 입력 필드에서 포커스를 잃을 때 호출되는 함수
    setOpenSnackbar(true); // 스낵바 열기
    event.target.blur(); // 포커스 잃게 하기
  };

  const handleActivityKeyPress = (event, no) => {
    // 배출활동 입력 필드에서 키를 누를 때 호출되는 함수
    if (event.key === "Enter") {
      // Enter 키를 누른 경우
      event.preventDefault();
      if (textFieldRefs.current[no]) {
        textFieldRefs.current[no].blur(); // 포커스 잃게 하기
      }
    }
  };

  const handleDateChange = (event, no) => {
    // 날짜 값을 변경할 때 호출되는 함수
    const newData = data.map((row) =>
      row.no === no ? { ...row, calcDate: event.target.value } : row
    );
    setData(newData); // 새로운 데이터 설정
  };

  const handleDateKeyPress = (event) => {
    // 날짜 입력 필드에서 키를 누를 때 호출되는 함수
    if (event.key === "Enter") {
      // Enter 키를 누른 경우
      event.preventDefault();
      setOpenSnackbar(true); // 스낵바 열기
    }
  };

  const handleSelectChange = (event, no, field) => {
    // 셀렉트 박스 값을 변경할 때 호출되는 함수
    const newData = data.map((row) =>
      row.no === no ? { ...row, [field]: event.target.value } : row
    );
    setData(newData); // 새로운 데이터 설정
  };

  const isSelected = (no) => selectedRows.indexOf(no) !== -1; // 행이 선택되었는지 확인하는 함수

  const TableCellnStyles = {
    // 테이블 셀 스타일
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.26px",
  };

  const handleChangePage = (event, newPage) => {
    // 페이지를 변경할 때 호출되는 함수
    setPage(newPage); // 새로운 페이지 설정
  };

  const handleChangeRowsPerPage = (event) => {
    // 페이지당 표시될 행의 수를 변경할 때 호출되는 함수
    setRowsPerPage(parseInt(event.target.value, 10)); // 새로운 페이지당 행 수 설정
    setPage(0); // 페이지 번호 초기화
  };

  const sortedData = [...data].sort((a, b) => b.no - a.no); // 데이터 정렬
  const paginatedData = sortedData.slice(
    // 페이지네이션 적용된 데이터
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    // 일부 선택되었는지 확인
                    selectedRows.length > 0 && selectedRows.length < data.length
                  }
                  checked={
                    // 전체 선택되었는지 확인
                    data.length > 0 && selectedRows.length === data.length
                  }
                  onChange={handleSelectAllClick} // 전체 선택 클릭 핸들러
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>배출활동</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>배출시설규모</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>규정산정등급</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>사용량등급</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>순발열량등급</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>배출계수등급</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>산정계수등급</TableCell>
              <TableCell sx={{ ...TableCellnStyles }}>등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => {
              // 각 행 렌더링
              const isItemSelected = isSelected(row.no); // 행이 선택되었는지 확인
              return (
                <TableRow key={row.no} selected={isItemSelected}>
                  <CheckboxColumn
                    isItemSelected={isItemSelected} // 선택 여부 전달
                    handleCheckboxClick={handleCheckboxClick} // 체크박스 클릭 핸들러 전달
                    row={row} // 행 데이터 전달
                  />
                  <TableCell>{row.no}</TableCell>
                  <TextFieldColumn
                    row={row} // 행 데이터 전달
                    handleActivityChange={handleActivityChange} // 배출활동 변경 핸들러 전달
                    handleActivityBlur={handleActivityBlur} // 배출활동 블러 핸들러 전달
                    handleActivityKeyPress={handleActivityKeyPress} // 배출활동 키 프레스 핸들러 전달
                    textFieldRef={(el) => (textFieldRefs.current[row.no] = el)} // 텍스트 필드 참조 설정
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="emissionFacility" // 필드 이름 전달
                    options={["A그룹", "B그룹", "C그룹"]} // 셀렉트 옵션 전달
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="regulatoryGrade" // 필드 이름 전달
                    options={["A그룹", "B그룹", "C그룹"]} // 셀렉트 옵션 전달
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="usageGrade" // 필드 이름 전달
                    options={["Tier 1", "Tier 2", "Tier 3"]} // 셀렉트 옵션 전달
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="netEmissionGrade" // 필드 이름 전달
                    options={["Tier 1", "Tier 2", "Tier 3"]} // 셀렉트 옵션 전달
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="emissionCalcGrade" // 필드 이름 전달
                    options={["Tier 1", "Tier 2", "Tier 3"]} // 셀렉트 옵션 전달
                  />
                  <SelectColumn
                    row={row} // 행 데이터 전달
                    handleSelectChange={handleSelectChange} // 셀렉트 변경 핸들러 전달
                    field="calculationCoefficienGrade" // 필드 이름 전달
                    options={["Tier 1", "Tier 2", "Tier 3"]} // 셀렉트 옵션 전달
                  />
                  <DateFieldColumn
                    row={row} // 행 데이터 전달
                    handleDateChange={handleDateChange} // 날짜 변경 핸들러 전달
                    handleDateKeyPress={handleDateKeyPress} // 날짜 키 프레스 핸들러 전달
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // 페이지당 표시될 행 수 옵션
          component="div"
          count={data.length} // 데이터 총 개수
          rowsPerPage={rowsPerPage} // 페이지당 행 수
          page={page} // 현재 페이지
          onPageChange={handleChangePage} // 페이지 변경 핸들러
          onRowsPerPageChange={handleChangeRowsPerPage} // 페이지당 행 수 변경 핸들러
        />
      </TableContainer>
      <SnackbarNotification
        openSnackbar={openSnackbar} // 스낵바 열림 상태 전달
        setOpenSnackbar={setOpenSnackbar} // 스낵바 열림 상태 설정 함수 전달
      />
    </>
  );
};

export default DataTable;
