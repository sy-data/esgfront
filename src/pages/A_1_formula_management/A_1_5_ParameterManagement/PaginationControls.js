import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

const PaginationControls = ({ page, count, handleChangePage }) => {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "transparent",
                color: "var(--Primary-Primary, #00CD9B)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "150%", // 19.5px
                letterSpacing: "-0.26px",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default PaginationControls;
