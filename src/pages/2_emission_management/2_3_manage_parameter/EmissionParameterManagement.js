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
import { useSetRecoilState } from "recoil";
import { SelectedYear, SelectedFactoryId } from "./States";

const EmissionParameterManagement = () => {
  const [userCompanyId, setUserCompanyId] = useState(null);
  const [factories, setFactories] = useState([]);
  const setSelectedYear = useSetRecoilState(SelectedYear);
  const setSelectedFactoryId = useSetRecoilState(SelectedFactoryId);
  const baseYearRef = useRef();
  const factoryRef = useRef();

  // 사용자의 회사 ID 가져오는 함수
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

  // 사용자의 회사 ID로 사업장 목록 가져오는 함수
  const fetchFactories = async () => {
    if (!userCompanyId) return;
    const url = `/api/factories?filters[company][id]=${userCompanyId}&`
    const response = await esgFetch(url, 'GET');
    const {data: value} = await response.json();
    setFactories(value.map(v => {
      return {
        id: v.id,
        name: v.attributes.name
      }
    }));
  }

  useEffect(() => {
    fetchUserCompanyId();
  }, []);

  useEffect(() => {
    if(userCompanyId) {
      fetchFactories();
    }
  }, [userCompanyId]);

  // 검색 버튼 눌렀을 때
  const handleClickedSearch = () => {
    if(factories[factoryRef.current.selected] === undefined || 
        factories[factoryRef.current.selected] === null) {
      alert("사업장을 선택해주세요.");
      return
    }
    setSelectedYear(baseYearRef.current.baseYear);
    setSelectedFactoryId(factories[factoryRef.current.selected].id);
  }

  return (  
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      
      <MenuTitle title={"배출원관리 > 배출활동 파라미터 관리"} />
      
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef}/>
          {/* TODO: 기본값 "선택"으로 바꾸기 */}
          <DefaultSelect ref={factoryRef}
            selectLabel="사업장" 
            selectOptions={factories.map(v => v.name)}
          />
        </FilterLine>
      </FilterBlock>
      
      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch" onClick={handleClickedSearch}>검색</Button>
      </SearchButtonContainer>
      
      <SplitArea direction='h'>
        <CombustionList/>
        <ParameterManagement/>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default EmissionParameterManagement;
