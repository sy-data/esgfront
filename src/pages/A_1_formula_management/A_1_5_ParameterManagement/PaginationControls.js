import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

const PaginationControls = ({ page, count, handleChangePage }) => {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Pagination
        count={count} // 총 페이지 수를 설정합니다.
        page={page} // 현재 페이지 번호를 설정합니다.
        onChange={handleChangePage} // 페이지 변경 시 호출되는 핸들러를 설정합니다.
        renderItem={(item) => (
          <PaginationItem
            {...item} // 기본 아이템 속성을 전달합니다.
            sx={{
              "&.Mui-selected": {
                backgroundColor: "transparent", // 선택된 아이템의 배경색을 투명하게 설정합니다.
                color: "var(--Primary-Primary, #00CD9B)", // 선택된 아이템의 글자색을 설정합니다.
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "150%",
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
