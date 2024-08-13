export const formControlStyles = {
  minWidth: 200,
  marginRight: -25,
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  height: "50px",
};

export const selectStyles = {
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  height: "50px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
};

export const searchButtonStyles = (filters) => ({
  display: "flex",
  width: "100px",
  height: "50.5px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "8px",
  background: "var(--Gray-eaeaea, #EAEAEA)",
  color: "var(--Gray-ccc, #CCC)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%" /* 21px */,
  letterSpacing: "-0.28px",
  backgroundColor:
    filters.energyIndustry || filters.activity || filters.fuel
      ? "#00CD9B"
      : "gray",
  color:
    filters.energyIndustry || filters.activity || filters.fuel
      ? "black"
      : "white",
});

export const addButtonStyles = {
  mt: -12,
  borderRadius: 3,
  background: "var(--Primary-Primary, #00CD9B);",
  display: "flex",
  height: 40,
  width: 121,
  marginRight: 2,
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%", // 21px
  letterSpacing: "-0.28px",
};

export const deleteButtonStyles = (selectedRows) => ({
  backgroundColor: selectedRows.length === 0 ? "gray" : "white",
  color: selectedRows.length === 0 ? "white" : "black",
  mt: -12,
  borderRadius: 3,
  display: "flex",
  height: 40,
  width: 121,
  marginRight: 2,
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%", // 21px
  letterSpacing: "-0.28px",
});
