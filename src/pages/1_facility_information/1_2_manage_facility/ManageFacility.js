import React, { useState } from "react";
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
    
  }, []);
  

  const [displayGroups, setDisplayGroups] = useState(true);
  const handleRegister = () => setDisplayGroups(false);
  const handleCloseRegister = () => setDisplayGroups(true);
  
  const [groupList, setGroupList] = useState([]);
  const updateGroupList = async () => {
    const result = await esgFetch("").then(res=>res.json());
    if("data" in result){
      setGroupList(result.data.items.map(group=>({
        type: group.type,
        name: group.name,
        count: group.count
      })))
    }
  }
  
  const [facilityList, setFacilityList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const updateFacilityList = async group => {
    setListLoading(true);
    const result = await esgFetch("").then(res=>{
      setListLoading(false);
      return res.json();
    });
    if("data" in result){
      setFacilityList(result.data.items.map(f=>({
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

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        {displayGroups && <FacilityGroups groupList={groupList} setGroupList={setGroupList} updateFacilityList={updateFacilityList} />}
        <FacilityList width={displayGroups?"75%":"66%"} register={handleRegister} listLoading={listLoading} />
        {!displayGroups && <FacilityRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageFacility;
