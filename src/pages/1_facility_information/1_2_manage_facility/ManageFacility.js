import { useState, useEffect, useRef } from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ContentWithTitie, FilterBlock, FilterLine } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { esgFetch } from "../../../components/FetchWrapper";

import LeftFacility from "./LeftFacility";
import RightFacility from "./RightFacility";


const ManageFacility = () => {
  const [facilityList, setFacilityList] = useState([]);
  const [workplaceList, setWorkplaceList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=facilities')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setWorkplaceList(response.data.map((v, i) => ({
          index: i + 1,
          id: v.id,
          name: v.attributes.name,
          facilities: v.attributes.facilities.data.map((d,i)=>({'id':i+1,...d.attributes}))
        })));
        setLoading(false);
      });
  }, []);

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>시설정보관리 <ChevronRight sx={{ fontSize: 40 }} /> 사업장 시설정보 관리</div>} />
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect />
        </FilterLine>
      </FilterBlock>
      
      <SplitArea>
        <LeftFacility setFacilityList={setFacilityList} workplaceList={workplaceList} loading={loading} />
        <RightFacility facilityList={facilityList} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageFacility;
