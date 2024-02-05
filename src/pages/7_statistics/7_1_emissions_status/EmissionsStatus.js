import React from 'react';
import MenuTitle from "../../../components/MenuTitle";
import { ContentWithTitie, FilterBlock, FilterLine } from "../../../components/Styles";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import DefaultSelect from "../../../components/filters/DefaultSelect";
import { esgFetch } from "../../../components/FetchWrapper";
import SplitArea from "../../../components/SplitArea";
import EmissionsStatusTable from "./EmissionsStatusTable";

const EmissionsStatus = () => {
    const baseYearRef = React.useRef(null);
    const workplaceSelect = React.useRef(null);

    const [workplaceList, setWorkplaceList] = React.useState([]);

    // 사업장 정보 조회
    React.useEffect(() => {
        esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=facilities')
        .then(response => response.json())
        .then(response => {
            const responseData = response.data;
            setWorkplaceList(responseData.map(data => ({
                value: data.id,
                label: data.attributes.name,
                facilityList: data.attributes.facilities
            })));
        });
    }, []);

    // useEffect(() => {
    //     if (workplaceList.length > 0 && !workplaceList.map(item => item.value).includes(workplaceSelect.current.selected)){
    //       workplaceSelect.current.changeOption(workplaceList[0].value);
    //       handleWorkplaceChanged(workplaceList[0].value);
    //     }
    //   }, [workplaceList]);

    return (
        <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
            <MenuTitle title={"통계 > 정부보고 배출량 현황"} />

            <FilterBlock>
                <FilterLine>
                    <BaseYearSelect ref={baseYearRef}/>
                    <DefaultSelect selectLabel="사업장" selectOptions={workplaceList} ref={workplaceSelect} />
                </FilterLine>
            </FilterBlock>

            <SplitArea>
                <EmissionsStatusTable facilityList={[]} workplaceList={workplaceList} loading={false} />
            </SplitArea>
        </ContentWithTitie>
    );
} 

export default EmissionsStatus;