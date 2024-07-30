import React from "react";
import { TableCell } from "@mui/material";

const TableHeader = () => {
  const headers = [
    "No",
    "파라미터 ID",
    "상위그룹명",
    "그룹명",
    "입력구분",
    "Tier 구분",
    "파라미터 값",
    "파라미터값 버전",
    "단위",
    "연료",
    "배출활동",
    "산업군",
  ];

  const cellStyle = {
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "150%", // 19.5px
    letterSpacing: "-0.26px",
    textAlign: "center",
  };

  return (
    <>
      {headers.map((header, index) => (
        <TableCell key={index} sx={cellStyle}>
          {header}
        </TableCell>
      ))}
    </>
  );
};

export default TableHeader;
