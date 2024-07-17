import Box from "@mui/material/Box";
import chevron_item from "../images/chevron_item.svg";
import chevron_item_bold_selected from "../images/chevron_item_bold_selected.svg";

const ItemBold = (props) => {
  const toggleMenu = () => {
    console.log("ItemBold");
    props.toggle(props);
  };

  return (
    <Box
      key={`${props.id}${props.index}`}
      tid={props.id}
      className={`treeItem treeItem-bold ${props.opened ? "opened" : ""}`}
      onClick={toggleMenu}
    >
      <img
        alt=""
        src={props.opened ? chevron_item_bold_selected : chevron_item}
      />
      <Box sx={{ flex: 1 }} tid={props.id}>
        {props.name}
      </Box>
    </Box>
  );
};

export default ItemBold;
