import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { useGridApiRef } from "@mui/x-data-grid";


const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 정보가 없습니다.</div>
    </div>
  )
}


const EmissionsStatusTable = props => {
  const apiRef = useGridApiRef();

  // [todo] field 명 재정의 필요
  const columns = [
    { field: 'id', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '기준연월', flex: 2 },
    { field: 'should_report', headerName: '사업장', flex: 2 },
    { field: 'facility', headerName: '시설', flex: 2 },
    { field: 'expansion_date', headerName: '배출활동', flex: 2 },
    { field: 'close_date', headerName: '연료', flex: 2 },
    { field: 'size', headerName: '대분류', flex: 2 },
    { field: 'activity', headerName: '중분류', flex: 2 },
    { field: 'type_industry', headerName: '단위', flex: 2 },
    { field: 'type_fuel', headerName: '사용량', flex: 2 },
    { field: 'ruled', headerName: 'CO2배출량(kg)', flex: 2 },
    { field: 'applied', headerName: 'CH4배출량(kg)', flex: 2 },
    { field: 'modified_date', headerName: 'N2O배출량(kg)', flex: 2 },
  ]

  return (
    <ContentBody>
      <SubTitle title={"시설이력현황"} />
      <CustomDataGrid
        data={props.emissionsStatusList}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={props.loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
      />
    </ContentBody>
  )
};

export default EmissionsStatusTable;
