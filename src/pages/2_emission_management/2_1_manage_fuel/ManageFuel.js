import React, { useState, useRef } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import FuelGroups from "./FuelGroups";
import FuelInformation from "./FuelInformation";
import ExternalFuelRegister from "./ExternalFuelRegister";
import { esgFetch } from "../../../components/FetchWrapper";


const ManageFuel = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("배출연료관리");
    updateGroupList();
  }, []);
  
  const [groupList, setGroupList] = useState([]);
  const updateGroupList = async () => {
    const result = await esgFetch("").then(res=>res.json());
    if(Array.isArray(result.data?.items)){
      setGroupList(result.data.items.map(group=>({
        id: group.id,
        type: group.type,
        name: group.name,
        count: group.count
      })));
      if(result.data.items.length>0)
        updateFuelList(result.data.items[0].id);
    }
  }
  
  const [fuelActivityList, setFuelActivityList] = useState([]);
  const [externalFuelList, setExternalFuelList] = useState([]);
  
  const updateFuelList = groupId => {
    updateFuelActivityList(groupId);
    updateExternalFuelList(groupId);
  }
  const updateFuelActivityList = async groupId => {
    // 기준년도 -> baseYearRef.current.baseYear;
    const result = await esgFetch("").then(res=>res.json());
    if(Array.isArray(result.data?.items)){
      setFuelActivityList(result.data.items.map(f=>({
        id: f.id,
        c1: f.name,
        c2: f.activity,
        c3: f.apply,
        c4: f.formula,
        c5: f.version,
        c6: f.fuel,
        c7: f.rate,
        c8: f.rate
      })));
    }
  }
  const updateExternalFuelList = async groupId => {
    // 기준년도 -> baseYearRef.current.baseYear;
    const result = await esgFetch("").then(res=>res.json());
    if(Array.isArray(result.data?.items)){
      setExternalFuelList(result.data.items.map(f=>({
        id: f.id,
        c1: f.name,
        c2: f.facility,
        c3: f.company,
        c4: f.workplace,
        c5: f.fuel,
        c6: f.unit,
        c7: f.ratio
      })));
    }
  }
  

  const [displayGroups, setDisplayGroups] = useState(true);
  const handleRegister = () => setDisplayGroups(false);
  const handleCloseRegister = () => setDisplayGroups(true);
  
  const baseYearRef = useRef();

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        {displayGroups && <FuelGroups groupList={groupList} updateFuelList={updateFuelList} />}
        <FuelInformation baseYearRef={baseYearRef} width={displayGroups?"75%":"66%"} register={handleRegister} closeRegister={handleCloseRegister} updateFuelList={updateFuelList}
          fuelActivityList={fuelActivityList} setFuelActivityList={setFuelActivityList} externalFuelList={externalFuelList} setExternalFuelList={setExternalFuelList}
        />
        {!displayGroups && <ExternalFuelRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageFuel;
