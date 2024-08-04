export const commonStyles = {
  display: "flex",
  height: "40px",
  padding: "6px 10px",
  alignItems: "center",
  gap: "16px",
  flex: "1 0 0",
  // background: "var(--Gray-fff, #FFF)",
  boxSizing: "border-box",
};

export const activeButtonStyles = {
  display: "flex",
  width: "114px",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "8px",
  background: "var(--Primary-Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: '"Pretendard Variable"',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%", // 21px
  letterSpacing: "-0.28px",
};

export const inactiveButtonStyles = {
  display: "flex",
  width: "114px",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "8px",
  background: "var(--Gray-eaeaea, #EAEAEA)",
  color: "var(--Gray-ccc, #CCC)",
  textAlign: "center",
  fontFamily: '"Pretendard Variable"',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "150%", // 21px
  letterSpacing: "-0.28px",
};

export const containerStyles = {
  border: "10px bold #F7F8F8",
  backgroundColor: "#F7F8F8",
  minWidth: "1500px",
};

export const innerBoxStyles = {
  my: 2,
  backgroundColor: "#FFF",
  borderRadius: 6,
};

export const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 2,
};

export const titleStyles = {
  flexGrow: 1,
  color: "#000",
  fontFamily: "Pretendard Variable",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "-0.36px",
  marginTop: 1,
  marginLeft: 3,
};

export const buttonBoxStyles = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
};

export const addButtonStyles = {
  minWidth: "100px",
  display: "flex",
  height: "40px",
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "8px",
  background: "var(--Primary-Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "-0.28px",
  marginTop: 2,
};

export const deleteButtonStyles = (selectedRowsLength) => ({
  marginTop: 2,
  minWidth: "100px",
  marginRight: "25px",
  display: "flex",
  height: 40,
  padding: "10px 16px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  color:
    selectedRowsLength > 0 ? "var(--Gray-fff, #FFF)" : "var(--Gray-ccc, #CCC)",
  border:
    selectedRowsLength > 0
      ? "1px solid var(--Primary-Primary, #00CD9B)"
      : "1px solid var(--Gray-eee, #EEE)",
  background:
    selectedRowsLength > 0
      ? "var(--Primary-Primary, #00CD9B)"
      : "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "-0.28px",
});
