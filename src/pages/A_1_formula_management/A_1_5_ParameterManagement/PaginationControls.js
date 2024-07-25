import React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationControls = ({ page, handleChangePage }) => {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Pagination count={5} page={page} onChange={handleChangePage} />
    </Box>
  );
};

export default PaginationControls;
