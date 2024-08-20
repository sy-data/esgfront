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
    // "전체 선택" 체크박스가 클릭되었는지 여부를 확인
    if (event.target.checked) {
      // 체크박스가 체크된 경우
      // rows 배열의 각 요소의 id를 추출하여 새로운 배열 newSelecteds를 만듭니다.
      const newSelecteds = rows.map((n) => n.id);

      // 선택된 항목의 상태를 newSelecteds로 설정합니다.
      setSelected(newSelecteds);
    } else {
      // 체크박스가 체크 해제된 경우
      // 선택된 항목의 상태를 빈 배열로 설정하여 모든 선택을 해제합니다.
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    // 선택된 항목 배열에서 현재 항목의 id가 있는지 찾습니다.
    const selectedIndex = selected.indexOf(id);
    let newSelected = []; // 새로운 선택된 항목 배열을 초기화합니다.

    // 현재 항목의 id가 선택된 항목 배열에 없는 경우 (선택되지 않은 상태)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id); // 선택된 항목 배열에 현재 항목의 id를 추가
    } else if (selectedIndex === 0) {
      // 현재 항목의 id가 선택된 항목 배열의 첫 번째 항목인 경우
      newSelected = newSelected.concat(selected.slice(1)); // 첫 번째 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
    } else if (selectedIndex === selected.length - 1) {
      // 현재 항목의 id가 선택된 항목 배열의 마지막 항목인 경우
      newSelected = newSelected.concat(selected.slice(0, -1)); // 마지막 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
    } else if (selectedIndex > 0) {
      // 현재 항목의 id가 선택된 항목 배열의 중간에 있는 경우
      // 현재 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex), // 현재 항목 전의 항목들
        selected.slice(selectedIndex + 1) // 현재 항목 후의 항목들
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    // 새로운 페이지 번호를 상태로 설정합니다.
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // 선택된 페이지당 행 수를 정수로 변환하여 상태로 설정합니다.
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지를 첫 페이지로 초기화합니다.
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

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id || index}
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
                      <TableCell>{row.id}</TableCell>
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
