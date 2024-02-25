import { useState, useEffect, useRef } from "react";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { esgFetch } from "../../../components/FetchWrapper";

import { Button } from "@mui/material";

import UpCompanyEmission from "./UpCompanyEmission";
import DownCompanyEmission from "./DownCompanyEmission";


const ByCompany = () => {
  const baseyearRef = useRef();
  const [data, setData] = useState([]);

  const searchData = () => {
    // TODO : 기준년도 적용기준
    esgFetch('/api/users/me?populate[]=company.factories.facilities.combustions')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response.company.factories.map((factory, index) => ({ ...factory, index: index+1, year: baseyearRef.current.baseYear })));
      });
  }

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>법인별 비교분석</div>} />
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseyearRef} />
        </FilterLine>
      </FilterBlock>
      <SearchButtonContainer>
        <Button color="btnSearch" variant="outlined" size="small" onClick={searchData}>검색</Button>
      </SearchButtonContainer>

      <SplitArea direction='h'>
        <UpCompanyEmission data={data} />
        <DownCompanyEmission data={data} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ByCompany;
