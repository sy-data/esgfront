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
    { field: '1', headerName: '기준년도', flex: 2 },
    { field: '2', headerName: '법인명', flex: 2 },
    { field: '3', headerName: '배출 목표', flex: 2 },
    { field: '4', headerName: '실제 배출량', flex: 2 },
    { field: '5', headerName: '배출량 차이', flex: 2 },
    { field: '6', headerName: '달성률(%)', flex: 2 },
]

const DownCompanyUsage = props => {
    const apiRef = useGridApiRef();

    return (
        <ContentBody>
            <SubTitle title={"법인 연단위 성과현황"} />
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

export default DownCompanyUsage;
