import { useState, useEffect, useRef } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Button, styled } from "@mui/material"
import { useGridApiRef } from "@mui/x-data-grid"
import { LinearProgress } from "@mui/material"
import SubTitle from "../../../components/SubTitle"
import ContentBody from "../../../components/ContentBody"
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { SelectedFormular, SelectedFuels, MappingFuelChangeFlag } from "./States"

const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
}));

const FuelManagement = () => {
  const pageSize = 5;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedRows, setAddedRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const selectedFormular = useRecoilValue(SelectedFormular);
  const mappingFuelChangeFlag = useRecoilValue(MappingFuelChangeFlag);
  const setSelectedFuels = useSetRecoilState(SelectedFuels);

  const fetchFuels = () => {
    gridApiRef.current.setRowSelectionModel([]);
    // TODO: backend와 연결 필요
    console.log("fetch fuels");
    const dummyData = [
      { index: 1, id: 1, code: 1, name: '연료1' },
      { index: 2, id: 2, code: 2, name: '연료2' },
      { index: 3, id: 3, code: 3, name: '연료3' },
      { index: 4, id: 4, code: 4, name: '연료4' },
      { index: 5, id: 5, code: 5, name: '연료5' },
      { index: 6, id: 6, code: 6, name: '연료6' },
      { index: 7, id: 7, code: 7, name: '연료7' },
    ]

    setData(dummyData);
  }

  useEffect(() => {
    fetchFuels();
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
    { field: 'code', headerName: '연료코드', flex: 1, editable: true},
    { field: 'name', headerName: '연료명', flex: 1, editable: true},
  ]

  // 추가 버튼이 눌리면 새로운 row를 추가하고 포커스를 맞춤
  const handleAddButton = () => {
    const newRow = {
      index: data.length + 1,
      id: data.length + 1,
      code: data.length + 1,
      name: '',
    }
    setAddedRows([...addedRows, newRow]);
    setData([...data, newRow]);
    gridRef.current.focusRow(newRow);
  }

  // 저장 버튼이 눌리면 추가된 행과 수정된 행을 backend로 전송 후 fetch 해옴
  const handleSaveButton = () => {
    const invalidData = data.filter(row =>
      row.id === "" || 
      row.code === "" || 
      row.name === ""
    );
    if (invalidData.length > 0) {
      alert("빈 칸을 모두 채워주세요")
      return;
    }

    for (let row of addedRows) {
      // TODO: backend 추가
      console.log("added fuels: ", row);
    }

    for (let row of updatedRows) {
      // TODO: backend 추가
      console.log("updated fuels: ", row);
    }
    setUpdatedRows([]);
    fetchFuels();
  }

  // 삭제 버튼이 눌리면 선택된 행을 삭제하고 backend로 전송 및 fetch 실행
  const handleDeleteButton = () => {
    const selectedRows = [...gridApiRef.current.getSelectedRows().values()]
    setData(data.filter(row => !selectedRows.includes(row)));
  }

  // 행이 수정되거나 추가되면, 추가된 행과 수정된 행을 각각의 state에 저장하고 data를 업데이트
  const processRowUpdate = (updatedRowData) => {
    if (addedRows.map(row => row.id).includes(updatedRowData.id)) { // 새로운 행이 추가된 후 수정된 경우
      const newAddedRows = addedRows.map(addedRow => {
        if (updatedRowData.id === addedRow.id) {
          return updatedRowData;
        }
        return addedRow;
      });
      setAddedRows(newAddedRows);
    } else { // 기존 행이 수정된 경우
      const updatedRowsId = updatedRows.map(row => row.id);
      if (!updatedRowsId.includes(updatedRowData.id)) {
        setUpdatedRows([...updatedRows, updatedRowData]);
      } else {
        const newUpdatedRows = updatedRows.map(row => {
          if (row.id === updatedRowData.id) {
            return updatedRowData;
          }
          return row;
        });
        setUpdatedRows(newUpdatedRows);
      }
    }
    const newData = data.map((data) => {
      if (data.id === updatedRowData.id) {
        return updatedRowData;
      }
      return data;
    });
    setData(newData);
    return updatedRowData;
  }

  // 선택된 행이 변경되면, 선택된 행을 recoil state에 저장
  const handleSelectedFuelChange = () => {
    const selectedRows = [...gridApiRef.current.getSelectedRows().values()]
    setSelectedFuels(selectedRows);
  }

  return (
    <ContentBody>
      <SubTitle title={"연료정보"} />
      <ButtonContainer>
        <Button variant="outlined" size="samll" color="btnSearch" onClick={handleAddButton}>
          추가
        </Button>
        <Button variant="outlined" size="samll" color="btnSearch" onClick={handleSaveButton}>
          저장
        </Button>
        <Button variant="outlined" size="samll" color="btnSearch" onClick={handleDeleteButton}>
          삭제
        </Button>
      </ButtonContainer>
      <CustomDataGrid
        apiRef={gridApiRef}
        ref={gridRef}
        data={data}
        columns={dummyColumns}
        checkboxSelection={true}
        editMode="row"
        processRowUpdate ={processRowUpdate}
        onProcessRowUpdate={(error) => {console.error(error)}}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        setLoading={setLoading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={pageSize}
      />
    </ContentBody>
  )
}

export default FuelManagement;
