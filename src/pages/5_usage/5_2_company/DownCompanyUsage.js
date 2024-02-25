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

const columns = [
  { field: 'index', headerName: '', flex: 1 },
  { field: 'year', headerName: '기준년도', flex: 2 },
  { field: 'name', headerName: '사업장구분', flex: 2 },
  { field: 's1tj', headerName: 'Scope1(TJ)', flex: 2 },
  { field: 's2tj', headerName: 'Scope2(TJ)', flex: 2 },
  { field: 'optionaltj', headerName: 'Optional(TJ)', flex: 2 },
  { field: 'totaltj', headerName: '총에너지사용량(TJ)', flex: 2 },
  { field: 's1toe', headerName: 'Scope1(TOE)', flex: 2 },
  { field: 's2toe', headerName: 'Scope2(TOE)', flex: 2 },
  { field: 'optionaltoe', headerName: 'Optional(TOE)', flex: 2 },
  { field: 'totaltoe', headerName: '총에너지사용량(TOE)', flex: 2 },
]

const DownCompanyUsage = props => {
  const apiRef = useGridApiRef();
  
  return (
    <ContentBody>
      <SubTitle title={"에너지 사용량 정보"} />
      <CustomDataGrid
        data={[]}
        apiRef={apiRef}
        columns={columns}
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

export default DownCompanyUsage;
