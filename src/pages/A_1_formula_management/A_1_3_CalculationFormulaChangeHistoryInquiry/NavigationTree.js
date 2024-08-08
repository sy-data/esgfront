import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Node from "./Node";
import "./navigationTree.css";

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
    if (props.onCategoryClick) {
      props.onCategoryClick(item.id);
    }
  };

  return (
    <Node {...props} menu={props.items} opened={opened} toggle={toggleMenu} />
  );
};

export default NavigationTree;
