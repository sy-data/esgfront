import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Pagination,
} from "@mui/material";
import { exampleData } from "./exampleData";

const ParameterInfo = () => {
  const [data, setData] = useState(exampleData);
  const [filters, setFilters] = useState({
    energyIndustry: "",
    activity: "",
    fuel: "",
  });
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("필터로 검색하기", filters);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAllRows = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setAllSelected(!allSelected);
  };

  const handleDelete = () => {
    setData((prevData) =>
      prevData.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1600, padding: "0 10px" }}>
      <Box display="flex" justifyContent="space-between" my={2}>
        <FormControl
          variant="outlined"
          sx={{ minWidth: 150, marginRight: -70 }}
        >
          <InputLabel>에너지 산업</InputLabel>
          <Select
            name="energyIndustry"
            value={filters.energyIndustry}
            onChange={handleFilterChange}
            label="에너지 산업"
          >
            <MenuItem value="">
              <em>없음</em>
            </MenuItem>
            <MenuItem value="industry1">에너지 산업 1</MenuItem>
            <MenuItem value="industry2">에너지 산업 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          sx={{ minWidth: 150, marginRight: -70 }}
        >
          <InputLabel>배출활동</InputLabel>
          <Select
            name="activity"
            value={filters.activity}
            onChange={handleFilterChange}
            label="배출활동"
          >
            <MenuItem value="">
              <em>없음</em>
            </MenuItem>
            <MenuItem value="activity1">배출활동 1</MenuItem>
            <MenuItem value="activity2">배출활동 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          sx={{ minWidth: 150, marginRight: -70 }}
        >
          <InputLabel>연료</InputLabel>
          <Select
            name="fuel"
            value={filters.fuel}
            onChange={handleFilterChange}
            label="연료"
          >
            <MenuItem value="">
              <em>없음</em>
            </MenuItem>
            <MenuItem value="fuel1">연료 1</MenuItem>
            <MenuItem value="fuel2">연료 2</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={
            !filters.energyIndustry && !filters.activity && !filters.fuel
          }
          sx={{
            backgroundColor:
              filters.energyIndustry || filters.activity || filters.fuel
                ? "white"
                : "gray",
            color:
              filters.energyIndustry || filters.activity || filters.fuel
                ? "black"
                : "white",
          }}
        >
          검색
        </Button>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Button variant="contained" color="primary">
            추가
          </Button>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              disabled={selectedRows.length === 0}
              onClick={handleDelete}
              sx={{
                backgroundColor: selectedRows.length === 0 ? "gray" : "white",
                color: selectedRows.length === 0 ? "white" : "black",
              }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 900 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  size="small"
                  checked={allSelected}
                  onChange={handleSelectAllRows}
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>파라미터 ID</TableCell>
              <TableCell>상위그룹명</TableCell>
              <TableCell>그룹명</TableCell>
              <TableCell>입력구분</TableCell>
              <TableCell>Tier 구분</TableCell>
              <TableCell>파라미터 값</TableCell>
              <TableCell>파라미터값 버전</TableCell>
              <TableCell>단위</TableCell>
              <TableCell>연료</TableCell>
              <TableCell>배출활동</TableCell>
              <TableCell>산업군</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice((page - 1) * 10, page * 10).map((row, index) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.parameterID}</TableCell>
                <TableCell>{row.upperGroup}</TableCell>
                <TableCell>{row.group}</TableCell>
                <TableCell>{row.inputType}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select defaultValue={row.tier} size="small">
                      <MenuItem value="Tier 1">Tier 1</MenuItem>
                      <MenuItem value="Tier 2">Tier 2</MenuItem>
                      <MenuItem value="Tier 3">Tier 3</MenuItem>
                      <MenuItem value="Tier 4">Tier 4</MenuItem>
                      <MenuItem value="Tier 5">Tier 5</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={row.value}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={row.version}
                  />
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select defaultValue={row.unit} size="small">
                      <MenuItem value="TJ">TJ</MenuItem>
                      <MenuItem value="kJ">kJ</MenuItem>
                      <MenuItem value="ton-C / 1000 m3">
                        ton-C / 1000 m3
                      </MenuItem>
                      <MenuItem value="1000 m3">1000 m3</MenuItem>
                      <MenuItem value="TJ / t-NH3">TJ / t-NH3</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select defaultValue={row.fuel} size="small">
                      <MenuItem value="프로판">프로판</MenuItem>
                      <MenuItem value="Fuel 1">Fuel 1</MenuItem>
                      <MenuItem value="Fuel 2">Fuel 2</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select defaultValue={row.activity} size="small">
                      <MenuItem value="역세권 연소">역세권 연소</MenuItem>
                      <MenuItem value="Activity 1">Activity 1</MenuItem>
                      <MenuItem value="Activity 2">Activity 2</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small">
                    <Select defaultValue={row.industry} size="small">
                      <MenuItem value="에너지산업">에너지산업</MenuItem>
                      <MenuItem value="Industry 1">Industry 1</MenuItem>
                      <MenuItem value="Industry 2">Industry 2</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination count={5} page={page} onChange={handleChangePage} />
      </Box>
    </Container>
  );
};

export default ParameterInfo;
