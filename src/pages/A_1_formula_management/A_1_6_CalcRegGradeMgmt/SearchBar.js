import React from "react";
import { Box, Button, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField label="배출활동" variant="outlined" size="small" />
      <TextField
        label="시작일"
        variant="outlined"
        size="small"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="종료일"
        variant="outlined"
        size="small"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained">검색</Button>
    </Box>
  );
};

export default SearchBar;
