import React from "react";
import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";

const TableRowComponent = ({
  row,
  isSelected,
  handleClick,
  handleGroupNameChange,
  handleNoteChange,
  handleBlur,
  handleKeyDown,
  editingRowId,
  groupNameInputRef,
}) => {
  return (
    <TableRow
      key={row.id}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
      onClick={(event) => handleClick(event, row.id)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onClick={(event) => handleClick(event, row.id)}
        />
        {row.id}
      </TableCell>
      <TableCell sx={{ paddingLeft: 10, paddingRight: -10 }}>
        {row.groupId}
      </TableCell>
      <TableCell>
        <TextField
          className="edit-field"
          fullWidth
          variant="outlined"
          value={row.groupName}
          onChange={(e) => handleGroupNameChange(row.id, e.target.value)}
          onBlur={() => handleBlur(row.id)}
          onKeyDown={(e) => handleKeyDown(e, row.id)}
          size="small"
          inputRef={editingRowId === row.id ? groupNameInputRef : null}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="edit-field"
          fullWidth
          variant="outlined"
          value={row.note}
          onChange={(e) => handleNoteChange(row.id, e.target.value)}
          onBlur={() => handleBlur(row.id)}
          onKeyDown={(e) => handleKeyDown(e, row.id)}
          size="small"
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
