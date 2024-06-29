import { Box, styled } from "@mui/material";
import chevron_lv1 from "./images/chevron_lv1.svg";
import chevron_lv1_selected from "./images/chevron_lv1_selected.svg"
import menu_lv2 from "./images/menu_lv2.svg";
import menu_lv2_selected from "./images/menu_lv2_selected.svg"
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { treeStateAtom } from "../../States/leftNavigation/tree";
import MenuList from "./MenuList";
import './navigationTree.css';


const Level1 = styled(Box)(() => ({
  height: "56px", width: '100%',
  padding: '14px 10px',
  fontSize: "18px",
  lineHeight: "27px",
  display: 'flex', gap: '12px',
  alignItems: 'center',
  boxSizing: 'border-box'
}));

const Level1Title = styled(Box)(() => ({
  flex: 1
}));

const Level2 = styled(Box)(() => ({
  height: "50px", width: '100%',
  fontSize: "18px",
  lineHeight: "27px",
  display: 'flex', gap: '12px',
  alignItems: 'center',
  boxSizing: 'border-box'
}));

const Level2Title = styled(Box)(() => ({
  flex: 1
}));


const NavigationTree = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [treeState, setTreeState] = useRecoilState(treeStateAtom);
  
  const toggleMenu = evt => {
    const tid = evt.target.getAttribute('tid');
    const nodeInfo = evt.target.getAttribute('tid')?.split('-');
    setTreeState(
      treeState.map(parent => ({
        ...parent,
        ...(nodeInfo.length ===1 && nodeInfo[0] === parent.id && {opened: !parent.opened}),
        ...(nodeInfo.length > 1 && {children: parent.children.map(child => ({id: child.id, opened: child.id === tid}))})
      }))
    );
    
    if(nodeInfo.length > 1) {
      navigate(MenuList.find(m => m.id === nodeInfo[0]).children.find(child => child.id === tid).link);
    }
  }
  
  return (
    <Box sx={{
      width: '236px', height: '100%',
      padding: '0 14px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
    }}>
      {MenuList.map((menu, index) => {
        return (
          <>
            <Level1 key={`${menu.id}${index}`} className={`treeItem ${treeState[index]['opened'] ? "opened-l1" : "closed-l1"}`} tid={menu.id} onClick={toggleMenu}>
              <img alt='' src={treeState[index]['opened']?chevron_lv1_selected:chevron_lv1} />
              <Level1Title tid={menu.id}>{menu.name}</Level1Title>
            </Level1>
            
            {treeState[index]['opened'] &&
              <Box sx={{display: 'flex', flexDirection: 'column', padding: '10px 0'}}>
                {menu.children.map((child, cindex) => (
                  <Level2 className={`treeItem ${treeState[index]['children'][cindex]['opened'] ? "opened-l2" : "closed-l2"}`} tid={child.id} onClick={toggleMenu}>
                    <img alt={''} src={treeState[index]['children'][cindex]['opened'] ? menu_lv2_selected : menu_lv2} />
                    <Level2Title tid={child.id}>{child.name}</Level2Title>
                  </Level2>
                ))}
              </Box>
            }
          </>
        )
      })}
    </Box>
  )
}

export default NavigationTree;
