import { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGridApiRef } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { SelectedFormular, SelectedMappingFuels, MappingFuelChangeFlag } from "./States";

const FuelManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const selectedFormular = useRecoilValue(SelectedFormular);
  const mappingFuelChangeFlag = useRecoilValue(MappingFuelChangeFlag);
  const setSelectedMappingFuels = useSetRecoilState(SelectedMappingFuels);

  const fetchMappingFuels = () => {
    gridApiRef.current.setRowSelectionModel([]);
    // TODO: backend와 연결 필요
    console.log("fetch mapping fuels");
    const dummyData = [
        { id: 1, code: '연료1', name: '연료1' },
        { id: 2, code: '연료2', name: '연료2' },
        { id: 3, code: '연료3', name: '연료3' },
        { id: 4, code: '연료4', name: '연료4' },
        { id: 5, code: '연료5', name: '연료5' },
        { id: 6, code: '연료6', name: '연료6' },
        { id: 7, code: '연료7', name: '연료7' },
    ]

    setData(dummyData);
  }

  useEffect(() => {
    fetchMappingFuels();
  }, [selectedFormular, mappingFuelChangeFlag]);

  // data를 받아오면 loading을 false로 변경
  useEffect(() => {
    if(data) {
      setLoading(false);
    }
  }, [data]);
  
  // gridApiRef가 datagrid를 받아오면 rowSelectionChange 이벤트를 구독
  useEffect(() => {
    gridApiRef.current && gridApiRef.current.subscribeEvent(
      'rowSelectionChange',
      handleSelectedFuelChange,
    );
  }, [gridApiRef]);

  const dummyColumns = [
    { field: 'id', headerName: '', width: 50 },
    { field: 'code', headerName: '연료코드', flex: 1 },
    { field: 'name', headerName: '연료명', flex: 1},
  ]

  // 선택된 행이 변경되면, 선택된 행을 recoil state에 저장
  const handleSelectedFuelChange = () => {
    const selectedRows = [...gridApiRef.current.getSelectedRows().values()];
    setSelectedMappingFuels(selectedRows);
  }

  return (
    <ContentBody>
      <SubTitle title={"매핑 정보"} />
      <CustomDataGrid
        apiRef={gridApiRef}
        ref={gridRef}
        data={data}
        columns={dummyColumns}
        checkboxSelection={true}
        editMode="row"
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        setLoading={setLoading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={7}
      />
    </ContentBody>
  )
}

export default FuelManagement;
