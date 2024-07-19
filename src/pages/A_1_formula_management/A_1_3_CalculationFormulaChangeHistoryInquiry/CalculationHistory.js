import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CalculationHistory = ({ data }) => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        산정식 이력
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>산정식</TableCell>
              <TableCell>버전번호</TableCell>
              <TableCell>변경일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.6237 9.375C10.6237 9.20924 10.5579 9.05027 10.4407 8.93306C10.3235 8.81585 10.1645 8.75 9.99875 8.75C9.83299 8.75 9.67402 8.81585 9.55681 8.93306C9.4396 9.05027 9.37375 9.20924 9.37375 9.375V13.125C9.37375 13.2908 9.4396 13.4497 9.55681 13.5669C9.67402 13.6842 9.83299 13.75 9.99875 13.75C10.1645 13.75 10.3235 13.6842 10.4407 13.5669C10.5579 13.4497 10.6237 13.2908 10.6237 13.125V9.375ZM10.9362 6.875C10.9362 7.12347 10.8375 7.36177 10.6618 7.53747C10.4861 7.71317 10.2478 7.81187 9.99937 7.81187C9.7509 7.81187 9.5126 7.71317 9.3369 7.53747C9.16121 7.36177 9.0625 7.12347 9.0625 6.875C9.0625 6.62669 9.16114 6.38855 9.33672 6.21297C9.5123 6.03739 9.75044 5.93875 9.99875 5.93875C10.2471 5.93875 10.4852 6.03739 10.6608 6.21297C10.8364 6.38855 10.9362 6.62669 10.9362 6.875ZM10 1.25C7.67936 1.25 5.45376 2.17187 3.81282 3.81282C2.17187 5.45376 1.25 7.67936 1.25 10C1.25 12.3206 2.17187 14.5462 3.81282 16.1872C5.45376 17.8281 7.67936 18.75 10 18.75C12.3206 18.75 14.5462 17.8281 16.1872 16.1872C17.8281 14.5462 18.75 12.3206 18.75 10C18.75 7.67936 17.8281 5.45376 16.1872 3.81282C14.5462 2.17187 12.3206 1.25 10 1.25ZM2.5 10C2.5 9.01509 2.69399 8.03982 3.0709 7.12987C3.44781 6.21993 4.00026 5.39314 4.6967 4.6967C5.39314 4.00026 6.21993 3.44781 7.12987 3.0709C8.03982 2.69399 9.01509 2.5 10 2.5C10.9849 2.5 11.9602 2.69399 12.8701 3.0709C13.7801 3.44781 14.6069 4.00026 15.3033 4.6967C15.9997 5.39314 16.5522 6.21993 16.9291 7.12987C17.306 8.03982 17.5 9.01509 17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C8.01088 17.5 6.10322 16.7098 4.6967 15.3033C3.29018 13.8968 2.5 11.9891 2.5 10Z"
                        fill="#757575"
                      />
                    </svg>
                    <Typography sx={{ marginLeft: 1 }}>
                      조회된 정보가 없습니다.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.tier}</TableCell>
                  <TableCell>{row.calculation}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.change_date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CalculationHistory;
