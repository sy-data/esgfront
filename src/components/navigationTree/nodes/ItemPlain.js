import Box from "@mui/material/Box";
import chevron_item from "../images/chevron_item.svg";
import chevron_item_selected from "../images/chevron_item_selected.svg";

const ItemPlain = (props) => {
  const toggleMenu = () => {
    props.toggle(props);
  };

  return (
    <Box
      key={`${props.id}${props.index}`}
      tid={props.id}
      className={`treeItem treeItem-plain ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img alt="" src={props.opened ? chevron_item_selected : chevron_item} />
      <Box sx={{ flex: 1 }} tid={props.id}>
        {props.name}
      </Box>
    </Box>
  );
};

export default ItemPlain;
