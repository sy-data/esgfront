import { useState, useEffect, useRef } from "react";
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
import { esgFetch } from "../../../components/FetchWrapper.js";
import { useSetRecoilState } from "recoil";
import { UserCompanyId } from "./States";

const EmissionProductManagement = () => {
  const selection = [2021, 2022, 2023];
  const setUserCompanyId = useSetRecoilState(UserCompanyId);
  const [selection1, setSelection1] = useState(selection[0]);
  const handleChange1 = event => setSelection1(event.target.value);

  // TODO
  // 유저의 회사 아이디를 설정
  // 모든 페이지에서 동일하게 사용할 것 같으니 나중에 얘기해서 통합해야 할 듯
  useEffect(() => {
    const url = `/api/users/me?populate[0]=company`
    esgFetch(url, 'GET').then(response => {
      if (response.ok) return response.json();
      else throw new Error(`${response.status} ${response.statusText}`);
    }).then(({company: value}) => {
      setUserCompanyId(value.id);
    });
  }, []);

  
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
