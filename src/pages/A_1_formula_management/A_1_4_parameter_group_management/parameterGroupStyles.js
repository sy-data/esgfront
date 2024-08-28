export const styles = {
  container: {
    minWidth: "100rem",
    border: "2px solid #D8D8D8",
  },
  title: {
    color: "var(--Neutral-100, #000)",
    fontFamily: "Pretendard Variable",
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: "-0.36px",
    marginTop: "1rem",
  },
  button: {
    height: "40px",
    width: "7rem",
    marginRight: "1rem",
    borderRadius: "8px",
    background: "var(--Primary, #00CD9B)",
    fontWeight: 700,
    color: "var(--Gray-fff, #FFF)",
    textAlign: "center",
    fontFamily: "Pretendard Variable",
    letterSpacing: "-0.28px",
  },
  table: {
    border: "2px solid #D8D8D8",
    borderRadius: "1rem",
    marginBottom: "-15rem",
    marginTop: "1rem",
  },
  tableRowHover: {
    "&:hover": { backgroundColor: "#f5f5f5" },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16rem",
  },
};
