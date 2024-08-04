import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const TableRowData = ({
  row,
  index,
  page,
  rowsPerPage,
  selectedRows,
  handleSelectRow,
  handleKeyDown,
  parameterData,
}) => {
  return (
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
        {parameterData[row.id] ? parameterData[row.id] : row.parameterID}
      </TableCell>
      <TableCell>
        <TextField
          id={`upperGroup-${row.id}`}
          variant="outlined"
          size="small"
          defaultValue={row.upperGroup}
          onKeyDown={handleKeyDown}
          sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
          InputProps={{ sx: { width: "150px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          size="small"
          defaultValue={row.group}
          onKeyDown={handleKeyDown}
          sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
          InputProps={{ sx: { width: "250px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          size="small"
          defaultValue={row.inputType}
          onKeyDown={handleKeyDown}
          sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
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
              padding: "2.6px 10px",
              alignItems: "center",
              gap: "10px",
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
          sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
          InputProps={{ sx: { width: "70px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          size="small"
          defaultValue={row.version}
          onKeyDown={handleKeyDown}
          sx={{ "& .MuiInputBase-input": { padding: "10px 14px" } }}
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
              padding: "2.6px",
              alignItems: "center",
              gap: "10px",
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
              padding: "2.6px",
              alignItems: "center",
              gap: "10px",
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
              padding: "2.6px",
              alignItems: "center",
              gap: "10px",
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
              padding: "2.6px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MenuItem value="에너지산업">에너지산업</MenuItem>
            <MenuItem value="Industry 1">Industry 1</MenuItem>
            <MenuItem value="Industry 2">Industry 2</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default TableRowData;
