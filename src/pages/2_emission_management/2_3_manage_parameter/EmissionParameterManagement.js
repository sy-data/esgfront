import { useState, useEffect, useRef, useMemo } from "react";
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import { Button } from "@mui/material";
import { 
  ContentWithTitie, 
  FilterBlock, FilterLine, 
  SearchButtonContainer } from "../../../components/Styles";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect.js";
import CombustionList from "./TopArea";
import ParameterManagement from "./BottomArea";
import { esgFetch } from "../../../components/FetchWrapper.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserCompanyId, SelectedYear, SelectedFactory } from "./States";

const EmissionParameterManagement = () => {
  const [userCompanyId, setUserCompanyId] = useState(null);
  const [factories, setFactories] = useState([]);
  const setSelectedYear = useSetRecoilState(SelectedYear);
  const baseYearRef = useRef();

  // TODO
  // 유저의 회사 아이디를 설정
  // 모든 페이지에서 동일하게 사용할 것 같으니 나중에 얘기해서 통합해야 할 듯

  const fetchUserCompanyId = async () => {
    const url = `/api/users/me?populate[0]=company`
    const response = await esgFetch(url, 'GET');
    if (response.ok) {
      const {company: value} = await response.json();
      setUserCompanyId(value.id);
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }

  const fetchFactories = async () => {
    const url = `/api/factories?filters[company][id]=${userCompanyId}`;
    const response = await esgFetch(url, 'GET');
    const {data: value} = await response.json();
    setFactories(value.map(v => v.attributes.name));
  }

  useEffect(() => {
    fetchUserCompanyId();
  }, []);

  useEffect(() => {
    fetchFactories();
  }, [userCompanyId]);

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      
      <MenuTitle title={"배출원관리 > 배출활동 파라미터 관리"} />
      
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef}/>
          <DefaultSelect selectLabel="사업장" selectOptions={factories}/>
        </FilterLine>
      </FilterBlock>
      
      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch" onClick={() => setSelectedYear(baseYearRef.current.baseYear)}>검색</Button>
      </SearchButtonContainer>
      
      <SplitArea direction='h'>
        <CombustionList/>
        <ParameterManagement/>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default EmissionParameterManagement;
