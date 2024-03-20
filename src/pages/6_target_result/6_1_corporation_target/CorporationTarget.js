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

const CorporationTarget = () => {
    const baseYearRef = React.useRef();

    const [userCompany, setUserCompany] = React.useState(null);

    const [companyTargetLoading, setCompanyTargetLoading] = React.useState(false);
    const [companyTargetData, setCompanyTargetData] = React.useState([]);

    const [companyPlanLoading, setCompanyPlanLoading] = React.useState(false);
    const [companyPlanData, setCompanyPlanData] = React.useState([]);

    const fetchUserCompany = async () => {
        const result = await esgFetch('/api/users/me?populate=company, company.sub_companies', 'GET').then(res => res.json());
        return result.company;
    }

    const fetchCompanyTarget = async (year, userCompany) => {
        let fetchUrl = `/api/company-goals?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][company][id][$eq]=${userCompany.id}&`;

        return await esgFetch(fetchUrl).then(res => res.json()).then(res => ({ ...res, company: userCompany }));
    }

    const fetchCompanyPlan = async (year, userCompany) => {
        let fetchUrl = `/api/company-plans?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][company][id][$eq]=${userCompany.id}`;

        return await esgFetch(fetchUrl).then(res => res.json()).then(res => ({ ...res, company: userCompany }));
    }

    const getCompanyTarget = async (year, userCompanies) => {
        setCompanyTargetLoading(true);

        const promises = userCompanies.map((company) => fetchCompanyTarget(year, company));
        const companyTargetResult = await Promise.all(promises);
        setCompanyTargetData(companyTargetResult.map((result) => convertData(year, result.company, result.data)));

        setCompanyTargetLoading(false);
    }

    const getCompanyPlan = async (year, userCompanies) => {
        setCompanyPlanLoading(true);

        const promises = userCompanies.map((company) => fetchCompanyPlan(year, company));
        const companyPlanResult = await Promise.all(promises);
        setCompanyPlanData(companyPlanResult.map((result) => convertData(year, result.company, result.data)));

        setCompanyPlanLoading(false);
    }

    const convertData = (baseYear, userCompany, data) => {
        const resultObj = { id: userCompany.id, companyName: userCompany, baseYear: baseYear };

        monthsArray.forEach(([_, value]) => {
            const findData = data.find(item => new Date(item.attributes.date).getMonth() + 1 === value);
            resultObj[`${value}_field`] = {
                id: findData?.id || null,
                month: value < 10 ? `0${value}` : value.toString(),
                value: findData ? findData.attributes.value : '',
                status: findData ? 'saved' : 'new',
            };
        })

        return resultObj;
    }

    const handleSearchButtonClick = () => {
        getCompanyTarget(baseYearRef.current.baseYear, userCompany);
        getCompanyPlan(baseYearRef.current.baseYear, userCompany);
    }

    // 유저의 법인 조회
    React.useEffect(() => {
        (async () => {
            const userCompanyData = await fetchUserCompany();
            const companies = [
                ...(userCompanyData?.sub_companies || []).map(item => ({ id: item.id, name: item.name })),
                { id: userCompanyData.id, name: userCompanyData.name },
            ];

            if (userCompanyData) {
                setUserCompany(companies);
                getCompanyTarget(baseYearRef.current.baseYear, companies);
                getCompanyPlan(baseYearRef.current.baseYear, companies);
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
