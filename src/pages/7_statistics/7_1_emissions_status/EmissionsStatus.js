import React from 'react';
import { Button } from "@mui/material";
import MenuTitle from "../../../components/MenuTitle";
import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import { esgFetch } from "../../../components/FetchWrapper";
import SplitArea from "../../../components/SplitArea";
import EmissionsStatusTable from "./EmissionsStatusTable";

const EmissionsStatus = () => {
    const baseYearRef = React.useRef(null);
    const workplaceSelect = React.useRef(null);

    const [workplaceList, setWorkplaceList] = React.useState([]);

    const initializeWorkplaceList = (workplaceData) => {
        const convertWorkplaceData = workplaceData.map(data => ({
            value: data.id,
            label: data.attributes.name,
            facilityList: data.attributes.facilities
        }));

        workplaceSelect.current.changeOption(convertWorkplaceData[0].value);
        setWorkplaceList(convertWorkplaceData);
    };

    const handleSearchButtonClick = () => {
        console.log(workplaceSelect?.current?.selected);
    };

    // 사업장 정보 조회
    React.useEffect(() => {
        esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=facilities')
        .then(response => response.json())
        .then(response => { initializeWorkplaceList(response?.data || []) });
    }, []);

    return (
        <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
            <MenuTitle title={"통계 > 정부보고 배출량 현황"} />

            <FilterBlock>
                <FilterLine>
                    <BaseYearSelect ref={baseYearRef}/>
                    <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
                </FilterLine>
            </FilterBlock>

            <SearchButtonContainer>
                <Button color="btnSearch" variant="outlined" size="small" onClick={handleSearchButtonClick}>검색</Button>
            </SearchButtonContainer>

            <SplitArea>
                <EmissionsStatusTable emissionsStatusList={[]} workplaceList={workplaceList} loading={false} />
            </SplitArea>
        </ContentWithTitie>
    );
} 

export default EmissionsStatus;