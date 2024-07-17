import Box from "@mui/material/Box";
import MenuParent from "./nodes/MenuParent";
import MenuChild from "./nodes/MenuChild";
import ItemBold from "./nodes/ItemBold";
import ItemPlain from "./nodes/ItemPlain";

const Node = (props) => {
  // props를 인자로 받음
  const nodeComponent = (item) => {
    // item 타입에 따라 다른 컴포넌트를 반환하는 함수 정의
    switch (
      item.type // item의 type에 따라 분기
    ) {
      case "menu-parent":
        return (
          <MenuParent
            {...item}
            opened={props.opened[item.id]}
            toggle={props.toggle}
          />
        );
      case "menu-child": //
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

  return props.menu.map(
    (
      item,
      index // props.menu 배열을 순회하면서 컴포넌트를 생성
    ) => (
      <>
        {nodeComponent(item)} {/**현재 item에 맞는 컴포넌트를 렌더링 */}
        {props.opened[item.id] &&
          item.children && ( // 현재 item이 열려 있고, 자식이 있는 경우
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ...(item.type.startsWith("menu-") && { padding: "10px 0" }), // type이 "menu-"로 시작하면 상하 패딩 설정
                ...(item.type.startsWith("treeItem-") && {
                  paddingLeft: "28px",
                }), // type이 "treeItem-"로 시작하면 왼쪽 패딩 설정
                ...(props.opened[item.id] && { marginLeft: "20px" }), // 열려 있는 항목에 대해 marginLeft 설정
                ...(props.opened[item.id] &&
                  {
                    // borderLeft: "2px solid #00bcd4",
                  }), // 열려 있는 항목에 대해 border 설정
              }}
            >
              <Node
                {...props}
                menu={item.children}
                opened={props.opened}
                toggle={props.toggle}
              />
              {/** 재귀적으로 자식 Node 컴포넌트를 렌더링 */}
            </Box>
          )}
      </>
    )
  );
};

export default Node; // Node 컴포넌트를 내보냄
