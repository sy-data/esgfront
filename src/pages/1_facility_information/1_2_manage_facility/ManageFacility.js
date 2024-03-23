import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import ChevronRight from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";

import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { SelectedYear, SelectedFactoryId } from "./States";
import LeftFacility from "./LeftFacility";
import RightFacility from "./RightFacility";


const ManageFacility = () => {
  const baseYearRef = React.useRef(null);

  const setSelectedYear = useSetRecoilState(SelectedYear);
  const resetSelectedYear = useResetRecoilState(SelectedYear);
  const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const handleSearchButtonClick = () => setSelectedYear(baseYearRef.current.baseYear);

  React.useEffect(() => {
    return () => {
      resetSelectedYear();
      resetSelectedFacotyId();
    };
  }, []);

  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA" }}>
      <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>시설정보관리 <ChevronRight sx={{ fontSize: 40 }} /> 사업장 시설정보 관리</div>} />

      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef} />
        </FilterLine>
      </FilterBlock>

      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch" onClick={handleSearchButtonClick}>검색</Button>
      </SearchButtonContainer>
      
      <SplitArea>
        <LeftFacility />
        <RightFacility />
      </SplitArea>
    </ContentWithTitie>
  )
}

export default ManageFacility;
