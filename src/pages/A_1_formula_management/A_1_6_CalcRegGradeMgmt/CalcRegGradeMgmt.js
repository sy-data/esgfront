import React from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";

const CalcRegGradeMgmt = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <SearchBar />
        <DataTable />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
            추가
          </Button>
          <Button variant="contained" color="secondary">
            삭제
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CalcRegGradeMgmt;
