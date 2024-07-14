import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
