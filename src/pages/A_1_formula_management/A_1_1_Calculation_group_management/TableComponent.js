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

function TableComponent({
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
}) {
  // "전체 선택" 체크박스가 클릭될 때 호출되는 함수
  const handleSelectAllClick = (event) => {
    // event.target.checked는 체크박스가 체크되었는지 여부를 나타냅니다.
    if (event.target.checked) {
      // 체크박스가 체크된 경우: 모든 항목을 선택합니다.
      // rows 배열의 각 요소의 id를 추출하여 새로운 배열(newSelecteds)을 만듭니다.
      const newSelecteds = rows.map((n) => n.id);
      // 선택된 항목의 상태를 newSelecteds로 설정합니다.
      setSelected(newSelecteds);
      return;
    }
    // 체크박스가 체크 해제된 경우: 선택된 항목을 비웁니다.
    setSelected([]);
  };

  // 항목이 클릭될 때 호출되는 함수
  const handleClick = (event, id) => {
    // 선택된 항목 배열(selected)에서 현재 항목의 id가 있는지 찾습니다.
    const selectedIndex = selected.indexOf(id);
    // 새로운 선택된 항목 배열을 초기화합니다.
    let newSelected = [];

    // 현재 항목의 id가 선택된 항목 배열에 없는 경우 (선택되지 않은 상태)
    if (selectedIndex === -1) {
      // 선택된 항목 배열에 현재 항목의 id를 추가합니다.
      newSelected = newSelected.concat(selected, id);
    }
    // 현재 항목의 id가 선택된 항목 배열의 첫 번째 항목인 경우
    else if (selectedIndex === 0) {
      // 첫 번째 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(selected.slice(1));
    }
    // 현재 항목의 id가 선택된 항목 배열의 마지막 항목인 경우
    else if (selectedIndex === selected.length - 1) {
      // 마지막 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(selected.slice(0, -1));
    }
    // 현재 항목의 id가 선택된 항목 배열의 중간에 있는 경우
    else if (selectedIndex > 0) {
      // 현재 항목을 제외한 나머지 항목들로 새로운 배열을 만듭니다.
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex), // 현재 항목 전의 항목들
        selected.slice(selectedIndex + 1) // 현재 항목 후의 항목들
      );
    }

    // 선택된 항목의 상태를 새로운 배열로 업데이트합니다.
    setSelected(newSelected);
  };

  // 페이지 변경 시 호출되는 함수
  const handleChangePage = (event, newPage) => {
    // 새로운 페이지 번호를 상태로 설정합니다.
    setPage(newPage);
  };

  // 페이지당 표시할 행 수 변경 시 호출되는 함수
  const handleChangeRowsPerPage = (event) => {
    // 선택된 페이지당 행 수를 정수로 변환하여 상태로 설정합니다.
    setRowsPerPage(parseInt(event.target.value, 10));
    // 페이지를 첫 페이지로 초기화합니다.
    setPage(0);
  };

  // 행을 편집할 때 호출되는 함수
  const handleEdit = (index) => {
    // 편집할 행의 인덱스를 상태로 설정합니다.
    setEditIndex(index);
    // 편집할 행의 groupName을 상태로 설정합니다.
    setEditGroupName(rows[index].name);
    // 편집할 행의 note를 상태로 설정합니다.
    setEditNote(rows[index].note);
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
              <TableCell>산정식 ID</TableCell>
              <TableCell>산정식그룹명</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={selected.indexOf(row.id) !== -1}
                  tabIndex={-1}
                  key={row.id}
                  selected={selected.indexOf(row.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(row.id) !== -1}
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>{rows.length - index}</TableCell>
                  <TableCell>{row.groupId}</TableCell>
                  <TableCell
                    onDoubleClick={() => handleEdit(page * rowsPerPage + index)}
                  >
                    {editIndex === page * rowsPerPage + index ? (
                      <TextField
                        value={editGroupName || ""}
                        onChange={(e) => setEditGroupName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.key === "Enter" && handleSave()}
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
                        onClick={() => handleEdit(page * rowsPerPage + index)}
                      >
                        {row.name}
                      </span>
                    )}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() => handleEdit(page * rowsPerPage + index)}
                  >
                    {editIndex === page * rowsPerPage + index ? (
                      <TextField
                        value={editNote || ""}
                        onChange={(e) => setEditNote(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.key === "Enter" && handleSave()}
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
                        onClick={() => handleEdit(page * rowsPerPage + index)}
                      >
                        {row.note}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]} //표시할 페이지당 행 수
        component="div" //  "div"로 지정하여 페이지네이션 컨트롤을 감싸는 요소
        count={rows.length} // 테이블의 총 행 수/ 페이지네이션의 총 페이지 수를 계산하는 데 사용
        rowsPerPage={rowsPerPage} // 현재 페이지당 표시할 행 수, 상위 컴포넌트에서 상태로 관리
        page={page} // 현재 페이지 번호, 0부터 시작하며, 상위 컴포넌트에서 상태로 관리
        onPageChange={handleChangePage} // 페이지 변경 시 호출되는 함수 / (event, newPage) 인자를 받으며, 새로운 페이지 번호를 처리
        onRowsPerPageChange={handleChangeRowsPerPage} // 페이지당 표시할 행 수 변경 시 호출되는 함수, (event) 인자를 받으며, 선택된 행 수를 처리
      />
    </Paper>
  );
}

export default TableComponent;
