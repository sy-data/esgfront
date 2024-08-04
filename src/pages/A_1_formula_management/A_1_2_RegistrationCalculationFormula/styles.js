import { styled } from "@mui/material/styles";
import {Button, Checkbox} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import React from "react";

export const ExpandMoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 16.5002L4.5 9.00019L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.00019L12 16.5002Z"
      fill="#111111"
    />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
      fill="#757575"
    />
  </svg>
);

// 스타일이 적용된 메뉴 제목 컨테이너 정의
export const StyledMenuTitleContainer = styled("div")({
  color: "#000",
  fontFamily: "Pretendard Variable",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "-0.36px",
});

// 버튼 컨테이너 스타일 정의
export const TitleButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const ButtonContainer = styled("div")({
  display: "flex",
});

export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  width: 20,
  height: 20,
  "& svg": {
    width: 20,
    height: 20,
    "& rect": {
      fill: "white",
      stroke: "#E5E5E5",
    },
  },
}));

export const headerStyle = {
  color: "var(--Gray-757575, #757575)",
  fontFamily: "Pretendard Variable",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "-0.26px",
};

// 페이지네이션 컨테이너 스타일 정의
export const PaginationContainer = styled("div")({
  alignSelf: "center",
  display: "flex",
  alignItems: "self-end",
});

// 스타일이 적용되지 않은 버튼 스타일 정의
export const NonStyledButton = styled("button")({
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%" /* 22.4px */,
  width: "20px",
  margin: "0 5px",
  background: "none",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px",
  "&:disabled": {
    color: "#808080",
    cursor: "default",
  },
});

// 선택된 버튼 스타일 정의
export const SelectedButton = styled(NonStyledButton)({
  color: "var(--Primary-Primary, var(--Primary, #00CD9B))",
});

// 페이지네이션이 없는 DataGrid 스타일 정의
export const NoPaginationDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-footerContainer": {
    display: "none", // DataGrid의 footerContainer를 숨김
  },
});

// 테이블 컨테이너 스타일 정의
export const TableContainer = styled("div")({
  display: "flex",
  flexDirection: "column", // 세로 방향으로 정렬
  gap: "7px",
});

// 스타일이 적용된 AddButton 컴포넌트 정의
export const ConfirmButton = styled(Button)({
  width: "122px",
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  borderRadius: "8px",
  background: "var(--Primary-Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%" /* 21px */,
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
  marginBottom: "16px",
  marginRight: "8px",
});

// 스타일이 적용된 DeleteButton 컴포넌트 정의
export const CancelButton = styled(Button)({
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  flex: "1 0 0",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  color: "var(--Gray-111, #111)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%" /* 21px */,
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
  marginRight: "10px",
});
