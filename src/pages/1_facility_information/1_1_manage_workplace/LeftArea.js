import { LinearProgress } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
    </div>
  )
}

const LeftArea = props => {
  const apiRef = useGridApiRef();
  
  const columns = [
    { field: 'index', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '사업장명', flex: 2 },
    { field: 'number', headerName: '사업자번호', flex: 2 },
  ]
  
  const updateWorkplace = params => {
    props.updateFields(params.row.attributes);
    props.setSelectedWorkplace(params.id);
  }
  
  return (
    <ContentBody>
      <SubTitle title={"사업장 목록"} />
      <CustomDataGrid
        data={props.workplaceList}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={props.loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
        onRowClick={updateWorkplace}
      />
    </ContentBody>
  )
}

export default LeftArea;
