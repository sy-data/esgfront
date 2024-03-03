import React, { useCallback, useEffect, useRef, useState } from "react";
import { esgFetch } from "../../../components/FetchWrapper";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { Button } from "@mui/material";
import SplitArea from "../../../components/SplitArea";
import MainArea from "./mainArea";
import {
  energyCostDataAtom,
  energyCostDataAtomDummyData,
} from "../../../States/3_activtiy_data_states/3-2_energy_cost_add_atom";
import { useRecoilState } from "recoil";

const EnergyCostAdd = () => {
  const [workplaceList, setWorkplaceList] = useState([{ value: 0, label: "사업장" }]);
  const workplaceSelect = useRef();
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [energyCostData, setEnergyCostData] = useRecoilState(energyCostDataAtom);

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

    setEnergyCostData(energyCostDataAtomDummyData);
  }, []);

  return (
    <ContentWithTitie>
      <MenuTitle title={"에너지 비용 등록"} />
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect selectedYear={baseYear} onYearChange={setBaseYear} />
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
      </SplitArea>
    </ContentWithTitie>
  );
};

export default EnergyCostAdd;
