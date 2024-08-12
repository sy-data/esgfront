import Box from "@mui/material/Box";
import MenuParent from "./nodes/MenuParent";
import MenuChild from "./nodes/MenuChild";
import ItemBold from "./nodes/ItemBold";
import ItemPlain from "./nodes/ItemPlain";
import Collapse from "@mui/material/Collapse";

// nodeComponent 함수를 Node 컴포넌트 바깥으로 추출하여 렌더링 성능을 최적화
const nodeComponent = (item, opened, toggle) => {
  switch (item.type) {
    case "menu-parent":
      return <MenuParent {...item} opened={opened[item.id]} toggle={toggle} />;
    case "menu-child":
      return <MenuChild {...item} opened={opened[item.id]} toggle={toggle} />;
    case "treeItem-bold":
      return <ItemBold {...item} opened={opened[item.id]} toggle={toggle} />;
    case "treeItem-plain":
      return <ItemPlain {...item} opened={opened[item.id]} toggle={toggle} />;
    default:
      return <div>알 수 없는 노드 유형</div>;
  }
};

const Node = (props) => {
  // props에서 자주 사용되는 속성들을 구조 분해 할당으로 접근
  // props 객체에서 자주 사용되는 속성들을 구조 분해 할당으로 더 간결하게 접근.
  const { menu = [], opened, toggle } = props; // 기본값을 설정하여 배열 확인 및 초기화, menu가 배열인지 확인하고, 기본값을 빈 배열로 설정하여 안전성 확보.

  return menu.map((item) => (
    <div key={item.id}>
      {nodeComponent(item, opened, toggle)}
      <Collapse in={opened[item.id]}>
        {item.children && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ...(item.type.startsWith("menu-") && { padding: "10px 0" }),
              ...(item.type.startsWith("treeItem-") && { paddingLeft: "28px" }),
              ...(opened[item.id] && { marginLeft: "20px" }),
            }}
          >
            <Node {...props} menu={item.children} />
          </Box>
        )}
      </Collapse>
    </div>
  ));
};

export default Node;
