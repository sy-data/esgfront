import React, { useState, useRef, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import PaginationControls from "./PaginationControls";
import {
  searchParameters,
  addParameter,
  deleteParameter,
  fetchParameterGroupDetails,
} from "./api";

const initialFilters = {
  energyIndustry: "",
  activity: "",
  fuel: "",
  searchTerm: "",
};

const ParameterInfo = () => {
  const [data, setData] = useState([]); // 테이블에 표시할 데이터를 저장합니다.
  const [filters, setFilters] = useState({ initialFilters }); // 필터 상태를 저장합니다.
  const [page, setPage] = useState(1); // 현재 페이지 번호를 저장합니다.
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행들을 저장합니다.
  const [allSelected, setAllSelected] = useState(false); // 모든 행 선택 상태를 저장합니다.
  const newRowRef = useRef(null); // 새로 추가된 행을 참조하기 위한 ref를 설정합니다.
  const [openSnackbar, setOpenSnackbar] = useState(false); // 스낵바 열림 상태를 저장합니다.
  const [parameterDetails, setParameterDetails] = useState(null); // 선택된 파라미터의 세부 정보를 저장합니다.

  // 행추가 자동 포커스 최적화 코드
  useEffect(() => {
    if (newRowRef.current) {
      const newRowElement = document.getElementById(newRowRef.current);
      if (newRowElement) {
        newRowElement.focus();
      }
      newRowRef.current = null;
    }
  }, [data]);

  // 필터 변경을 처리하는 함수입니다.
  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  // 검색 버튼 클릭을 처리하는 함수입니다.
  const handleSearch = async () => {
    const result = await searchParameters(filters.searchTerm);
    setData(result);
  };

  // 새 행 추가를 처리하는 함수입니다.
  const handleAddRow = async () => {
    const newParameter = {
      name: "Parameter " + (data.length + 1),
      value: "Value " + (data.length + 1),
      parameterID: "",
      upperGroup: "",
      group: "",
      inputType: "",
      tier: "Tier 1",
      version: "",
      unit: "TJ",
      fuel: "프로판",
      activity: "역세권 연소",
      industry: "에너지산업",
    };

    const result = await addParameter(newParameter);
    if (result) {
      setData((prevData) => [...prevData, result]);
      setPage(Math.ceil((data.length + 1) / 10));
      newRowRef.current = `upperGroup-${result.id}`;
    }
  };

  // 특정 파라미터의 세부정보를 가져오는 함수입니다.
  const handleFetchParameterDetails = async (id) => {
    const details = await fetchParameterGroupDetails(id);
    setParameterDetails(details);
  };

  // 페이지 변경을 처리하는 함수입니다.
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // 개별 행 선택을 처리하는 함수입니다.
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // 모든 행 선택을 처리하는 함수입니다.
  const handleSelectAllRows = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setAllSelected(!allSelected);
  };

  // 선택된 행 삭제를 처리하는 함수입니다.
  const handleDelete = async () => {
    for (const id of selectedRows) {
      await deleteParameter(id);
    }
    setData((prevData) =>
      prevData.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  // 새로 추가된 행에 포커스를 설정하는 useEffect 훅입니다.
  // useEffect(() => {
  //   if (newRowRef.current !== null) {
  //     const newRowElement = document.getElementById(newRowRef.current);
  //     if (newRowElement) {
  //       newRowElement.focus();
  //     }
  //     newRowRef.current = null;
  //   }
  // }, [data]);

  // 페이지당 표시할 행의 수를 설정합니다.
  const rowsPerPage = 10;

  // 현재 페이지에 표시할 행들을 계산합니다.
  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      setOpenSnackbar(true);
    }
  };

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
        fetchParameterDetails={handleFetchParameterDetails} // 데이터 테이블에서 특정 파라미터의 세부 정보를 가져오는 함수 전달
      />
      {parameterDetails && (
        <div>
          <h3>Parameter Details</h3>
          <p>ID: {parameterDetails.id}</p>
          <p>Parameter ID: {parameterDetails.parameterID}</p>
          <p>Upper Group: {parameterDetails.upperGroup}</p>
          <p>Group: {parameterDetails.group}</p>
          <p>Input Type: {parameterDetails.inputType}</p>
          <p>Tier: {parameterDetails.tier}</p>
          <p>Value: {parameterDetails.value}</p>
          <p>Version: {parameterDetails.version}</p>
          <p>Unit: {parameterDetails.unit}</p>
          <p>Fuel: {parameterDetails.fuel}</p>
          <p>Activity: {parameterDetails.activity}</p>
          <p>Industry: {parameterDetails.industry}</p>
        </div>
      )}
      <PaginationControls
        page={page}
        count={Math.ceil(data.length / rowsPerPage)}
        handleChangePage={handleChangePage}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
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
