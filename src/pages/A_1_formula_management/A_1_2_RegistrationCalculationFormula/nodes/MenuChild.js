import { Box } from "@mui/material";
import menu_lv2 from "../images/menu_lv2.svg";
import menu_lv2_selected from "../images/menu_lv2_selected.svg";
import chevron_lv1 from "../images/chevron_lv1.svg";
import chevron_lv1_selected from "../images/chevron_lv1_selected.svg";

const MenuChild = (props) => {
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
        background: "#F2F9F8",
      }}
      className={`treeItem menu-child ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img alt="" src={props.opened ? chevron_lv1_selected : chevron_lv1} />
      <Box sx={{ flex: 1 }} tid={props.id}>
        {props.name}
      </Box>
    </Box>
  );
};

export default MenuChild;
