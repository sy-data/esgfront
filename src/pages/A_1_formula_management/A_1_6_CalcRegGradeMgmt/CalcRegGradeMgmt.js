import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";
import { data as initialData } from "./data";

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
      calcDate: "",
    };
    setData([...data, newRow]);
  };

  const handleDelete = () => {
    const newData = data.filter((row) => !selectedRows.includes(row.no));
    setData(newData);
    setSelectedRows([]);
  };

  return (
    <Container
      sx={{
        border: "10px bold #F7F8F8",
        backgroundColor: "#F7F8F8",
        minWidth: "1500px",
      }}
    >
      <SearchBar />
      <Box sx={{ my: 2, backgroundColor: "#FFF", borderRadius: 6 }}>
        <Box>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  flexGrow: 1,
                  color: "#000",
                  fontFamily: "Pretendard Variable",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "150%" /* 27px */,
                  letterSpacing: "-0.36px",
                  marginTop: 1,
                  marginLeft: 3,
                }}
              >
                산정식규정등급 목록
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: "100px",
                    display: "flex",
                    height: "40px",
                    padding: "10px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "8px",
                    background: "var(--Primary-Primary, #00CD9B)",
                    color: "var(--Gray-fff, #FFF)",
                    textAlign: "center",
                    fontFamily: "Pretendard Variable",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "150%" /* 21px */,
                    letterSpacing: "-0.28px",
                    marginTop: 2,
                  }}
                  onClick={handleAddRow}
                >
                  추가
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={selectedRows.length === 0}
                  sx={{
                    marginTop: 2,
                    minWidth: "100px",
                    marginRight: "25px",
                    display: "flex",
                    height: 40,
                    padding: "10px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    color:
                      selectedRows.length > 0
                        ? "var(--Gray-fff, #FFF)"
                        : "var(--Gray-ccc, #CCC)",
                    border:
                      selectedRows.length > 0
                        ? "1px solid var(--Primary-Primary, #00CD9B)"
                        : "1px solid var(--Gray-eee, #EEE)",
                    background:
                      selectedRows.length > 0
                        ? "var(--Primary-Primary, #00CD9B)"
                        : "var(--Gray-fff, #FFF)",
                    textAlign: "center",
                    fontFamily: "Pretendard Variable",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "150%" /* 21px */,
                    letterSpacing: "-0.28px",
                  }}
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </Box>
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
