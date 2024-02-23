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
import SplitArea from "../../../components/SplitArea";
import FactoryList from "./FactoryList";

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const FactoryTarget = () => {
    const baseYearRef = React.useRef();

    const [userCompanyId, setUserCompanyId] = React.useState(null);

    const [factoriesLoading, setFactoriesLoading] = React.useState(false);
    const [factories, setFactories] = React.useState([]);
    const [selectedFactoryId, setSelectedFactoryId] = React.useState(null);

    const [factoryTargetLoading, setFactoryTargetLoading] = React.useState(false);
    const [factoryTargetData, setFactoryTargetData] = React.useState([]);

    const [factoryPlanLoading, setFactoryPlanLoading] = React.useState(false);
    const [factoryPlanData, setFactoryPlanData] = React.useState([]);

    const selectedFactory = factories.find(factory => factory.id === selectedFactoryId);

    const fetchUserCompany = async () => {
        const result = await esgFetch('/api/users/me?populate=company', 'GET').then(res => res.json());
        return result.company;
    }

    const fetchFactories = async (userCompanyId, selectedYear) => {
        let fetchUrl = `/api/factories?`;
        fetchUrl += `filters[company][id]=${userCompanyId}&`;
        fetchUrl += `filters[company][createdAt][$gte]=${selectedYear}-01-01&`;
        fetchUrl += `filters[company][createdAt][$lte]=${selectedYear}-12-31`;
        return await esgFetch(fetchUrl).then(res => res.json());
    }

    const fetchFactoryTarget = async (year, selectedFactoryId) => {
        let fetchUrl = `/api/factory-goals?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][factory][id][$eq]=${selectedFactoryId}`;

        return await esgFetch(fetchUrl).then(res => res.json());
    }

    const fetchFactoryPlan = async (year, selectedFactoryId) => {
        let fetchUrl = `/api/factory-plans?`;
        fetchUrl += `filters[$and][0][date][$gte]=${year}-01-01&`;
        fetchUrl += `filters[$and][1][date][$lte]=${year}-12-31&`;
        fetchUrl += `sort=date:DESC&`;
        fetchUrl += `filters[$and][2][factory][id][$eq]=${selectedFactoryId}`;

        return await esgFetch(fetchUrl).then(res => res.json());
    }

    const getFactories = async (userCompanyId, selectedYear) => {
        setFactoriesLoading(true);

        const factories = await fetchFactories(userCompanyId, selectedYear);
        const factoriesData = factories?.data || [];
        setFactories(factoriesData);

        setFactoriesLoading(false);
    }

    const getFactoryTarget = async (year, selectedFactory) => {
        setFactoryTargetLoading(true);

        const companyTarget = await fetchFactoryTarget(year, selectedFactory.id);
        const covertCompanyTargetData = convertData(year, selectedFactory, companyTarget?.data || []);
        setFactoryTargetData(covertCompanyTargetData);

        setFactoryTargetLoading(false);
    }

    const getFactoryPlan = async (year, selectedFactory) => {
        setFactoryPlanLoading(true);

        const companyPlan = await fetchFactoryPlan(year, selectedFactory.id);
        const convertCompanyPlanData = convertData(year, selectedFactory, companyPlan?.data || [] );
        setFactoryPlanData(convertCompanyPlanData);

        setFactoryPlanLoading(false);
    }

    const convertData = (baseYear, selectedFactory, data) => {
        const resultObj = { id: 0, factory: selectedFactory, baseYear: baseYear };

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
        if (!baseYearRef.current.baseYear) return;
        await getFactories(userCompanyId, baseYearRef.current.baseYear);
    }

    React.useEffect(() => {
        (async () => {
            const userCompanyData = await fetchUserCompany();
            if (!userCompanyData) return;

            setUserCompanyId(userCompanyData.id);
            await getFactories(userCompanyData.id, baseYearRef.current.baseYear);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            if (!selectedFactory) return;
            getFactoryTarget(baseYearRef.current.baseYear, selectedFactory);
            getFactoryPlan(baseYearRef.current.baseYear, selectedFactory);
        })();
    }, [selectedFactory]);

    return (
        <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
            <MenuTitle title={"목표 및 성과 > 사업장별 목표 등록"} />

            <FilterBlock>
                <FilterLine>
                    <BaseYearSelect ref={baseYearRef}/>
                </FilterLine>
            </FilterBlock>

            <SearchButtonContainer>
                <Button variant="outlined" size="small" color="btnSearch" onClick={handleSearchButtonClick}>검색</Button>
            </SearchButtonContainer>

            <SplitArea>
                <FactoryList
                    factories={factories}
                    setSelectedFactoryId={setSelectedFactoryId}
                    loading={factoriesLoading}
                />

                <TableWrapper>
                    <TopTable
                        data={factoryTargetData}
                        loading={factoryTargetLoading}
                        setCompanyTargetData={setFactoryTargetData}
                        onSave={() => getFactoryTarget(baseYearRef.current.baseYear, selectedFactory)}
                    />

                    <BottomTable
                        data={factoryPlanData}
                        loading={factoryPlanLoading}
                        setCompanyTargetData={setFactoryPlanData}
                        onSave={() => getFactoryPlan(baseYearRef.current.baseYear, selectedFactory)}
                    />
                </TableWrapper>
            </SplitArea>
        </ContentWithTitie>
    )
}

export default FactoryTarget;
