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

  // 특정 행에 포커스를 맞춤
  useEffect(() => {
    if (focusRowNo && textFieldRefs.current[focusRowNo]) {
      textFieldRefs.current[focusRowNo].focus();
    }
  }, [focusRowNo]);

  // 필터 적용
  useEffect(() => {
    if (filters) {
      const filteredData = initialData.filter((row) => {
        const isActivityMatch = filters.activity
          ? row.activity === filters.activity
          : true;

        const isStartDateMatch = filters.startDate
          ? new Date(row.calcDate) >= new Date(filters.startDate)
          : true;

        const isEndDateMatch = filters.endDate
          ? new Date(row.calcDate) <= new Date(filters.endDate)
          : true;

        return isActivityMatch && isStartDateMatch && isEndDateMatch;
      });
      setData(filteredData);
    } else {
      setData(initialData);
    }
  }, [filters, initialData, setData]);

  // 전체 선택/해제 핸들러
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.no);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  // 개별 체크박스 선택 핸들러
  const handleCheckboxClick = (event, no) => {
    event.stopPropagation();

    const selectedIndex = selectedRows.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }
    setSelectedRows(newSelected);
  };

  // 활동 변경 핸들러
  const handleActivityChange = async (event, no) => {
    const newData = data.map((row) =>
      row.no === no ? { ...row, activity: event.target.value } : row
    );

    await updateData(no, {
      ...data.find((row) => row.no === no),
      activity: event.target.value,
    });
    setData(newData);
  };

  // 활동 필드 블러 핸들러
  const handleActivityBlur = (event, no) => {
    setOpenSnackbar(true);
    event.target.blur();
  };

  // 활동 필드 키프레스 핸들러
  const handleActivityKeyPress = (event, no) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (textFieldRefs.current[no]) {
        textFieldRefs.current[no].blur();
      }
    }
  };

  // 날짜 변경 핸들러
  const handleDateChange = async (event, no) => {
    const newData = data.map((row) =>
      row.no === no ? { ...row, calcDate: event.target.value } : row
    );

    await updateData(no, {
      ...data.find((row) => row.no === no),
      calcDate: event.target.value,
    });
    setData(newData);
  };

  // 날짜 필드 키프레스 핸들러
  const handleDateKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOpenSnackbar(true);
    }
  };

  // 셀렉트 필드 변경 핸들러
  const handleSelectChange = async (event, no, field) => {
    const newData = data.map((row) =>
      row.no === no ? { ...row, [field]: event.target.value } : row
    );

    await updateData(no, {
      ...data.find((row) => row.no === no),
      [field]: event.target.value,
    });
    setData(newData);
  };

  // 행 선택 여부 확인
  const isSelected = (no) => selectedRows.indexOf(no) !== -1;

  const TableCellnStyles = {
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    letterSpacing: "-0.26px",
  };

  // 페이지 변경 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 행 수 변경 핸들러
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => b.no - a.no);

  const paginatedData = sortedData.slice(
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
              <TableCell sx={{ ...TableCellnStyles }}>산화계수등급</TableCell>
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
