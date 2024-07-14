import { Box } from "@mui/material"
import chevron_lv1 from "../images/chevron_lv1.svg";
import chevron_lv1_selected from "../images/chevron_lv1_selected.svg"

const MenuParent = props => {
  const toggleMenu = () => {
    props.toggle(props)
  }
  
  return (
    <Box
      key={`${props.id}${props.index}`}
      tid={props.id}
      sx={{
        height: "56px", width: '100%',
        padding: '14px 10px',
        fontSize: "18px",
        lineHeight: "27px",
        display: 'flex', gap: '12px',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
      className={`treeItem menu-parent ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img alt='' src={props.opened?chevron_lv1_selected:chevron_lv1} />
      <Box sx={{flex: 1}} tid={props.id}>{props.name}</Box>
    </Box>
  )
}

export default MenuParent;
