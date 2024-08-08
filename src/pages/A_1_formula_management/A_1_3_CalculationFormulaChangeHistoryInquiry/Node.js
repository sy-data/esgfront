import Box from "@mui/material/Box";
import MenuParent from "./nodes/MenuParent";
import MenuChild from "./nodes/MenuChild";
import ItemBold from "./nodes/ItemBold";
import ItemPlain from "./nodes/ItemPlain";
import Collapse from "@mui/material/Collapse"; // Collapse 컴포넌트 추가

const Node = (props) => {
  const menu = Array.isArray(props.menu) ? props.menu : []; // 배열 확인 및 초기화

  const nodeComponent = (item) => {
    switch (item.type) {
      case "menu-parent":
        return (
          <MenuParent
            {...item}
            opened={props.opened[item.id]}
            toggle={props.toggle}
          />
        );
      case "menu-child":
        return (
          <MenuChild
            {...item}
            opened={props.opened[item.id]}
            toggle={props.toggle}
          />
        );
      case "treeItem-bold":
        return (
          <ItemBold
            {...item}
            opened={props.opened[item.id]}
            toggle={props.toggle}
          />
        );
      case "treeItem-plain":
        return (
          <ItemPlain
            {...item}
            opened={props.opened[item.id]}
            toggle={props.toggle}
          />
        );
      default:
        return <div>unknown node type</div>;
    }
  };

  return menu.map((item, index) => (
    <div key={item.id}>
      {nodeComponent(item)}
      <Collapse in={props.opened[item.id]}>
        {item.children && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ...(item.type.startsWith("menu-") && { padding: "10px 0" }),
              ...(item.type.startsWith("treeItem-") && { paddingLeft: "28px" }),
              ...(props.opened[item.id] && { marginLeft: "20px" }),
            }}
          >
            <Node
              {...props}
              menu={item.children}
              opened={props.opened}
              toggle={props.toggle}
            />
          </Box>
        )}
      </Collapse>
    </div>
  ));
};

export default Node;
