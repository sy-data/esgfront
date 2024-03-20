import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

import { useGridApiRef } from "@mui/x-data-grid";

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 배출량 정보가 없습니다.</div>
    </div>
  )
}

const columns_year = [
  { field: 'index', headerName: '', flex: 1 },
  { field: 'year', headerName: '기준년도', flex: 2 },
  { field: 'name', headerName: '사업장구분', flex: 2 },
  // TODO : 배출량 계산방법 확인
  { field: 's1', headerName: 'Scope1(tCO2eq)', flex: 2 },
  { field: 's2', headerName: 'Scope2(tCO2eq)', flex: 2 },
  { field: 'total', headerName: '총배출량(tCO2eq)', flex: 2 },
  { field: 'won', headerName: '원단위', flex: 1 },
];

const columns_month = [
  { field: 'index', headerName: '', flex: 1 },
  { field: 'year', headerName: '기준년도', flex: 2 },
  { field: 'name', headerName: '사업장구분', flex: 2 },
  // TODO : 배출량 계산방법 확인
  { field: 's1', headerName: 'Scope1(tCO2eq)', flex: 2 },
  { field: 's2', headerName: 'Scope2(tCO2eq)', flex: 2 },
  { field: 'total', headerName: '총배출량(tCO2eq)', flex: 2 },
];

const DownWorkplace = props => {
  const apiRef = useGridApiRef();

  return (
    <ContentBody>
      <SubTitle title={"배출량 정보"} />
      <CustomDataGrid
        data={props?.data?.data ? props.data.data : []}
        apiRef={apiRef}
        columns={props.data?.type === 'y' ? columns_year : columns_month}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
        loading={false}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
      />
    </ContentBody>
  )
}

export default DownWorkplace;
