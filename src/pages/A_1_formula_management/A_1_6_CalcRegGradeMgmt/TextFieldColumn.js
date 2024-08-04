import React from "react";
import { TextField, TableCell } from "@mui/material";

const TextFieldColumn = ({
  row,
  handleActivityChange,
  handleActivityBlur,
  handleActivityKeyPress,
  textFieldRef,
}) => {
  return (
    <TableCell>
      <TextField
        fullWidth
        size="small"
        value={row.activity}
        onChange={(event) => handleActivityChange(event, row.no)}
        onBlur={(event) => handleActivityBlur(event, row.no)}
        onKeyPress={(event) => handleActivityKeyPress(event, row.no)}
        sx={{ width: 200 }}
        inputRef={textFieldRef}
      />
    </TableCell>
  );
};

export default TextFieldColumn;
