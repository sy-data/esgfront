import { useState, useRef, useEffect } from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ContentWithTitie } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import { esgFetch } from "../../../components/FetchWrapper";

import LeftArea from "./LeftArea";
import RightArea from "./RightArea";


const ManageWorkplace = () => {
  const [workplaceList, setWorkplaceList] = useState([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState();
  const [loading, setLoading] = useState(true);
  const rightRef = useRef();
  
  const updateFields = values => rightRef.current.updateFields(values);
  
  useEffect(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=company.industry')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response.data.map((v, i) => ({
          index: i + 1,
          id: v.id,
          name: v.attributes.name,
          number: v.attributes.brn,
          industry: v.attributes.company.data.attributes.industry.data.id,
          attributes: v.attributes
        })));
        setLoading(false);
      });
  }, []);
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{display: "flex", alignItems: "center"}}>시설정보관리 <ChevronRight sx={{fontSize:40}}/> 사업장 관리</div>} />
      <SplitArea>
        <LeftArea workplaceList={workplaceList} setSelectedWorkplace={setSelectedWorkplace} updateFields={updateFields} loading={loading} />
        <RightArea selectedWorkplace={selectedWorkplace} setSelectedWorkplace={setSelectedWorkplace} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList} ref={rightRef} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageWorkplace;
