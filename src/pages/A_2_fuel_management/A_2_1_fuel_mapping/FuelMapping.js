import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import { 
  ContentWithTitie} from "../../../components/Styles";
import CombustionManagement from "./TopLeftArea.js";
import FuelManagement from "./TopRightArea";
import ParameterManagement from "./BottomArea";
import { SelectedFuels, SelectedMappingFuels, MappingFuelChangeFlag } from "./States.js";

const ArrowContainer = styled('div')(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));

const MappingArrow = () => {
  const selectedFuels = useRecoilValue(SelectedFuels);
  const selectedMappingFuels = useRecoilValue(SelectedMappingFuels);
  const setMappingFlag = useSetRecoilState(MappingFuelChangeFlag);

  const handleClickUpArrow = () => {
    // TODO: backend 연결 필요
    console.log("Delete mapping fuels");
    console.log(selectedMappingFuels);
    // recoil state를 바꿈으로써 테이블이 다시 data를 fetch 하도록 함
    setMappingFlag((prev) => !prev);
  }

  const handleClickDownArrow = () => {
    // TODO: backend 연결 필요
    console.log("Add mapping fuels");
    console.log(selectedFuels);
    // recoil state를 바꿈으로써 테이블이 다시 data를 fetch 하도록 함
    setMappingFlag((prev) => !prev);
  }

  return (
    <ArrowContainer>
      <ExpandLessIcon fontSize='small' sx={{cursor: "pointer"}} onClick={handleClickUpArrow}/>
      <ExpandMoreIcon fontSize='small' sx={{cursor: "pointer"}} onClick={handleClickDownArrow}/>
    </ArrowContainer>
  )
}

const FuelMapping = () => {
  return (  
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      <MenuTitle title={"배출활동 연료 매핑"} />
      <SplitArea 
        direction='h' 
        splitComponent={MappingArrow()}
      >
        <SplitArea direction='v' customWidth={0.5}>
          <CombustionManagement/>
          <FuelManagement/>
        </SplitArea>
        <ParameterManagement/>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default FuelMapping;
