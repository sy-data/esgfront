import { useEffect, useRef } from "react";
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
import { UserCompanyId, SelectedYear } from "./States";

const EmissionFuelManagement = () => {
  const setUserCompanyId = useSetRecoilState(UserCompanyId);
  const setSelectedYear = useSetRecoilState(SelectedYear);
  const baseYearRef = useRef();

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

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      
      <MenuTitle title={"배출원관리 > 배출활동 연료 관리"} />
      
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef}/>
        </FilterLine>
      </FilterBlock>
      
      <SearchButtonContainer>
        {/* 검색 버튼이 필요한가? 그냥 년도 선택하면 바로 조회되게 하면 되지 않을까? */}
        <Button variant="outlined" size="small" color="btnSearch" onClick={() => setSelectedYear(baseYearRef.current.baseYear)}>검색</Button>
      </SearchButtonContainer>
      
      <SplitArea>
        <FacilityList/>
        <ProductManagement/>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default EmissionFuelManagement;
