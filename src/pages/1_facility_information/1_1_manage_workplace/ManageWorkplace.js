import { useState, useRef } from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ContentWithTitie } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";

import LeftArea from "./LeftArea";
import RightArea from "./RightArea";


const ManageWorkplace = () => {
  const [selectedWorkplace, setSelectedWorkplace] = useState({});
  const rightRef = useRef();
  
  const updateFields = values => rightRef.current.updateFields(values);
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{display: "flex", alignItems: "center"}}>시설정보관리 <ChevronRight sx={{fontSize:40}}/> 사업장 관리</div>} />
      <SplitArea>
        <LeftArea setSelectedWorkplace={setSelectedWorkplace} updateFields={updateFields} />
        <RightArea selectedWorkplace={selectedWorkplace} setSelectedWorkplace={setSelectedWorkplace} ref={rightRef} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageWorkplace;
