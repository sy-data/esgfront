import { Button, styled } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { SearchButtonContainer } from "../../../components/Styles";
import { useGridApiRef } from "@mui/x-data-grid";


const ButtonNewSave = styled(Button)(() => ({
  marginLeft: '5px'
}));

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 시설정보가 없습니다.</div>
    </div>
  )
}


const RightFacility = props => {
  const apiRef = useGridApiRef();
  
  const columns = [
    { field: 'id', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '시설명', flex: 2 },
    { field: 'facility', headerName: '배출시설', flex: 2 },
    { field: 'size', headerName: '규모', flex: 2 },
    { field: 'should_report', headerName: '정보보고대상', flex: 2 },
    { field: 'expansion_date', headerName: '시설증설일', flex: 2 },
  ]

  return (
    <ContentBody>
      <SubTitle title={"시설 정보"}>
        <SearchButtonContainer>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={() => console.log(0)}>신규</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={() => console.log(1)}>저장</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={() => console.log(2)}>삭제</ButtonNewSave>
        </SearchButtonContainer>
      </SubTitle>
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
      // onRowClick={(params) => props.updateFields(workplaceList.find(w => w.id === params.id).attributes)}
      />
    </ContentBody>
  )
};

export default RightFacility;
