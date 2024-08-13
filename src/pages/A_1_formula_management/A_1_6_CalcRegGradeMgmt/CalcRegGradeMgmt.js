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
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [focusRowNo, setFocusRowNo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchData();
      setData(response);
      setFilteredData(response);
    };
    loadData();
  }, []);

  const handleAddRow = useCallback(async () => {
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
    const response = await addData(newRow);
    const updatedData = [response, ...data];
    setData(updatedData);
    setFilteredData(updatedData);
    setFocusRowNo(response.no);
  }, [data]);

  const handleDelete = useCallback(async () => {
    await Promise.all(selectedRows.map((rowId) => deleteData(rowId)));
    const updatedData = data.filter((row) => !selectedRows.includes(row.no));
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  }, [data, selectedRows]);

  const handleSearch = useCallback((filters) => {
    setFilters(filters);
    const filtered = initialData.filter((row) => {
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
    setFilteredData(filtered);
  }, []);

  const handleSave = useCallback(async () => {
    await Promise.all(data.map((row) => updateData(row.no, row)));
    setOpenSnackbar(true);
  }, [data]);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  return (
    <Container sx={containerStyles}>
      <SearchBar
        onSearch={handleSearch}
        onClear={() => setFilteredData(data)}
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
