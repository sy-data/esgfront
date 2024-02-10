import React from 'react';
import { useSetRecoilState, useRecoilValue } from "recoil";

import { LinearProgress } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";

import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { esgFetch } from "../../../components/FetchWrapper.js";
import { SelectedYear, SelectedFactoryId } from "./States";

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
    </div>
  )
};

const columns = [
  { field: 'index', headerName: 'No', flex: 1 },
  { field: 'name', headerName: '사업장명', flex: 2 },
];

const LeftFacility = () => {
  const apiRef = useGridApiRef();
  const [workplaceList, setWorkplaceList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const selectedYear = useRecoilValue(SelectedYear);
  const setSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const getUserCompanyId = async () => {
    const result = await esgFetch('/api/users/me?populate[0]=company', 'GET').then(res => res.json());
    return result.company.id;
  }

  const getFactories = async (userCompanyId, selectedYear) => {
    let fetchUrl = `/api/factories?`;
    fetchUrl += `filters[company][id]=${userCompanyId}&`;
    fetchUrl += `filters[company][createdAt][$gte]=${selectedYear}-01-01&`;
    fetchUrl += `filters[company][createdAt][$lte]=${selectedYear}-12-31`;
    return await esgFetch(fetchUrl).then(res => res.json());
  }

  const convertWorkplaceData = (list) => {
    return list.map((item, index) => ({
      index: index + 1,
      id: item.id,
      name: item.attributes.name,
      number: item.attributes.brn
    }));
  }

  const handleTableRowClick = (params) => setSelectedFacotyId(params.id);

  React.useEffect(() => {
      (async () => {
        setLoading(true);

        const userCompanyId = await getUserCompanyId();
        const factories = await getFactories(userCompanyId, selectedYear);
        const workplaceData = convertWorkplaceData(factories?.data || []);

        setWorkplaceList(workplaceData);
        setLoading(false);
      })();
  }, [selectedYear]);

  return (
    <ContentBody>
      <SubTitle title={"사업장 목록"} />
      <CustomDataGrid
        data={workplaceList}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
        onRowClick={handleTableRowClick}
      />
    </ContentBody>
  )
}

export default LeftFacility;
