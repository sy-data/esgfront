import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { fetchParameterGroups, fetchParameterGroupDetails } from "./api";

const DataTable = ({
  data,
  selectedRows,
  allSelected,
  handleSelectAllRows,
  handleSelectRow,
  page,
  rowsPerPage,
  handleKeyDown,
}) => {
  const [parameterData, setParameterData] = useState({});

  useEffect(() => {
    const fetchParameterData = async () => {
      const userId = 1;
      const groups = await fetchParameterGroups(userId);
      if (groups.length > 0) {
        const groupDetails = await fetchParameterGroupDetails(groups[0].id);
        const parameterData = groupDetails.reduce((acc, item) => {
          acc[item.id] = item.parameter_id;
          return acc;
        }, {});
        setParameterData(parameterData);
      }
    };
    fetchParameterData();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 900, overflowX: "auto", maxWidth: 1200 }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                size="small"
                checked={allSelected}
                onChange={handleSelectAllRows}
                sx={{
                  display: "flex",
                  height: "50px",
                  // padding: "0 50px 0 268px",
                  // alignItems: "center",
                  // gap: "16px",
                  // flexShrink: 0,
                  borderBottom: "1px solid var(--Gray-e5e5e5, #E5E5E5)",
                  background: "var(--Gray-fff, #FFF)",
                }}
              />
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
              }}
            >
              No
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                whiteSpace: "nowrap",
              }}
            >
              파라미터 ID
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              상위그룹명
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              그룹명
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              입력구분
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              Tier 구분
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              파라미터 값
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              파라미터값 버전
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              단위
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              연료
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              배출활동
            </TableCell>
            <TableCell
              sx={{
                color: "var(--Gray-757575, #757575)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                textAlign: "center",
              }}
            >
              산업군
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  size="small"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </TableCell>
              <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
              <TableCell>
                {parameterData[row.id]
                  ? parameterData[row.id]
                  : row.parameterID}
                {/* <TextField
                  // id={`parameterID-${row.id}`}
                  variant="outlined"
                  size="small"
                  defaultValue={row.parameterID}
                  onKeyDown={handleKeyDown}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "95px" } }}
                /> */}
              </TableCell>
              <TableCell>
                <TextField
                  id={`upperGroup-${row.id}`} // 여기에 id 추가
                  variant="outlined"
                  size="small"
                  defaultValue={row.upperGroup}
                  onKeyDown={handleKeyDown}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "10px 16px",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                    },
                  }}
                  InputProps={{ sx: { width: "150px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.group}
                  onKeyDown={handleKeyDown}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "10px 16px",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                    },
                  }}
                  InputProps={{ sx: { width: "250px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.inputType}
                  onKeyDown={handleKeyDown}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "10px 16px",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                    },
                  }}
                  InputProps={{ sx: { width: "150px" } }}
                />
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    defaultValue={row.tier}
                    size="small"
                    sx={{
                      borderRadius: "5px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "2.6px 10px",
                      alignItems: "center",
                      gap: "10px",
                      // flex: "1 0 0",
                    }}
                  >
                    <MenuItem value="Tier 1">Tier 1</MenuItem>
                    <MenuItem value="Tier 2">Tier 2</MenuItem>
                    <MenuItem value="Tier 3">Tier 3</MenuItem>
                    <MenuItem value="Tier 4">Tier 4</MenuItem>
                    <MenuItem value="Tier 5">Tier 5</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.value}
                  onKeyDown={handleKeyDown}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "10px 16px",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                    },
                  }}
                  InputProps={{ sx: { width: "70px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.version}
                  onKeyDown={handleKeyDown}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "10px 16px",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 0 0",
                    },
                  }}
                  InputProps={{ sx: { width: "120px" } }}
                />
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    defaultValue={row.unit}
                    size="small"
                    sx={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "2.6px",
                      alignItems: "center",
                      gap: "10px",
                      // flex: "1 0 0",
                    }}
                  >
                    <MenuItem value="TJ">TJ</MenuItem>
                    <MenuItem value="kJ">kJ</MenuItem>
                    <MenuItem value="ton-C / 1000 m3">ton-C / 1000 m3</MenuItem>
                    <MenuItem value="1000 m3">1000 m3</MenuItem>
                    <MenuItem value="TJ / t-NH3">TJ / t-NH3</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    defaultValue={row.fuel}
                    size="small"
                    sx={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "2.6px",
                      alignItems: "center",
                      gap: "10px",
                      // flex: "1 0 0",
                    }}
                  >
                    <MenuItem value="프로판">프로판</MenuItem>
                    <MenuItem value="Fuel 1">Fuel 1</MenuItem>
                    <MenuItem value="Fuel 2">Fuel 2</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    defaultValue={row.activity}
                    size="small"
                    sx={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "2.6px",
                      alignItems: "center",
                      gap: "10px",
                      // flex: "1 0 0",
                    }}
                  >
                    <MenuItem value="역세권 연소">역세권 연소</MenuItem>
                    <MenuItem value="Activity 1">Activity 1</MenuItem>
                    <MenuItem value="Activity 2">Activity 2</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    defaultValue={row.industry}
                    size="small"
                    sx={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--Gray-eee, #EEE)",
                      background: "var(--Gray-fff, #FFF)",
                      display: "flex",
                      padding: "2.6px",
                      alignItems: "center",
                      gap: "10px",
                      // flex: "1 0 0",
                    }}
                  >
                    <MenuItem value="에너지산업">에너지산업</MenuItem>
                    <MenuItem value="Industry 1">Industry 1</MenuItem>
                    <MenuItem value="Industry 2">Industry 2</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
