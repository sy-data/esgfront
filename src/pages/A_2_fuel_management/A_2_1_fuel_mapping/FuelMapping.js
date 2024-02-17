import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import { 
  ContentWithTitie} from "../../../components/Styles";
import CombustionManagement from "./TopLeftArea.js";
import FuelManagement from "./TopRightArea";
import ParameterManagement from "./BottomArea";

const FuelMapping = () => {
  return (  
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      <MenuTitle title={"배출활동 연료 매핑"} />
      <SplitArea 
        direction='h' 
        splitIcon={<UnfoldMoreTwoToneIcon fontSize='large'/>}
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
