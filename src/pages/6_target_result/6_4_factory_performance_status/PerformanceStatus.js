import React from 'react';
import MenuTitle from "../../../components/MenuTitle";
import {ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer} from "../../../components/Styles";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import {Button} from "@mui/material";
import SplitArea from "../../../components/SplitArea";
import TopStatus from "./TopStatus";
import BottomStatus from "./BottomStatus";

const PerformanceStatus = () => {
    const baseYearRef = React.useRef();

    const handleSearchButtonClick = () => {

    }

    return (
        <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
            <MenuTitle title={"목표 및 성과 > 연단위 성과현황(사업장)"} />

            <FilterBlock>
                <FilterLine>
                    <BaseYearSelect ref={baseYearRef}/>
                </FilterLine>
            </FilterBlock>

            <SearchButtonContainer>
                <Button variant="outlined" size="small" color="btnSearch" onClick={handleSearchButtonClick}>검색</Button>
            </SearchButtonContainer>

            <SplitArea direction='h'>
                <TopStatus />
                <BottomStatus />
            </SplitArea>
        </ContentWithTitie>
    );
}

export default PerformanceStatus;
