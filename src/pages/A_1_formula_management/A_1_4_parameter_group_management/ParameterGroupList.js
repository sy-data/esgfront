import React from "react";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

const columns = [
    { field: 'no', headerName: 'No', flex: 1 },
    { field: 'groupId', headerName: '그룹ID', flex: 2 },
    { field: 'groupName', headerName: '그룹명', flex: 10 },
    { field: 'description', headerName: '비고', flex: 3 },
];

const ParameterGroupList = (props) => {
    const { gridApiRef, data, setSelectedRow } = props;

    return (
        <CustomDataGrid
            apiRef={gridApiRef}
            data={data}
            columns={columns}
            checkboxSelection
            pageSize={15}
            onRowSelectionModelChange={setSelectedRow}
        />
    )
}

export default ParameterGroupList;
