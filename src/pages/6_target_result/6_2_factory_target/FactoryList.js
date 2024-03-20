import React from 'react';
import { useSetRecoilState, useRecoilValue } from "recoil";

import { LinearProgress } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";

import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { esgFetch } from "../../../components/FetchWrapper.js";

const NoRowsOverlay = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
            <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
        </div>
    )
};

const columns = [
    { field: 'index', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '사업장명', flex: 2 },
];

const FactoryList = (props) => {
    const apiRef = useGridApiRef();

    const factoryListData = React.useMemo(() => {
        return props.factories.map((item, index) => {
            return {
                id: item.id,
                index: index + 1,
                name: item.attributes.name
            }
        });
    }, [props.factories]);

    const handleTableRowClick = (params) => props.setSelectedFactoryId(params.id);

    return (
        <ContentBody>
            <SubTitle title={"사업장 목록"} />
            <CustomDataGrid
                data={factoryListData}
                apiRef={apiRef}
                columns={columns}
                editable={false}
                slots={{
                    noRowsOverlay: NoRowsOverlay,
                    loadingOverlay: LinearProgress,
                }}
                loading={props.loadig}
                disableColumnMenu={true}
                columnHeaderHeight={40}
                rowHeight={30}
                autoHeight
                pageSize={20}
                onRowClick={handleTableRowClick}
            />
        </ContentBody>
    )
}

export default FactoryList;
