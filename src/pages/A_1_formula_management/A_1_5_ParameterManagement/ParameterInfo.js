import React, { useState, useRef, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import { exampleData } from "./exampleData";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import PaginationControls from "./PaginationControls";

const ParameterInfo = () => {
  const [data, setData] = useState(exampleData); // 테이블에 표시할 데이터를 저장합니다.
  const [filters, setFilters] = useState({
    energyIndustry: "",
    activity: "",
    fuel: "",
  }); // 필터 상태를 저장합니다.
  const [page, setPage] = useState(1); // 현재 페이지 번호를 저장합니다.
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행들을 저장합니다.
  const [allSelected, setAllSelected] = useState(false); // 모든 행 선택 상태를 저장합니다.
  const newRowRef = useRef(null); // 새로 추가된 행을 참조하기 위한 ref를 설정합니다.
  const [openSnackbar, setOpenSnackbar] = useState(false); // 스낵바 열림 상태를 저장합니다.

  // 필터 변경을 처리하는 함수입니다.
  const handleFilterChange = (e) => {
    // 기존 필터 상태를 복사하고, 이벤트 대상의 이름과 값을 사용하여 특정 필터를 업데이트합니다.
    setFilters({
      ...filters,
      // 이벤트 객체(e)에서 변경된 필터의 이름과 값을 추출하여 새로운 필터 상태를 설정합니다.
      [e.target.name]: e.target.value,
    });
  };

  // 검색 버튼 클릭을 처리하는 함수입니다.
  const handleSearch = () => {
    console.log("필터로 검색하기", filters);
  };

  // 페이지 변경을 처리하는 함수입니다.
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // 개별 행 선택을 처리하는 함수입니다.
  const handleSelectRow = (id) => {
    // 상태를 업데이트합니다. 이전 상태(prev)를 사용하여 상태를 설정합니다.
    setSelectedRows((prev) =>
      // 이전 상태 배열(prev)에 선택된 id가 포함되어 있는지 확인합니다.
      prev.includes(id)
        ? // id가 포함되어 있으면, 해당 id를 제외한 새로운 배열을 반환합니다.
          // 행의 선택을 해제하는 동작입니다.
          prev.filter((rowId) => rowId !== id)
        : // id가 포함되어 있지 않으면, 해당 id를 이전 상태 배열에 추가한 새로운 배열을 반환합니다.
          // 행을 선택하는 동작입니다.
          [...prev, id]
    );
  };

  // 모든 행 선택을 처리하는 함수입니다.
  const handleSelectAllRows = () => {
    // 모든 행이 선택된 상태인지 여부를 확인합니다.
    if (allSelected) {
      // 모든 행이 선택된 상태인 경우, 선택된 행 배열을 빈 배열로 설정하여 모든 선택을 해제합니다.
      setSelectedRows([]);
    } else {
      // 모든 행이 선택되지 않은 상태인 경우, 모든 행의 ID를 선택된 행 배열에 추가하여 모든 행을 선택합니다.
      setSelectedRows(data.map((row) => row.id));
    }
    // 모든 행 선택 상태를 반전시킵니다.
    setAllSelected(!allSelected);
  };

  // 선택된 행 삭제를 처리하는 함수입니다.
  const handleDelete = () => {
    // setData 함수를 사용하여 데이터를 업데이트합니다.
    setData((prevData) =>
      // prevData 배열을 필터링합니다. 선택된 행들의 ID를 포함하지 않는 행들만 남깁니다.
      prevData.filter((row) => !selectedRows.includes(row.id))
    );

    // 선택된 행 배열을 빈 배열로 설정하여 모든 선택을 해제합니다.
    setSelectedRows([]);
  };

  // 새 행 추가를 처리하는 함수입니다.
  const handleAddRow = () => {
    const newId = data.length + 1;
    setData([
      ...data,
      {
        id: newId,
        parameterID: "",
        upperGroup: "",
        group: "",
        inputType: "",
        tier: "Tier 1",
        value: "",
        version: "",
        unit: "TJ",
        fuel: "",
        activity: "",
        industry: "",
      },
    ]);
    const newPage = Math.ceil((data.length + 1) / 10);
    setPage(newPage);
    newRowRef.current = `upperGroup-${newId}`;
  };

  // 새로 추가된 행에 포커스를 설정하는 useEffect 훅입니다.
  useEffect(() => {
    if (newRowRef.current !== null) {
      const newRowElement = document.getElementById(newRowRef.current);
      if (newRowElement) {
        newRowElement.focus();
      }
      newRowRef.current = null;
    }
  }, [data]);

  // 페이지당 표시할 행의 수를 설정합니다.
  const rowsPerPage = 10;

  // 현재 페이지에 표시할 행들을 계산합니다.
  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // 키다운 이벤트를 처리하는 함수입니다.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      setOpenSnackbar(true);
    }
  };

  // 스낵바 닫기를 처리하는 함수입니다.
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: 2000, padding: "0 10px" }}>
      <FilterControls
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleSearch={handleSearch}
        handleAddRow={handleAddRow}
        handleDelete={handleDelete}
        selectedRows={selectedRows}
      />
      <DataTable
        data={displayedRows}
        selectedRows={selectedRows}
        allSelected={allSelected}
        handleSelectAllRows={handleSelectAllRows}
        handleSelectRow={handleSelectRow}
        page={page}
        rowsPerPage={rowsPerPage}
        handleKeyDown={handleKeyDown}
      />
      <PaginationControls
        page={page}
        count={Math.ceil(data.length / rowsPerPage)}
        handleChangePage={handleChangePage}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          저장되었습니다
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ParameterInfo;
