import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Node from "./Node";
import "./navigationTree.css";

/**
 *
 * 메뉴트리 component
 *
 * 필요 property
 * - items : node정보 list
 * --- {
 * ---   id: 필수값, items 안에서 유일한 값이어야 합니다
 * ---   type: node의 형태에 따른 구분. treeItem-bold / treeItem-plain 중에서 입력.
 * ---   name: 화면에 표시되는 label text
 * ---   link: url 이동이 필요한 경우 target url 입력 -> link가 있으면
 * ---   children: 하위메뉴 list
 * ---   action: url 이동 이외의 function 실행이 필요한 경우
 * --- }
 * - stateAtom : tree open/close 상태 저장용. ./initStateTree(menu) 로 초기화 필요
 * - leafAtom : 선택된 node 저장용. empty string 초기값
 * - action : link 없이 onClick action만 필요한 경우 function 추가
 */
const NavigationTree = (props) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useRecoilState(props.stateAtom);
  const [openedLeaf, setOpenedLeaf] = useRecoilState(props.leafAtom);

  const toggleMenu = (item) => {
    setOpened({
      ...opened,
      ...((!item.link || openedLeaf !== item.id) && {
        [item.id]: !opened[item.id],
      }),
      ...(item.link && openedLeaf !== item.id && { [openedLeaf]: false }),
    });
    if (item.link && openedLeaf !== item.id) {
      navigate(item.link);
      setOpenedLeaf(item.id);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <Node {...props} menu={props.items} opened={opened} toggle={toggleMenu} />
  );
};

export default NavigationTree;
