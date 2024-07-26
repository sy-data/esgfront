import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const FilterControls = ({
  filters,
  handleFilterChange,
  handleSearch,
  handleAddRow,
  handleDelete,
  selectedRows,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" my={2} sx={{}}>
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 200,
          marginRight: -25,
          borderRadius: "8px",
          border: "1px solid var(--Gray-eee, #EEE)",
          background: "var(--Gray-fff, #FFF)",
          height: "50px",
        }}
      >
        <InputLabel>에너지 산업</InputLabel>
        <Select
          name="energyIndustry"
          value={filters.energyIndustry}
          onChange={handleFilterChange}
          label="에너지 산업"
          sx={{
            borderRadius: "8px",
            border: "1px solid var(--Gray-eee, #EEE)",
            background: "var(--Gray-fff, #FFF)",
            height: "50px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
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
        sx={{
          minWidth: 200,
          marginRight: -25,
          borderRadius: "8px",
          border: "1px solid var(--Gray-eee, #EEE)",
          background: "var(--Gray-fff, #FFF)",
          height: "50px",
        }}
      >
        <InputLabel>배출활동</InputLabel>
        <Select
          name="activity"
          value={filters.activity}
          onChange={handleFilterChange}
          label="배출활동"
          sx={{
            borderRadius: "8px",
            border: "1px solid var(--Gray-eee, #EEE)",
            background: "var(--Gray-fff, #FFF)",
            height: "50px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
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
        sx={{
          minWidth: 200,
          marginRight: -25,
          borderRadius: "8px",
          border: "1px solid var(--Gray-eee, #EEE)",
          background: "var(--Gray-fff, #FFF)",
          height: "50px",
        }}
      >
        <InputLabel>연료</InputLabel>
        <Select
          name="fuel"
          value={filters.fuel}
          onChange={handleFilterChange}
          label="연료"
          sx={{
            borderRadius: "8px",
            border: "1px solid var(--Gray-eee, #EEE)",
            background: "var(--Gray-fff, #FFF)",
            height: "50px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
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
          display: "flex",
          width: "100px",
          height: "50.5px",
          padding: "10px 16px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "8px",
          background: "var(--Gray-eaeaea, #EAEAEA)",
          color: "var(--Gray-ccc, #CCC)",
          textAlign: "center",
          fontFamily: "Pretendard Variable",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "150%" /* 21px */,
          letterSpacing: "-0.28px",

          backgroundColor:
            filters.energyIndustry || filters.activity || filters.fuel
              ? "#00CD9B"
              : "gray",
          color:
            filters.energyIndustry || filters.activity || filters.fuel
              ? "black"
              : "white",
        }}
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
          sx={{
            mt: -12,
            borderRadius: 3,
            background: "var(--Primary-Primary, #00CD9B);",
            display: "flex",
            height: 40,
            width: 121,
            marginRight: 2,
            padding: "10px 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flex: "1 0 0",
            color: "var(--Gray-fff, #FFF)",
            textAlign: "center",
            fontFamily: "Pretendard Variable",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%", // 21px
            letterSpacing: "-0.28px",
          }}
        >
          추가
        </Button>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            disabled={selectedRows.length === 0}
            onClick={handleDelete}
            sx={{
              backgroundColor: selectedRows.length === 0 ? "gray" : "white",
              color: selectedRows.length === 0 ? "white" : "black",
              mt: -12,
              borderRadius: 3,
              display: "flex",
              height: 40,
              width: 121,
              marginRight: 2,
              padding: "10px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flex: "1 0 0",
              color: "black",
              textAlign: "center",
              fontFamily: "Pretendard Variable",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%", // 21px
              letterSpacing: "-0.28px",
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterControls;
