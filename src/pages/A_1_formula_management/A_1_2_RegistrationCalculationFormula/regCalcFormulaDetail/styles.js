import {Select, styled} from "@mui/material";

export const FormulaDetailSectionContainer = styled("div")({
  padding: "24px",
  gap: "16px",
  borderRadius: "8px",
  border: "1px solid #EEE",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
})

export const FormulaDetailLabel = styled("span")({
  color: "var(--Gray-111, #111)",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontWeight: 600,
  marginLeft: "4px",
});

export const FormulaDetailSelectBox = styled(Select)(() => ({
  display: "flex",
  height: "40px",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  marginTop: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "transparent",
  },
}));

export const FormulaDetailSelectPlaceholder = styled("span")({
  color: "var(--Gray-aaa, #AAA)",
  fontFamily: "Pretendard Variable",
  fontSize: "13px",
});
