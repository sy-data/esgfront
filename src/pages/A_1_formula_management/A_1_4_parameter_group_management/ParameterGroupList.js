import React from "react";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import {Select, MenuItem} from "@mui/material";

const groupList = [
    { groupId: '0001', groupName: '산정식그룹' },
    { groupId: '0002', groupName: '활동량' },
    { groupId: '0003', groupName: '배출량' },
    { groupId: '0004', groupName: '에너지사용량' },
    { groupId: '0005', groupName: '산화계수' },
    { groupId: '0006', groupName: '발열량계' },
    { groupId: '0007', groupName: '배출계수' },
    { groupId: '0008', groupName: '기타계수' },
    { groupId: '0009', groupName: '원단위' },
    { groupId: '0010', groupName: '입주율' },
    { groupId: '0011', groupName: '단위변환' },
    { groupId: '0012', groupName: '기타그룹' }
];

const ParameterGroupList = (props) => {
    const { gridApiRef, data, setData, setSelectedRow } = props;

    const handleSelectGroupName = (id, value) => {
        setData(prevState => prevState.map((row) => {
            if (row.id === id) {
                const selectedGroup = groupList.find(({groupId}) => groupId === value);
                return { ...row, groupId: selectedGroup.groupId, groupName: selectedGroup.groupName };
            }
            return row;
        }));
    };

    const columns = [
        { field: 'no', headerName: 'No', flex: 1 },
        { field: 'groupId', headerName: '그룹ID', flex: 2 },
        {
            field: 'groupName',
            headerName: '그룹명',
            flex: 10,
            renderCell: (params) => (
                params.value ? params.value : (
                    <Select
                        value={params.value}
                        onChange={(event) => handleSelectGroupName(params.id, event.target.value)}
                    >
                        {groupList.map(({groupId, groupName}) => <MenuItem key={groupId} value={groupId}>{groupName}</MenuItem>)}
                    </Select>
                )
            ),
        },
        { field: 'description', headerName: '비고', flex: 3 },
    ];



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
