import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";

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
