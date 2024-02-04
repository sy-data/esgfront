import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { useGridApiRef } from "@mui/x-data-grid";


const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 시설이력현황 정보가 없습니다.</div>
    </div>
  )
}


const HistoryContent = props => {
  const apiRef = useGridApiRef();

  const columns = [
    { field: 'id', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '시설명', flex: 2 },
    { field: 'should_report', headerName: '정부보고대상', flex: 2 },
    { field: 'facility', headerName: '배출시설', flex: 2 },
    { field: 'expansion_date', headerName: '시설증설일', flex: 2 },
    { field: 'close_date', headerName: '시설폐쇄일', flex: 2 },
    { field: 'size', headerName: '규모', flex: 2 },
    { field: 'activity', headerName: '배출활동', flex: 2 }, //
    { field: 'type_industry', headerName: '산업군', flex: 2 },
    { field: 'type_fuel', headerName: '연료명', flex: 2 },
    { field: 'ruled', headerName: '배출 규정등급', flex: 2 },
    { field: 'applied', headerName: '배출 적용등급', flex: 2 },
    { field: 'modified_date', headerName: '수정일자', flex: 2 },
  ]

  return (
    <ContentBody>
      <SubTitle title={"시설이력현황"} />
      <CustomDataGrid
        data={props.facilityList}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
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

export default HistoryContent;
