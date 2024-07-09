import { Box } from "@mui/material"
import menu_lv2 from "../images/menu_lv2.svg";
import menu_lv2_selected from "../images/menu_lv2_selected.svg"

const MenuChild = props => {
  const toggleMenu = () => {
    props.toggle(props)
  }
  return (
    <Box
      key={`${props.id}${props.index}`}
      tid={props.id}
      sx={{
        height: "50px", width: '100%',
        lineHeight: "27px",
        display: 'flex', gap: '12px',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
      className={`treeItem menu-child ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img alt='' src={props.opened?menu_lv2_selected:menu_lv2} />
      <Box sx={{flex: 1}} tid={props.id}>{props.name}</Box>
    </Box>
  )
}

export default MenuChild;
