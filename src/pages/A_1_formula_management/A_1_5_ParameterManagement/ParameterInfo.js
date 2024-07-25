import React, { useState, useRef, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import { exampleData } from "./exampleData";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import PaginationControls from "./PaginationControls";

const ParameterInfo = () => {
  const [data, setData] = useState(exampleData);
  const [filters, setFilters] = useState({
    energyIndustry: "",
    activity: "",
    fuel: "",
  });
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const newRowRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("필터로 검색하기", filters);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAllRows = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setAllSelected(!allSelected);
  };

  const handleDelete = () => {
    setData((prevData) =>
      prevData.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

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
    newRowRef.current = newId;
  };

  useEffect(() => {
    if (newRowRef.current !== null) {
      document.getElementById(`parameterID-${newRowRef.current}`).focus();
      newRowRef.current = null;
    }
  }, [data]);

  const rowsPerPage = 10;
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
