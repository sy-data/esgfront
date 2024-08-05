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
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [focusRowNo, setFocusRowNo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filters, setFilters] = useState(null);

  const handleAddRow = useCallback(() => {
    const newRow = {
      no: data.length + 1,
      activity: "",
      emissionFacility: "",
      regulatoryGrade: "",
      usageGrade: "",
      netEmissionGrade: "",
      emissionCalcGrade: "",
      calculationCoefficienGrade: "",
      calcDate: "",
    };
    const newData = [newRow, ...data];
    setData(newData);
    setFilteredData(newData);
    setFilters(null); // 검색 조건 초기화
    setFocusRowNo(newRow.no);
  }, [data]);

  const handleDelete = useCallback(() => {
    const newData = data.filter((row) => !selectedRows.includes(row.no));
    setData(newData);
    setFilteredData(newData);
    setSelectedRows([]);
  }, [data, selectedRows]);

  const handleSearch = useCallback((filters) => {
    setFilters(filters);
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
    setFilteredData(filteredData);
  }, []);

  const handleSave = useCallback(() => {
    setOpenSnackbar(true);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <Container sx={containerStyles}>
      <SearchBar
        onSearch={handleSearch}
        onClear={() => setFilteredData(initialData)}
      />{" "}
      {/* 검색 조건 초기화 */}
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
