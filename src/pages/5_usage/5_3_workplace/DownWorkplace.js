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
  { field: 'year', headerName: '기준년도(월)', flex: 2 },
  // TODO : 배출량 계산방법 확인
  { field: 's1', headerName: 'Scope1(TJ)', flex: 2 },
  { field: 's2', headerName: 'Scope2(TJ)', flex: 2 },
  { field: 'total', headerName: '총에너지사용량(TJ)', flex: 2 },
  { field: 'won', headerName: '원단위(MJ/m2)', flex: 2 },
];

const DownWorkplace = props => {
  const apiRef = useGridApiRef();

  return (
    <ContentBody>
      <SubTitle title={"배출량 정보"} />
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

export default DownWorkplace;
