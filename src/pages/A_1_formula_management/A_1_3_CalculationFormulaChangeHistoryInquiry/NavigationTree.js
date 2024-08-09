import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Node from "./Node";
import "./navigationTree.css";

const NavigationTree = (props) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useRecoilState(props.stateAtom);
  const [openedLeaf, setOpenedLeaf] = useRecoilState(props.leafAtom);

  const toggleMenu = (item) => {
    // 메뉴 항목을 클릭했을 때 호출되는 함수입니다.
    setOpened({
      // 현재 상태를 복사하여 확장합니다.
      ...opened,

      // 링크가 없거나 현재 열려 있는 leaf가 클릭된 항목과 다를 경우, 해당 항목의 열림 상태를 토글합니다.
      ...((!item.link || openedLeaf !== item.id) && {
        [item.id]: !opened[item.id],
      }),
      // 링크가 있고 현재 열려 있는 leaf가 클릭된 항목과 다를 경우, 이전에 열려 있던 leaf를 닫습니다.
      ...(item.link && openedLeaf !== item.id && { [openedLeaf]: false }),
    });

    // 링크가 있고 현재 열려 있는 leaf가 클릭된 항목과 다를 경우, 해당 링크로 이동하고 열려 있는 leaf를 업데이트합니다.
    if (item.link && openedLeaf !== item.id) {
      navigate(item.link);
      setOpenedLeaf(item.id);
    }
    // 클릭된 항목에 action이 정의되어 있을 경우, 해당 action을 실행합니다.
    else if (item.action) {
      item.action();
    }

    // props에 onCategoryClick 함수가 전달된 경우, 클릭된 항목의 ID를 인수로 하여 호출합니다.
    if (props.onCategoryClick) {
      props.onCategoryClick(item.id);
    }
  };

  return (
    // Node 컴포넌트를 렌더링합니다. props는 상위 컴포넌트로부터 전달된 속성들을 포함합니다.
    // menu 속성에는 props.items를 전달하고, opened 상태와 toggleMenu 함수를 각각 opened와 toggle 속성으로 전달합니다.
    <Node {...props} menu={props.items} opened={opened} toggle={toggleMenu} />
  );
};

export default NavigationTree;
