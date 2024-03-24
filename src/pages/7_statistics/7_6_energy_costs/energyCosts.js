import { useRef, useState } from "react";

import { Button, styled } from "@mui/material";
import { ContentWithTitie, FilterBlock, FilterLine } from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import ContentBody from "../../../components/ContentBody";
import CombustionIfno from "./bottomArea";
import MiddleArea from "./middleArea";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import BaseYearRange from "../../../components/filters/BaseYearRange";

const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
}));
const selectTypes = [
  { value: "y", label: "연도별" },
  { value: "m", label: "월별" },
];

const workplaceList = [
  { value: 0, label: "선택" },
  { value: 1, label: "상암센터" },
];

const EnergyCosts = () => {
  const baseYearRef = useRef();
  const typeSelect = useRef();
  const workplaceSelect = useRef();

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={"| 월별 에너지 원단위(배출량/생산량)"} />
      <SplitArea direction="h" customWidth={0.2}>
        <ContentBody>
          <FilterBlock style={{ border: "none" }}>
            <FilterLine>
              <DefaultSelect selectLabel="형식" selectOptions={selectTypes} ref={typeSelect} />
              <BaseYearRange ref={baseYearRef} />
            </FilterLine>
            <FilterLine>
              <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
            </FilterLine>
          </FilterBlock>
          <ButtonContainer>
            <Button variant="outlined" size="small" color="btnSearch">
              검색
            </Button>
          </ButtonContainer>
        </ContentBody>
      </SplitArea>
      <SplitArea direction={"h"}>
        <MiddleArea />
        <CombustionIfno />
      </SplitArea>
    </ContentWithTitie>
  );
};

export default EnergyCosts;
