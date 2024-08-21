import React from "react";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

const TableComponent = ({
  rows,
  setRows,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  selected,
  setSelected,
  setEditIndex,
  setEditGroupName,
  setEditNote,
  editIndex,
  editGroupName,
  editNote,
  handleSave,
}) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    // 새로운 페이지 번호를 상태로 설정합니다.
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (index) => {
    setEditIndex(index); // 편집할 행의 인덱스를 상태로 설정합니다.
    setEditGroupName(rows[index].name); // 편집할 행의 그룹 이름을 상태로 설정합니다.
    setEditNote(rows[index].note); // 편집할 행의 메모를 상태로 설정합니다.
  };

  return (
    <Paper sx={{ mb: 2, border: "2px solid #ccc" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all rows" }}
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>산정식 그룹ID</TableCell>
              <TableCell>산정식그룹명</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const reverseIndex =
                    rows.length - (page * rowsPerPage + index);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{reverseIndex}</TableCell>
                      <TableCell>{row.groupId}</TableCell>
                      <TableCell
                        onDoubleClick={() =>
                          handleEdit(page * rowsPerPage + index)
                        }
                      >
                        {editIndex === page * rowsPerPage + index ? (
                          <TextField
                            value={editGroupName || ""}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSave()
                            }
                            autoFocus
                            fullWidth
                            sx={{
                              width: "50%",
                              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  width: 200,
                                  height: "0.5rem",
                                },
                            }}
                          />
                        ) : (
                          <span
                            onClick={() =>
                              handleEdit(page * rowsPerPage + index)
                            }
                          >
                            {row.name}
                          </span>
                        )}
                      </TableCell>
                      <TableCell
                        onDoubleClick={() =>
                          handleEdit(page * rowsPerPage + index)
                        }
                      >
                        {editIndex === page * rowsPerPage + index ? (
                          <TextField
                            value={editNote || ""}
                            onChange={(e) => setEditNote(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSave()
                            }
                            // autoFocus
                            fullWidth
                            sx={{
                              width: "50%",
                              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  width: 200,
                                  height: "0.5rem",
                                },
                            }}
                          />
                        ) : (
                          <span
                            onClick={() =>
                              handleEdit(page * rowsPerPage + index)
                            }
                          >
                            {row.note}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  조회된 정보가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
