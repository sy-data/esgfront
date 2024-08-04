import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
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

  const handleAddRow = () => {
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
    setData([...data, newRow]);
  };

  const handleDelete = () => {
    const newData = data.filter((row) => !selectedRows.includes(row.no));
    setData(newData);
    setSelectedRows([]);
  };

  const handleSearch = (filters) => {
    const filteredData = initialData.filter((row) => {
      return (
        (!filters.activity || row.activity === filters.activity) &&
        (!filters.startDate ||
          new Date(row.calcDate) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(row.calcDate) <= new Date(filters.endDate))
      );
    });
    setData(filteredData);
  };

  return (
    <Container sx={containerStyles}>
      <SearchBar onSearch={handleSearch} />
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
            data={data}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CalcRegGradeMgmt;
