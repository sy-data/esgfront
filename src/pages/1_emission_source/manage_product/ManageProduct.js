import { useState, useCallback } from "react";
import { Button, MenuItem, styled } from "@mui/material";
import { ContentWithTitie } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import { FilterBlock, FilterContainer, FilterLabel, FilterSelect } from "../../../components/Styles";

import LeftProduct from "./LeftProduct";
import RightProduct from "./RightProduct";

import { esgFetch } from "../../../components/FetchWrapper";


const SearchContainer = styled('div')(() => ({
  padding: '0px 10px',
  display: 'flex',
  justifyContent: 'flex-end'
}));

const ManageProduct = () => {
  const [baseYear, setBaseYear] = useState(2023);
  const [workplaceList, setWorkplaceList] = useState([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState({});
  
  const thisYear = new Date().getFullYear();
  const arrayYear = Array.from({length: thisYear-1900+1},(v, k)=>k+1900);
  
  const getWorkplace = useCallback(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response);
      });
  }, [baseYear]);

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={"사업장별 생산품관리"} />
      
      <FilterBlock>
        <FilterContainer>
          <FilterLabel>기준년도</FilterLabel>
          <FilterSelect value={baseYear} onChange={e => setBaseYear(e.target.value)}>
            {arrayYear.map(a => <MenuItem value={a}>{a}</MenuItem>)}
          </FilterSelect>
        </FilterContainer>
      </FilterBlock>
      
      <SearchContainer>
        <Button variant="outlined" size="small" onClick={() => getWorkplace()}>검색</Button>
      </SearchContainer>
      
      <SplitArea>
        <LeftProduct workplaceList={workplaceList} setSelectedWorkplace={setSelectedWorkplace} />
        <RightProduct selectedWorkplace={selectedWorkplace} />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageProduct;
