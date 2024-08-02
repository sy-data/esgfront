import React from "react";
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const DataTable = ({ data, selectedRows, setSelectedRows }) => {
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.no);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleCheckboxClick = (event, no) => {
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const handleActivityChange = (event, no) => {
    const newData = data.map((row) =>
      row.no === no ? { ...row, activity: event.target.value } : row
    );
    setSelectedRows(newData);
  };

  const isSelected = (no) => selectedRows.indexOf(no) !== -1;

  const TableCellnStyles = {
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%" /* 19.5px */,
    letterSpacing: "-0.26px",
  };

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < data.length
                }
                checked={data.length > 0 && selectedRows.length === data.length}
                onChange={handleSelectAllClick}
              />
              No
            </TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>배출활동</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>배출시설규모</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>규정산정등급</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>사용량등급</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>순발열량등급</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>배출계수등급</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>산정계수등급</TableCell>
            <TableCell sx={{ ...TableCellnStyles }}>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const isItemSelected = isSelected(row.no);
            return (
              <TableRow key={row.no} selected={isItemSelected}>
                <TableCell>
                  <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleCheckboxClick(event, row.no)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={row.activity}
                    sx={{ width: 200 }}
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">{row.emissionFacility}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">{row.regulatoryGrade}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">{row.usageGrade}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">{row.netEmissionGrade}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">{row.emissionCalcGrade}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select defaultValue="">
                      <MenuItem value="">
                        {row.calculationCoefficienGrade}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{row.calcDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
