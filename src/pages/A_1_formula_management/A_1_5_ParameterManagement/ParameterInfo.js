import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TableContainer,
  Paper,
  Pagination,
} from "@mui/material";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import { exampleData } from "./exampleData";

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
  };

  const rowsPerPage = 10;
  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 2000, padding: "0 10px" }}>
      <Box display="flex" justifyContent="space-between" my={2}>
        <FilterControls
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
        />
        <Box display="flex" justifyContent="space-between" my={2}>
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            추가
          </Button>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              disabled={selectedRows.length === 0}
              onClick={handleDelete}
              sx={{
                backgroundColor: selectedRows.length === 0 ? "gray" : "white",
                color: selectedRows.length === 0 ? "white" : "black",
              }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 900,
          overflowX: "auto",
          maxWidth: 1200,
        }}
      >
        <DataTable
          data={displayedRows}
          setData={setData} // Add this line to pass setData to DataTable
          selectedRows={selectedRows}
          allSelected={allSelected}
          handleSelectRow={handleSelectRow}
          handleSelectAllRows={handleSelectAllRows}
        />
      </TableContainer>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default ParameterInfo;
