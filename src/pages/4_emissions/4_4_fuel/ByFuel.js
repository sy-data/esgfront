import { useState, useEffect, useRef, useMemo } from "react";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { esgFetch } from "../../../components/FetchWrapper";

import { Button } from "@mui/material";

import LeftFuel from "./LeftFuel";
import RightFuel from "./RightFuel";


const fuelData = facilities => {
  const rawData = {}

  facilities?.length > 0 && facilities.forEach(facility => {
    facility.combustions.length > 0 && facility.combustions.forEach(combustion => {
      if ("id" in combustion.fuel) {
        if (combustion.fuel.id in rawData) {
          rawData[combustion.fuel.id].amount = rawData[combustion.fuel.id].amount + Math.floor(Math.random() * 100);
        }
        else {
          rawData[combustion.fuel.id] = { name: combustion.fuel.name, amount: Math.floor(Math.random() * 100) };
        }
      }
    });
  });

  return rawData;
}

const ByFuel = () => {
  const baseYearRef = useRef();
  const workplaceSelect = useRef();

  const [workplaceList, setWorkplaceList] = useState([]);
  const [baseData, setBaseData] = useState();
  const [selectedYear, setSelectedYear] = useState();
  
  useEffect(() => {
    setSelectedYear(baseYearRef.current.baseYear);
    esgFetch('/api/users/me?populate[]=company.factories')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response.company.factories.map(m => ({value: m.id, label: m.name})));
      });
  }, []);

  const searchData = () => {
    if(workplaceList.length === 0){
      alert("사업장이 없습니다");
    }
    else if(workplaceList.map(m=>m.value).includes(workplaceSelect.current.selected)){
      setSelectedYear(baseYearRef.current.baseYear);
      esgFetch('/api/users/me?populate[]=company.factories.facilities.combustions.fuel')
        .then(response => response.json())
        .then(response => {
          setBaseData(fuelData(response.company.factories.find(factory => factory.id === workplaceSelect.current.selected)?.facilities));
        });
    }
    else{
      alert("사업장을 선택해주세요");
    }
  }

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>연료별 비교분석</div>} />
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef} />
          <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
        </FilterLine>
      </FilterBlock>
      <SearchButtonContainer>
        <Button color="btnSearch" variant="outlined" size="small" onClick={searchData}>검색</Button>
      </SearchButtonContainer>

      <SplitArea customWidth={1}>
        <LeftFuel baseData={baseData} />
        <RightFuel baseData={baseData} selectedYear={selectedYear} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ByFuel;