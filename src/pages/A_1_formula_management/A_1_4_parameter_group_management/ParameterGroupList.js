import React from "react";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import {useGridApiRef} from "@mui/x-data-grid";

const dummyData = Array.from({ length: 50 }, (_, index) => ({
    no: index + 1,
    id: index + 1,
    groupId: '0001',
    groupName: '산정식 그룹1',
    description: '1번 그룹'
})).reverse();

const ParameterGroupList = () => {
    const apiRef = useGridApiRef();

    const columns = [
        { field: 'no', headerName: 'No', flex: 1 },
        { field: 'groupId', headerName: '그룹ID', flex: 3 },
        { field: 'groupName', headerName: '그룹명', flex: 1 },
        { field: 'description', headerName: '비고', flex: 1 },
    ];
    return (
        <CustomDataGrid apiRef={apiRef} data={dummyData} columns={columns} checkboxSelection pageSize={15} />
    )
}

export default ParameterGroupList;
