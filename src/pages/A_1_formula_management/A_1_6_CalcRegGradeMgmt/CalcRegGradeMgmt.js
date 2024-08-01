import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";

const CalcRegGradeMgmt = () => {
  return (
    <Container
      sx={{
        border: "3px bold #F7F8F8",
        backgroundColor: "#F7F8F8",
        minWidth: "1500px",
      }}
    >
      <SearchBar />
      <Box sx={{ my: 2, backgroundColor: "#FFF" }}>
        <Box>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography variant="h6" gutterBottom sx={{ flexGrow: 1 }}>
                산정식규정등급 목록
              </Typography>
              <Box>
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                  추가
                </Button>
                <Button variant="contained" color="secondary">
                  삭제
                </Button>
              </Box>
            </Box>
          </Box>
          <DataTable />
        </Box>
      </Box>
    </Container>
  );
};

export default CalcRegGradeMgmt;
