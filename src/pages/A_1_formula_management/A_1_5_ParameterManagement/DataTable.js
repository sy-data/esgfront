import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const DataTable = ({
  data,
  setData, // Add setData to the props
  selectedRows,
  allSelected,
  handleSelectRow,
  handleSelectAllRows,
}) => {
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  return (
    <Table stickyHeader size="small" sx={{ minWidth: 1200 }}>
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
                name="parameterID"
                value={row.parameterID}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 10,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                name="upperGroup"
                value={row.upperGroup}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 15,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                name="group"
                value={row.group}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 15,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                name="inputType"
                value={row.inputType}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 15,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <FormControl variant="outlined" size="small">
                <Select
                  name="tier"
                  value={row.tier}
                  onChange={(e) => handleInputChange(e, row.id)}
                  size="small"
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
                name="value"
                value={row.value}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 6,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                name="version"
                value={row.version}
                onChange={(e) => handleInputChange(e, row.id)}
                sx={{
                  "& .MuiInputBase-input": {
                    marginRight: 10,
                  },
                }}
              />
            </TableCell>
            <TableCell>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ marginRight: 3 }}
              >
                <Select
                  name="unit"
                  value={row.unit}
                  onChange={(e) => handleInputChange(e, row.id)}
                  size="small"
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
                  name="fuel"
                  value={row.fuel}
                  onChange={(e) => handleInputChange(e, row.id)}
                  size="small"
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
                  name="activity"
                  value={row.activity}
                  onChange={(e) => handleInputChange(e, row.id)}
                  size="small"
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
                  name="industry"
                  value={row.industry}
                  onChange={(e) => handleInputChange(e, row.id)}
                  size="small"
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
  );
};

export default DataTable;
