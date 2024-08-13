import React, { useCallback } from "react";
import { TextField, TableCell } from "@mui/material";

const textFieldStyles = { width: 200 };

const DateFieldColumn = ({ row, handleDateChange, handleDateKeyPress }) => {
  const onChange = useCallback(
    (event) => handleDateChange(event, row.no),
    [handleDateChange, row.no]
  );

  const onKeyPress = useCallback(
    (event) => handleDateKeyPress(event),
    [handleDateKeyPress]
  );

  return (
    <TableCell>
      <TextField
        fullWidth
        size="small"
        type="date"
        value={row.calcDate}
        onChange={onChange}
        onKeyPress={onKeyPress}
        sx={textFieldStyles}
      />
    </TableCell>
  );
};

export default React.memo(DateFieldColumn);
