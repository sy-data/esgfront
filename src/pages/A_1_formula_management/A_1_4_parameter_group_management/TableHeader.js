import React from "react";
import { TableCell, TableHead, TableRow, Checkbox, Box } from "@mui/material";

const TableHeader = ({ numSelected, rowCount, onSelectAllClick }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Box display="flex" alignItems="center">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          No
        </Box>
      </TableCell>
      <TableCell sx={{ paddingLeft: 10, paddingRight: -10 }}>그룹ID</TableCell>
      <TableCell>그룹명</TableCell>
      <TableCell>비고</TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
