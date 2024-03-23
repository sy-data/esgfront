import React, { useRef, useState, useEffect, useCallback } from "react";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import { esgFetch } from "../../../components/FetchWrapper";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  baseInformationThreeOneAtom,
  baseInformationAtomDummyData,
  baseYearActivityInfomationAtom,
  baseYearActivityInfomationAtomDummyData,
} from "../../../States/3_activtiy_data_states/3-1_activity_data_add_atom";
import SplitArea from "../../../components/SplitArea";
import MainArea from "./mainArea";
import BaseInformationArea from "./baseInformation";

const ActivityDataAdd = () => {
  const [workplaceList, setWorkplaceList] = useState([{ value: 0, label: "사업장" }]);
  const workplaceSelect = useRef();
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  // 리코일 상태 사용
  const [baseYearActivityInformation, setBaseYearActivityInformation] = useRecoilState(baseYearActivityInfomationAtom);
  const [baseInformation, setBaseInformation] = useRecoilState(baseInformationThreeOneAtom);

  useEffect(() => {
    esgFetch("/api/factories?filters[company][id][$eq]=1")
      .then((response) => response.json())
      .then((response) => {
        const updatedWorkplaceList = [
          { value: 0, label: "사업장" },
          ...response.data.map((v) => ({
            value: v.id,
            label: v.attributes.name,
          })),
        ];
        setWorkplaceList(updatedWorkplaceList);
        setLoading(false);
      });
  }, []);

  const onSearch = useCallback(() => {
    const selectedWorkplaceValue = workplaceSelect.current ? workplaceSelect.current.selected : null;

    if (!baseYear || !selectedWorkplaceValue) {
      alert("검색 조건을 선택해 주세요.");
      return;
    }

    setBaseYearActivityInformation(baseYearActivityInfomationAtomDummyData);
    setBaseInformation(baseInformationAtomDummyData);
    // 아래는 백앤드 API 개발 시 연결
    // 기준년도 활동자료
    // 기준년도 활동자료 가져오는 함수 (쿼리, 파람 아직 확실 X -> 포스트맨에 없음)
    // esgFetch(`/api/combustion-activites?baseYear=${baseYear}&workplaceId=${selectedWorkplaceValue}`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setBaseYearActivityInformation(response.data);
    //   });

    // 근거자료
    // esgFetch(``)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setBaseInformation(response.information);
    //   });
  }, [baseYear]);

  return (
    <ContentWithTitie>
      <MenuTitle title={"배출량 활동자료 등록"} />

      <FilterBlock>
        <FilterLine>
          <BaseYearSelect selectedYear={baseYear} onYearChange={setBaseYear} /> {/* 예시로 추가된 Props */}
          <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
        </FilterLine>
      </FilterBlock>

      <SearchButtonContainer>
        <Button color="btnSearch" variant="outlined" size="small" onClick={() => onSearch()}>
          검색
        </Button>
      </SearchButtonContainer>

      <SplitArea direction={"h"} customWidth={0.7}>
        <MainArea loading={loading} />
        <BaseInformationArea loading={loading} />
      </SplitArea>
    </ContentWithTitie>
  );
};

export default ActivityDataAdd;
