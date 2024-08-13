import React, { useCallback } from "react";
import { FormControl, MenuItem, Select, TableCell } from "@mui/material";

const SelectColumn = ({ row, handleSelectChange, field, options }) => {
  const onChange = useCallback(
    (event) => {
      handleSelectChange(event, row.no, field);
    },
    [handleSelectChange, row.no, field]
  );

  return (
    <TableCell>
      <FormControl fullWidth size="small">
        <Select value={row[field]} onChange={onChange}>
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

export default React.memo(SelectColumn);
