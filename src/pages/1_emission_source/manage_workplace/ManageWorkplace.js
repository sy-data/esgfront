import { useState } from "react";
import { ContentWithTitie } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";

import LeftArea from "./LeftArea";
import RightArea from "./RightArea";


const ManageWorkplace = () => {
  const [selectedWorkplace, setSelectedWorkplace] = useState({});
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={"사업장 관리"} />
      <SplitArea>
        <LeftArea setSelectedWorkplace={setSelectedWorkplace} />
        <RightArea selectedWorkplace={selectedWorkplace} setSelectedWorkplace={setSelectedWorkplace} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageWorkplace;
