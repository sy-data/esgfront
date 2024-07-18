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
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 네비게이션 함수 가져옴
  const [opened, setOpened] = useRecoilState(props.stateAtom); // Recoil 상태인 stateAtom을 사용하여 opened 상태와 setOpened 함수를 가져옴
  const [openedLeaf, setOpenedLeaf] = useRecoilState(props.leafAtom); // Recoil 상태인 leafAtom을 사용하여 openedLeaf 상태와 setOpenedLeaf 함수를 가져옴

  const toggleMenu = (item) => {
    // 메뉴 토글 함수 정의
    setOpened({
      ...opened,
      ...((!item.link || openedLeaf !== item.id) && {
        // item에 링크가 없거나 openedLeaf가 현재 item.id와 다른 경우 현재 item의 열림 상태를 반전시킴
        [item.id]: !opened[item.id],
      }),
      ...(item.link && openedLeaf !== item.id && { [openedLeaf]: false }),
      // item에 링크가 있고 openedLeaf가 현재 item.id와 다른 경우, 이전 openedLeaf 상태를 false로 설정
    });
    if (item.link && openedLeaf !== item.id) {
      // item에 링크가 있고 openedLeaf가 현재 item.id와 다른 경우 해당 링크로 네비게이션
      navigate(item.link);
      setOpenedLeaf(item.id); // openedLeaf 상태를 현재 item.id로 설정
    } else if (item.action) {
      // item에 action이 정의된 경우 action 함수 실행
      item.action();
    }
    if (props.onCategoryClick) {
      props.onCategoryClick(item.id); // 카테고리 ID를 상위 컴포넌트로 전달
    }
  };

  return (
    <Node {...props} menu={props.items} opened={opened} toggle={toggleMenu} /> // Node 컴포넌트를 호출하여 메뉴 항목을 렌더링
  );
};

export default NavigationTree;
