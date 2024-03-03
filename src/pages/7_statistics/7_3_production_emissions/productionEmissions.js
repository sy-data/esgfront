import { useRef } from "react";

import { Button, styled } from "@mui/material";
import { ContentWithTitie, FilterBlock, FilterLine } from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import SplitArea from "../../../components/SplitArea";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import ContentBody from "../../../components/ContentBody";
import CombustionIfno from "./BottomArea";

const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
}));

const FuelCost = () => {
  const baseYearRef = useRef();

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={"연료 비용"} />
      <SplitArea direction="h" customWidth={0.2}>
        <ContentBody>
          <FilterBlock style={{ border: "none" }}>
            <FilterLine>
              <BaseYearSelect ref={baseYearRef} />
            </FilterLine>
          </FilterBlock>
          <ButtonContainer>
            <Button variant="outlined" size="small" color="btnSearch">
              검색
            </Button>
          </ButtonContainer>
        </ContentBody>
        <CombustionIfno />
      </SplitArea>
    </ContentWithTitie>
  );
};

export default FuelCost;
