import Box from "@mui/material/Box";
import MenuParent from "./nodes/MenuParent";
import MenuChild from "./nodes/MenuChild";
import ItemBold from "./nodes/ItemBold";
import ItemPlain from "./nodes/ItemPlain";

const Node = props => {
  const nodeComponent = item => {
    switch(item.type) {
      case "menu-parent":
        return <MenuParent {...item} opened={props.opened[item.id]} toggle={props.toggle} />;
      case "menu-child":
        return <MenuChild {...item} opened={props.opened[item.id]} toggle={props.toggle} />;
      case "item-bold":
        return <ItemBold {...item} opened={props.opened[item.id]} toggle={props.toggle} />;
      case "item-plain":
        return <ItemPlain {...item} opened={props.opened[item.id]} toggle={props.toggle} />;
      default:
        return <div>unknown node type</div>
    }
  }
  
  return props.menu.map((item, index) => (
    <>
      {nodeComponent(item)}
      {props.opened[item.id] && item.children &&
        <Box sx={{display: 'flex', flexDirection: 'column', padding: '10px 0'}}>
          <Node menu={item.children} opened={props.opened} toggle={props.toggle} />
        </Box>
      }
    </>
  ));
}

export default Node;
