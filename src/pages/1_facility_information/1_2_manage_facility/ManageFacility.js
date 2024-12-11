import React, { useState, useRef } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import FacilityGroups from "./FacilityGroups";
import FacilityList from "./FacilityList";
import FacilityRegister from "./FacilityRegister";
import { esgFetch } from "../../../components/FetchWrapper";
// import { SelectedYear, SelectedFactoryId } from "./States";


const ManageFacility = () => {
  // const resetSelectedYear = useResetRecoilState(SelectedYear);
  // const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("시설정보관리");
    updateGroupList();
  }, []);
  

  const [displayGroups, setDisplayGroups] = useState(true);
  const handleRegister = () => setDisplayGroups(false);
  const handleCloseRegister = () => setDisplayGroups(true);
  
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const updateGroupList = async () => {
    const result = await esgFetch("/premises/office","GET").then(res=>res.json());
    if(Array.isArray(result.data?.items)){
      setGroupList(result.data?.items?.map(group=>({
        id: group.id,
        type: group.type,
        name: group.name,
        count: group.count
      })));
      if(result.data.items.length>0)
        updateFacilityList(result.data.items[0].id);
    }
  }
  
  const [facilityList, setFacilityList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const updateFacilityList = async groupId => {
    setListLoading(true);
    // 기준년도 -> baseYearRef.current.baseYear;
    const premises_id = "BPS4";
    const result = await esgFetch(`/premises/facility?premises_id=${premises_id}`, "GET").then(res=>{
      setListLoading(false);
      return res.json();
    });
    if(Array.isArray(result.data?.items)){
      setFacilityList(result.data?.items?.map(f=>({
        id: f.id,
        name: f.name,
        description: f.description,
        emission_type: f.emission_type,
        fuel: f.fuel,
        industry_type: f.industry_type,
        version: f.version,
        g_rate: f.g_rate,
        j_rate: f.j_rate,
        
        group: f.group,
        workplace: f.workplace,
        add_date: f.add_date,
        report_yn: f.report_yn,
      })));
    }
  }
  
  const refreshList = () => {
    updateFacilityList(groupList[selectedGroupIndex].id);
  }
  
  const baseYearRef = useRef();

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        {displayGroups && <FacilityGroups selectedIndex={selectedGroupIndex} setSelectedIndex={setSelectedGroupIndex} groupList={groupList} setGroupList={setGroupList} updateFacilityList={updateFacilityList} />}
        <FacilityList baseYearRef={baseYearRef} width={displayGroups?"75%":"66%"} register={handleRegister} facilityList={facilityList} setFacilityList={setFacilityList} refreshList={refreshList} listLoading={listLoading} />
        {!displayGroups && <FacilityRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageFacility;
