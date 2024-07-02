import { Box, Button, Checkbox, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: 24,
  height: "100%",
  width: "100%",
});

export const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
});

export const StyledTypography = styled(Typography)({
  color: "var(--Gray-111, #111)",
  fontFamily: "Pretendard Variable",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "36px",
  letterSpacing: "-0.48px",
});

export const ButtonGroup = styled(Box)({
  display: "flex",
  gap: 8,
});

export const AddButton = styled(Button)({
  display: "flex",
  height: "38px",
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
  fontWeight: "700",
  lineHeight: "21px",
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
});

export const DeleteButton = styled(Button)({
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  color: "var(--Gray-ccc, #CCC)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "21px",
  letterSpacing: "-0.28px",
});

export const TableContainer = styled(Box)({
  border: "1px solid #5e5e5e",
  borderRadius: 8,
  width: "100%",
  overflow: "hidden",
});

export const TableHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #eaeaea",
  height: "42px",
  padding: 16,
});

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    width: "20px",
    height: "20px",
    background:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#E5E5E5"/></svg>\')',
    backgroundSize: "contain",
    border: "none",
  },
  "& .Mui-checked": {
    height: "20px !important",
    left: "0 !important",
    position: "absolute !important",
    top: "0 !important",
    width: "20px !important",
  },
  marginRight: 10,
}));

export const HeaderItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "70px",
});

export const HeaderTitle = styled(Typography)({
  marginRight: 230,
  fontWeight: "bold",
  color: "#757575",
});

export const TableContent = styled(Box)({
  height: "780px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  backgroundColor: "#fff",
});

export const ContentMessage = styled(Typography)({
  color: "#757575",
});
