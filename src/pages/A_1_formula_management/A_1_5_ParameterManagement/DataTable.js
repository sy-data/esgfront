import React from "react";
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

const DataTable = ({
  data,
  selectedRows,
  allSelected,
  handleSelectAllRows,
  handleSelectRow,
}) => {
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
              />
            </TableCell>
            <TableCell>No</TableCell>
            <TableCell>파라미터 ID</TableCell>
            <TableCell>상위그룹명</TableCell>
            <TableCell>그룹명</TableCell>
            <TableCell>입력구분</TableCell>
            <TableCell>Tier 구분</TableCell>
            <TableCell>파라미터 값</TableCell>
            <TableCell>파라미터값 버전</TableCell>
            <TableCell>단위</TableCell>
            <TableCell>연료</TableCell>
            <TableCell>배출활동</TableCell>
            <TableCell>산업군</TableCell>
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
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.parameterID}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "95px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.upperGroup}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "150px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.group}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "250px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.inputType}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "150px" } }}
                />
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select defaultValue={row.tier} size="small">
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
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "60px" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={row.version}
                  sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
                  InputProps={{ sx: { width: "60px" } }}
                />
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select defaultValue={row.unit} size="small">
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
                  <Select defaultValue={row.fuel} size="small">
                    <MenuItem value="프로판">프로판</MenuItem>
                    <MenuItem value="Fuel 1">Fuel 1</MenuItem>
                    <MenuItem value="Fuel 2">Fuel 2</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select defaultValue={row.activity} size="small">
                    <MenuItem value="역세권 연소">역세권 연소</MenuItem>
                    <MenuItem value="Activity 1">Activity 1</MenuItem>
                    <MenuItem value="Activity 2">Activity 2</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select defaultValue={row.industry} size="small">
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
