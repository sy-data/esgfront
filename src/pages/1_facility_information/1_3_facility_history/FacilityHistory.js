import { useState, useEffect, useRef } from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import { esgFetch } from "../../../components/FetchWrapper";

import HistoryContent from "./HistoryContent";
import { Button } from "@mui/material";


const FacilityHistory = () => {
  const [facilityList, setFacilityList] = useState([]);
  const [workplaceList, setWorkplaceList] = useState([{value: 0, label: '사업장'}]);
  const workplaceSelect = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=facilities')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response.data.map(v => ({
          value: v.id,
          label: v.attributes.name,
          facilityList: v.attributes.facilities
        })));
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    if (workplaceList.length > 0 && !workplaceList.map(item => item.value).includes(workplaceSelect.current.selected)){
      workplaceSelect.current.changeOption(workplaceList[0].value);
      handleWorkplaceChanged(workplaceList[0].value);
    }
  }, [workplaceList]);
  
  // 필요한 버튼 & 동작인지 문의
  const updateFacility = () => {
    handleWorkplaceChanged(workplaceSelect.current.selected);
  }
  
  const handleWorkplaceChanged = workplace => {
    if(workplaceList.length > 0){
      const selectedWorkplace = workplaceList.find(w => w.value === workplace);
      if (selectedWorkplace && "facilityList" in selectedWorkplace){
        setFacilityList(workplaceList.find(w => w.value === workplace).facilityList.data.map(f => ({id: f.id, ...f.attributes})));
      }
    }
  }

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>시설정보관리 <ChevronRight sx={{ fontSize: 40 }} /> 사업장 시설정보 관리</div>} />
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect />
          <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} /*onSelectChanged={handleWorkplaceChanged}*/ ref={workplaceSelect} />
        </FilterLine>
      </FilterBlock>
      <SearchButtonContainer>
        <Button color="btnSearch" variant="outlined" size="small" onClick={() => updateFacility()}>검색</Button>
      </SearchButtonContainer>

      <SplitArea>
        <HistoryContent facilityList={facilityList} workplaceList={workplaceList} loading={loading} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default FacilityHistory;
