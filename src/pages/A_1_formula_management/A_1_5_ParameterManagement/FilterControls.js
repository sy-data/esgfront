import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  formControlStyles,
  selectStyles,
  searchButtonStyles,
  addButtonStyles,
  deleteButtonStyles,
} from "./FilterControlsStyles";

const FilterControls = ({
  filters,
  handleFilterChange,
  handleSearch,
  handleAddRow,
  handleDelete,
  selectedRows,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" my={2}>
      <FormControl variant="outlined" sx={formControlStyles}>
        <InputLabel>에너지 산업</InputLabel>
        <Select
          name="energyIndustry"
          value={filters.energyIndustry}
          onChange={handleFilterChange}
          label="에너지 산업"
          sx={selectStyles}
        >
          <MenuItem value="">
            <em>없음</em>
          </MenuItem>
          <MenuItem value="industry1">에너지 산업 1</MenuItem>
          <MenuItem value="industry2">에너지 산업 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={formControlStyles}>
        <InputLabel>배출활동</InputLabel>
        <Select
          name="activity"
          value={filters.activity}
          onChange={handleFilterChange}
          label="배출활동"
          sx={selectStyles}
        >
          <MenuItem value="">
            <em>없음</em>
          </MenuItem>
          <MenuItem value="activity1">배출활동 1</MenuItem>
          <MenuItem value="activity2">배출활동 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={formControlStyles}>
        <InputLabel>연료</InputLabel>
        <Select
          name="fuel"
          value={filters.fuel}
          onChange={handleFilterChange}
          label="연료"
          sx={selectStyles}
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
        disabled={!filters.energyIndustry && !filters.activity && !filters.fuel}
        sx={searchButtonStyles(filters)}
      >
        검색
      </Button>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          sx={addButtonStyles}
        >
          추가
        </Button>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            disabled={selectedRows.length === 0}
            onClick={handleDelete}
            sx={deleteButtonStyles(selectedRows)}
          >
            삭제
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterControls;
