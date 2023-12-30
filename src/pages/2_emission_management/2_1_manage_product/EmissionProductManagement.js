import { useState, useRef } from "react";
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import { Button } from "@mui/material";
import { 
  ContentWithTitie, 
  FilterBlock, FilterLine, 
  SearchButtonContainer } from "../../../components/Styles";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import FacilityList from "./LeftArea";
import ProductManagement from "./RightArea";

const EmissionProductManagement = () => {
  const selection = [2021, 2022, 2023];
  const [selection1, setSelection1] = useState(selection[0]);
  const handleChange1 = event => setSelection1(event.target.value);
  
  const baseYearRef = useRef();
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      
      <MenuTitle title={"배출원관리 > 사업자별 생산품 관리"} />
      
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef} />
        </FilterLine>
      </FilterBlock>
      
      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch">검색</Button>
      </SearchButtonContainer>
      
      <SplitArea>
        <FacilityList/>
        <ProductManagement/>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default EmissionProductManagement;
