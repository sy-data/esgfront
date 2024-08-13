export const boxStyle = {
  width: "83%",
  border: "2px solid #ccc ",
};

export const typographyStyle = {
  color: "var(--Neutral-100, #000)",
  fontFamily: "Pretendard Variable",
  fontSize: "18px",
  fontWeight: 700,
};

export const addButtonStyle = {
  marginRight: 8,
  borderRadius: "8px",
  background: "var(--Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  height: 39,
};

export const deleteButtonStyle = (disabled) => ({
  borderRadius: "8px",
  minWidth: 100,
  height: 40,
  color: disabled ? "grey.500" : "primary.main",
  borderColor: disabled ? "grey.500" : "primary.main",
});

export const tableContainerStyle = {
  border: "2px solid #ccc ",
};
