import React, { useCallback, useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { esgFetch } from "../../../components/FetchWrapper";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import { Button } from "@mui/material";
import SplitArea from "../../../components/SplitArea";
import TopArea from "./topArea";
import { productionActivityAtom } from "../../../States/3_activtiy_data_states/3-5_production_activity_atom";

const ProductionAdd = () => {
  const [workplaceList, setWorkplaceList] = useState([{ value: 0, label: "사업장" }]);
  const workplaceSelect = useRef();
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  // 리코일 상태 사용
  const [productionActivity, setProductionActivity] = useRecoilState(productionActivityAtom);

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

    // esgFetch("..")
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setProductionActivity(response.data);
    //   });
  }, [baseYear]);

  return (
    <ContentWithTitie>
      <MenuTitle title={"하/폐수 활동자료 등록"} />

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
        <TopArea loading={loading} />
      </SplitArea>
    </ContentWithTitie>
  );
};

export default ProductionAdd;
