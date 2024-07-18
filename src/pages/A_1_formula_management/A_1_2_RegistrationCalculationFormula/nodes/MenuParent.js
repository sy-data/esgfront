import { Box } from "@mui/material";
import chevron_lv1 from "../images/chevron_lv1.svg";
import chevron_lv1_selected from "../images/chevron_lv1_selected.svg";

const MenuParent = (props) => {
  const toggleMenu = () => {
    props.toggle(props);
  };

  return (
    <Box
      key={`${props.id}${props.index}`}
      tid={props.id}
      sx={{
        display: "flex",
        padding: "11px 16px",
        alignItems: "center",
        gap: "6px",
        alignSelf: "stretch",
        borderRadius: "8px",
        background: props.opened ? "#F2F9F8" : "#fff", // 클릭 여부에 따라 배경색 변경
      }}
      className={`treeItem menu-parent ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img alt="" src={props.opened ? chevron_lv1_selected : chevron_lv1} />
      <Box sx={{ flex: 1 }} tid={props.id}>
        {props.name}
      </Box>
    </Box>
  );
};

export default MenuParent;
