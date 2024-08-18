import React from "react";
import {styled} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const Container = styled('div')({
  height: 400
});

const ParameterListDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-footerContainer': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaders': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowY: 'auto',
  },
});

export const FormulaParameterList = (props) => {
  const {gridApiRef, data, selectedRow, setSelectedRow} = props;

  const columns = [
    {field: "no", headerName: "No", flex: 1, sortable: false},
    {field: "parentGroupName", headerName: "파라미터상위그룹명", flex: 2, sortable: false},
    {field: "groupId", headerName: "파라미터그룹ID", flex: 2, sortable: false},
    {field: "groupName", headerName: "파라미터그룹명", flex: 2, sortable: false},
    {field: "inputTypeCode", headerName: "입력구분코드", flex: 2, sortable: false},
    {field: "inputType", headerName: "입력구분", flex: 2, sortable: false},
  ];

  return (
    <Container>
      <ParameterListDataGrid
        apiRef={gridApiRef}
        rows={data}
        columns={columns}
        checkboxSelection
        rowSelectionModel={selectedRow}
        onRowSelectionModelChange={setSelectedRow}
      />
    </Container>
  )
}
