import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FilterControls = ({ filters, handleFilterChange, handleSearch }) => (
  <>
    <FormControl variant="outlined" sx={{ minWidth: 150, marginRight: -70 }}>
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
    <FormControl variant="outlined" sx={{ minWidth: 150, marginRight: -70 }}>
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
    <FormControl variant="outlined" sx={{ minWidth: 150, marginRight: -70 }}>
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
      disabled={!filters.energyIndustry && !filters.activity && !filters.fuel}
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
  </>
);

export default FilterControls;
