import React from "react";
import { TextField, TableCell } from "@mui/material";

const DateFieldColumn = ({ row, handleDateChange, handleDateKeyPress }) => {
  return (
    <TableCell>
      <TextField
        fullWidth
        size="small"
        type="date"
        value={row.calcDate}
        onChange={(event) => handleDateChange(event, row.no)}
        onKeyPress={(event) => handleDateKeyPress(event)}
        sx={{ width: 200 }}
      />
    </TableCell>
  );
};

export default DateFieldColumn;
