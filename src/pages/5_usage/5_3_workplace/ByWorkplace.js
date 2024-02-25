import { useState, useRef, useMemo } from "react";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import BaseYearRange from "../../../components/filters/BaseYearRange";
import { esgFetch } from "../../../components/FetchWrapper";

import { Button } from "@mui/material";

import UpWorkplace from "./UpWorkplace";
import DownWorkplace from "./DownWorkplace";


const selectTypes = [
  { value: 'y', label: '연도별' },
  { value: 'm', label: '월별' }
];

const selectBoundaries = [
  { value: 0, label: '전체' },
  { value: 1, label: 'Scope1' },
  { value: 2, label: 'Scope2' },
];

const ByWorkplace = () => {
  const typeSelect = useRef();
  const baseYearRef = useRef();
  const workplaceSelect = useRef();
  const boundarySelect = useRef();
  
  const [workplaceList, setWorkplaceList] = useState([]);
  const [chartData, setChartData] = useState();
  const [chartLabel, setChartLabel] = useState([]);
  
  // temp value
  const chartDataByYear = factory => ([
    {
      type: 'bar',
      data: factory.map(m => m.id * 100)
    },
    {
      type: 'line',
      data: factory.map(m => m.id * 100)
    }
  ]);
  
  // temp value
  const chartDataByMonth = () => {
    const dataYears = Array.from({ length: baseYearRef.current.baseYearTo - baseYearRef.current.baseYearFrom + 1 }, (v, k) => parseInt(k) + parseInt(baseYearRef.current.baseYearFrom));
    return dataYears.map(year => ({
      type: 'bar',
      label: year+'년',
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))
    }));
  }

  const searchData = () => {
    if(typeSelect.current.selected === 'm'){
      setChartLabel(["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]);
      setChartData(chartDataByMonth());
      // setWorkplaceList
    }
    else{
      esgFetch('/api/users/me?populate[]=company.factories.facilities.combustions')
        .then(response => response.json())
        .then(response => {
          setChartLabel(response.company.factories.map(m => m.name));
          setChartData(chartDataByYear(response.company.factories))
          setWorkplaceList(response.company.factories.map(m => ({ value: m.id, label: m.name })));
        });
    }
  }
  
  const gridData = {}
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>사업장 연도/월별 비교분석</div>} />
      <FilterBlock>
        <FilterLine>
          <DefaultSelect selectLabel="형식" selectOptions={selectTypes} ref={typeSelect} />
          <BaseYearRange ref={baseYearRef} />
        </FilterLine>
        <FilterLine>
          <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
          <DefaultSelect selectLabel="경계" selectOptions={selectBoundaries} ref={boundarySelect} />
        </FilterLine>
      </FilterBlock>
      <SearchButtonContainer>
        <Button color="btnSearch" variant="outlined" size="small" onClick={searchData}>검색</Button>
      </SearchButtonContainer>

      <SplitArea direction='h'>
        <UpWorkplace chartLabel={chartLabel} chartData={chartData} />
        <DownWorkplace gridData={gridData} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ByWorkplace;
