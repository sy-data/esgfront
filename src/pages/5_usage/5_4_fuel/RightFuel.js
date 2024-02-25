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
  { field: 'year', headerName: '기준년도', flex: 2 },
  { field: 'name', headerName: '연료명', flex: 2 },
  { field: 'amount', headerName: '총에너지사용량(TOE)', flex: 2 },
];

const RightFuel = props => {
  const apiRef = useGridApiRef();

  return (
    <ContentBody>
      <SubTitle title={"에너지 사용량 정보"} />
        <CustomDataGrid
          data={props.baseData  ? Object.keys(props.baseData).map((data, index) => ({
              index: index + 1,
              id: index + 1,
              year: `${props.selectedYear}년`,
              name: props.baseData[data].name,
              amount: props.baseData[data].amount
            })) : []}
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

export default RightFuel;
