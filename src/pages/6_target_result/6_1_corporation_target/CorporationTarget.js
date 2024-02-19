import React from 'react';
import {
    ContentWithTitie,
    FilterBlock,
    FilterLine,
    SearchButtonContainer
} from "../../../components/Styles";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import {Button} from "@mui/material";
import styled from '@emotion/styled'
import TopTable from "./TopTable";
import {esgFetch} from "../../../components/FetchWrapper";
import BottomTable from "./BottomTable";
import {monthsArray} from "./constants";

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

// [todo] 수정, 등록 구현해야 함,
const CorporationTarget = () => {
    const baseYearRef = React.useRef();

    const [userCompany, setUserCompany] = React.useState(null);

    const [companyTargetLoading, setCompanyTargetLoading] = React.useState(false);
    const [companyTargetData, setCompanyTargetData] = React.useState([]);

    const [companyPlanLoading, setCompanyPlanLoading] = React.useState(false);
    const [companyPlanData, setCompanyPlanData] = React.useState([]);

    const fetchUserCompany = async () => {
        const result = await esgFetch('/api/users/me?populate=company', 'GET').then(res => res.json());
        return result.company;
    }

    const fetchCompanyTarget = async (year, userCompanyId) => {
        let fetchUrl = `/api/company-goals?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][company][id][$eq]=${userCompanyId}`;

        return await esgFetch(fetchUrl).then(res => res.json());
    }

    const fetchCompanyPlan = async (year, userCompanyId) => {
        let fetchUrl = `/api/company-plans?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][company][id][$eq]=${userCompanyId}`;

        return await esgFetch(fetchUrl).then(res => res.json());
    }

    const getCompanyTarget = async (year, userCompany) => {
        setCompanyTargetLoading(true);

        const companyTarget = await fetchCompanyTarget(year, userCompany.id);
        setCompanyTargetData(convertData(year, userCompany, companyTarget?.data || []));

        setCompanyTargetLoading(false);
    }

    const getCompanyPlan = async (year, userCompany) => {
        setCompanyPlanLoading(true);

        const companyPlan = await fetchCompanyPlan(year, userCompany.id);
        setCompanyPlanData(convertData(year, userCompany, companyPlan?.data || [] ));

        setCompanyPlanLoading(false);
    }

    const convertData = (baseYear, userCompany, data) => {
        const resultObj = { id: 0, companyName: userCompany, baseYear: baseYear };

        monthsArray.forEach(([_, value]) => {
            const findData = data.find(item => new Date(item.attributes.date).getMonth() + 1 === value);
            resultObj[`${value}_field`] = {
                id: findData?.id || null,
                month: value < 10 ? `0${value}` : value.toString(),
                value: findData ? findData.attributes.value : '',
                status: findData ? 'saved' : 'new',
            };
        })

        return [resultObj];
    }

    const handleSearchButtonClick = async () => {
        await getCompanyTarget(baseYearRef.current.baseYear, userCompany);
        await getCompanyPlan(baseYearRef.current.baseYear, userCompany);
    }

    // 유저의 법인 조회
    React.useEffect(() => {
        (async () => {
            // [todo] 유저와 법인이 1:n 관계로 변경되면 아래 코드 변경 필요
            const userCompanyData = await fetchUserCompany();

            if (userCompanyData) {
                setUserCompany(userCompanyData);
                await getCompanyTarget(baseYearRef.current.baseYear, userCompanyData);
                await getCompanyPlan(baseYearRef.current.baseYear, userCompanyData);
            }
        })();
    }, []);

    return (
        <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
            <MenuTitle title={"목표 및 성과 > 법인별 목표 등록"} />

            <FilterBlock>
                <FilterLine>
                    <BaseYearSelect ref={baseYearRef}/>
                </FilterLine>
            </FilterBlock>

            <SearchButtonContainer>
                <Button variant="outlined" size="small" color="btnSearch" onClick={handleSearchButtonClick}>검색</Button>
            </SearchButtonContainer>

            <TableWrapper>
                <TopTable
                    data={companyTargetData}
                    loading={companyTargetLoading}
                    setCompanyTargetData={setCompanyTargetData}
                    onSave={() => getCompanyTarget(baseYearRef.current.baseYear, userCompany)}
                />

                <BottomTable
                    data={companyPlanData}
                    loading={companyPlanLoading}
                    setCompanyTargetData={setCompanyPlanData}
                    onSave={() => getCompanyPlan(baseYearRef.current.baseYear, userCompany)}
                />
            </TableWrapper>
        </ContentWithTitie>
    )
}

export default CorporationTarget;
