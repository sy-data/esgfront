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
import { updateData } from "./CRGMapi";

const DataTable = ({
  data,
  selectedRows,
  setSelectedRows,
  setData,
  focusRowNo,
  filters,
  initialData,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const textFieldRefs = useRef([]);

  useEffect(() => {
    // focusRowNo 값이 유효하고, 해당 행 번호의 텍스트 필드 참조가 존재하는지 확인
    if (focusRowNo && textFieldRefs.current[focusRowNo]) {
      // 해당 텍스트 필드에 포커스를 설정
      textFieldRefs.current[focusRowNo].focus();
    }
  }, [focusRowNo]); // focusRowNo 값이 변경될 때마다 이 훅이 실행

  useEffect(() => {
    // filters 상태가 존재하는지 확인
    if (filters) {
      // 초기 데이터를 필터링하여 조건에 맞는 데이터를 찾습니다.
      const filteredData = initialData.filter((row) => {
        // 활동(activity) 필터가 설정된 경우, 행의 활동 값이 필터 값과 일치하는지 확인
        const isActivityMatch = filters.activity
          ? row.activity === filters.activity
          : true;

        // 시작 날짜(startDate) 필터가 설정된 경우, 행의 계산 날짜(calcDate)가 시작 날짜 이후인지 확인
        const isStartDateMatch = filters.startDate
          ? new Date(row.calcDate) >= new Date(filters.startDate)
          : true;

        // 종료 날짜(endDate) 필터가 설정된 경우, 행의 계산 날짜(calcDate)가 종료 날짜 이전인지 확인
        const isEndDateMatch = filters.endDate
          ? new Date(row.calcDate) <= new Date(filters.endDate)
          : true;

        // 모든 필터 조건이 일치하는 경우에만 true를 반환하여 필터링
        return isActivityMatch && isStartDateMatch && isEndDateMatch;
      });
      setData(filteredData); // 필터링된 데이터를 상태로 설정
    } else {
      setData(initialData); // 필터가 없을 경우, 초기 데이터를 상태로 설정
    }
  }, [filters, initialData, setData]);

  const handleSelectAllClick = (event) => {
    // "전체 선택" 체크박스가 클릭되었는지 여부를 확인
    if (event.target.checked) {
      // 체크박스가 체크된 경우
      // data 배열의 각 요소의 no 값을 추출하여 새로운 배열 newSelecteds를 만듭니다.
      const newSelecteds = data.map((n) => n.no);
      setSelectedRows(newSelecteds); // 선택된 항목의 상태를 newSelecteds로 설정
      return;
    }
    // 체크박스가 체크 해제된 경우
    // 선택된 항목의 상태를 빈 배열로 설정하여 모든 선택을 해제합니다.
    setSelectedRows([]);
  };

  const handleCheckboxClick = (event, no) => {
    // 이벤트 전파를 중단하여 상위 요소의 클릭 이벤트가 실행되지 않도록 합니다.
    event.stopPropagation();

    // 선택된 항목 배열에서 현재 항목의 no가 있는지 찾습니다.
    const selectedIndex = selectedRows.indexOf(no);
    let newSelected = []; // 새로운 선택된 항목 배열을 초기화

    // 현재 항목의 no가 선택된 항목 배열에 없는 경우 (선택되지 않은 상태)
    if (selectedIndex === -1) {
      // 선택된 항목 배열에 현재 항목의 no를 추가
      newSelected = newSelected.concat(selectedRows, no);
    } else if (selectedIndex === 0) {
      // 현재 항목의 no가 선택된 항목 배열의 첫 번째 항목인 경우
      // 첫 번째 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      // 현재 항목의 no가 선택된 항목 배열의 마지막 항목인 경우
      // 마지막 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      // 현재 항목의 no가 선택된 항목 배열의 중간에 있는 경우
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex), // 현재 항목 전의 항목들
        selectedRows.slice(selectedIndex + 1) // 현재 항목 후의 항목들
      );
    }
    // 선택된 항목의 상태를 새로운 배열로 업데이트
    setSelectedRows(newSelected);
  };

  const handleActivityChange = async (event, no) => {
    // 데이터 배열에서 특정 행의 activity 값을 업데이트한 새로운 배열을 생성합니다.
    const newData = data.map((row) =>
      row.no === no ? { ...row, activity: event.target.value } : row
    );

    // 서버에 업데이트된 행 데이터를 전송합니다.
    await updateData(no, {
      // 업데이트할 행 데이터를 찾고, activity 값을 새로운 값으로 설정합니다.
      ...data.find((row) => row.no === no),
      activity: event.target.value,
    });
    // 상태를 새로운 데이터 배열로 업데이
    setData(newData);
  };

  const handleActivityBlur = (event, no) => {
    // 스낵바의 열림 상태를 true로 설정하여 스낵바를 엽니다.
    setOpenSnackbar(true);

    // 이벤트 타겟(현재 입력 필드)에서 포커스를 제거합니다.
    event.target.blur();
  };

  const handleActivityKeyPress = (event, no) => {
    // 눌린 키가 "Enter" 키인지 확인
    if (event.key === "Enter") {
      // 기본 엔터 키 동작(예: 폼 제출)을 방지
      event.preventDefault();

      // 해당 행 번호에 대한 텍스트 필드 참조가 존재하는지 확인
      if (textFieldRefs.current[no]) {
        // 해당 텍스트 필드에서 포커스를 제거
        textFieldRefs.current[no].blur();
      }
    }
  };

  const handleDateChange = async (event, no) => {
    // 데이터 배열에서 특정 행의 calcDate 값을 업데이트한 새로운 배열을 생성
    const newData = data.map((row) =>
      row.no === no ? { ...row, calcDate: event.target.value } : row
    );

    // 서버에 업데이트된 행 데이터를 전송
    await updateData(no, {
      // 업데이트할 행 데이터를 찾고, calcDate 값을 새로운 값으로 설정
      ...data.find((row) => row.no === no),
      calcDate: event.target.value,
    });
    // 상태를 새로운 데이터 배열로 업데이트
    setData(newData);
  };

  const handleDateKeyPress = (event) => {
    // 눌린 키가 "Enter" 키인지 확인합니다.
    if (event.key === "Enter") {
      // 기본 엔터 키 동작(예: 폼 제출)을 방지합니다.
      event.preventDefault();
      // 스낵바의 열림 상태를 true로 설정하여 스낵바를 엽니다.
      setOpenSnackbar(true);
    }
  };

  const handleSelectChange = async (event, no, field) => {
    // 데이터 배열에서 특정 행의 지정된 필드 값을 업데이트한 새로운 배열을 생성
    const newData = data.map((row) =>
      row.no === no ? { ...row, [field]: event.target.value } : row
    );

    // 서버에 업데이트된 행 데이터를 전송
    await updateData(no, {
      // 업데이트할 행 데이터를 찾고, 지정된 필드 값을 새로운 값으로 설정
      ...data.find((row) => row.no === no),
      [field]: event.target.value,
    });
    setData(newData);
  };

  const isSelected = (no) => selectedRows.indexOf(no) !== -1;
  // 선택된 행의 번호가 selectedRows 배열에 있는지 확인하여 true 또는 false를 반환

  const TableCellnStyles = {
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.26px",
  };

  const handleChangePage = (event, newPage) => {
    // 새로운 페이지 번호를 상태로 설정
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // 선택된 페이지당 행 수를 정수로 변환하여 상태로 설정
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지를 첫 페이지로 초기화
  };

  // 데이터를 복사한 배열을 생성하고 no 필드 기준으로 내림차순 정렬
  const sortedData = [...data].sort((a, b) => b.no - a.no);

  // 현재 페이지와 페이지당 행 수를 기준으로 데이터를 자릅니다.
  const paginatedData = sortedData.slice(
    page * rowsPerPage, // 시작 인덱스
    page * rowsPerPage + rowsPerPage // 끝 인덱스
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
                    selectedRows.length > 0 && selectedRows.length < data.length
                  }
                  checked={
                    data.length > 0 && selectedRows.length === data.length
                  }
                  onChange={handleSelectAllClick}
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
            {paginatedData.map((row) => {
              const isItemSelected = isSelected(row.no);
              return (
                <TableRow key={row.no} selected={isItemSelected}>
                  <CheckboxColumn
                    isItemSelected={isItemSelected}
                    handleCheckboxClick={handleCheckboxClick}
                    row={row}
                  />
                  <TableCell>{row.no}</TableCell>
                  <TextFieldColumn
                    row={row}
                    handleActivityChange={handleActivityChange}
                    handleActivityBlur={handleActivityBlur}
                    handleActivityKeyPress={handleActivityKeyPress}
                    textFieldRef={(el) => (textFieldRefs.current[row.no] = el)}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="emissionFacility"
                    options={["A그룹", "B그룹", "C그룹"]}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="regulatoryGrade"
                    options={["A그룹", "B그룹", "C그룹"]}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="usageGrade"
                    options={["Tier 1", "Tier 2", "Tier 3"]}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="netEmissionGrade"
                    options={["Tier 1", "Tier 2", "Tier 3"]}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="emissionCalcGrade"
                    options={["Tier 1", "Tier 2", "Tier 3"]}
                  />
                  <SelectColumn
                    row={row}
                    handleSelectChange={handleSelectChange}
                    field="calculationCoefficienGrade"
                    options={["Tier 1", "Tier 2", "Tier 3"]}
                  />
                  <DateFieldColumn
                    row={row}
                    handleDateChange={handleDateChange}
                    handleDateKeyPress={handleDateKeyPress}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <SnackbarNotification
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
};

export default DataTable;
