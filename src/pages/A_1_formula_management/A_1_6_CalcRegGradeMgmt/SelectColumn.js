import React from "react";
import { FormControl, MenuItem, Select, TableCell } from "@mui/material";

const SelectColumn = ({ row, handleSelectChange, field, options }) => {
  return (
    <TableCell>
      <FormControl fullWidth size="small">
        <Select
          value={row[field]}
          onChange={(event) => handleSelectChange(event, row.no, field)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TableCell>
  );
};

export default SelectColumn;
