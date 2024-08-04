import React from "react";
import { Checkbox, TableCell } from "@mui/material";

const CheckboxColumn = ({ isItemSelected, handleCheckboxClick, row }) => {
  return (
    <TableCell>
      <Checkbox
        checked={isItemSelected}
        onChange={(event) => handleCheckboxClick(event, row.no)}
      />
    </TableCell>
  );
};

export default CheckboxColumn;
