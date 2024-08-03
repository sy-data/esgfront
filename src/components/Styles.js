import { styled, Select, FormControl } from "@mui/material";

export const MasterLayout = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
}));

export const MainContent = styled("div")(() => ({
  display: "flex",
  height: "calc(100% - 80px)"
}));

export const ContentWithTitie = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  height: "100%",
  overflow: "auto"
}));

export const FilterBlock = styled("div")(() => ({
  margin: "10px",
  padding: "10px",
  backgroundColor: "#FFFFFF",
  border: "2px black solid",
}));

export const FilterLine = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

export const FilterContainer = styled(FormControl)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginLeft: "20px",
  marginRight: "40px",
}));

FilterContainer.defaultProps = {
  size: "small",
};

export const FilterLabel = styled("div")(() => ({
  padding: "0px 10px",
  margin: "0px 10px",
  height: "40px",
  minWidth: "120px",
  backgroundColor: "#999999",
  display: "flex",
  alignItems: "center",
}));

export const FilterSelect = styled(Select)(() => ({
  minWidth: "150px",
  '& .MuiSelect-select': {
    padding: "6px 10px",
    height: "40px", width: "276px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: "1 0 0",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid var(--Gray-eee, #EEE)",
    background: "var(--Gray-fff, #FFF)",
    
    color: "var(--Gray-757575, #757575)",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%", /* 19.5px */
    letterSpacing: "-0.26px"
  }
}));

export const SearchButtonContainer = styled("div")(() => ({
  padding: "0px 10px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
}));
