import { useState, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { Button, styled } from "@mui/material"
import { useGridApiRef } from "@mui/x-data-grid"
import { LinearProgress } from "@mui/material"
import SubTitle from "../../../components/SubTitle"
import ContentBody from "../../../components/ContentBody"
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { SelectedFormular } from "./States"

const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
}));

const CombustionManagement = () => {
  const pageSize = 5;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedRows, setAddedRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const setSelectedFormular = useSetRecoilState(SelectedFormular);

  const fetchFormulas = () => {
    gridApiRef.current.setRowSelectionModel([]);
    // TODO: backend와 연결 필요
    console.log("fetch formulas");
    const dummyData = [
      { index: 1, id: 1, name: '산정식1', combustion_id: 1 },
      { index: 2, id: 2, name: '산정식2', combustion_id: 2 },
      { index: 3, id: 3, name: '산정식3', combustion_id: 3 },
      { index: 4, id: 4, name: '산정식4', combustion_id: 4 },
      { index: 5, id: 5, name: '산정식5', combustion_id: 5 },
      { index: 6, id: 6, name: '산정식6', combustion_id: 6 },
      { index: 7, id: 7, name: '산정식7', combustion_id: 7 },
    ]

    setData(dummyData);
  }

  useEffect(() => {
    fetchFormulas();
  }, []);

  useEffect(() => {
    if(data) {
      setLoading(false);
    }
  }, [data]);

  const dummyColumns = [
    { field: 'index', headerName: '', width: 50 },
    { field: 'id', headerName: '산정식ID', flex: 1, editable: true },
    { field: 'name', headerName: '산정식명', flex: 1, editable: true },
    { field: 'combustion_id', headerName: '배출활동ID', flex: 1, editable: true },
  ]
  
  const handleAddButton = () => {
    const newRow = {
      index: data.length + 1,
      id: data.length + 1,
      name: "",
      combustion_id: 0,
    }
    setAddedRows([...addedRows, newRow]);
    setData([...data, newRow]);
    gridRef.current.focusRow(newRow);
  }

  const handleSaveButton = () => {
    const invalidData = data.filter(row => 
      row.id === "" ||
      row.name === "" || 
      row.combustion_id === 0
    );
    if (invalidData.length > 0) {
      alert("빈 칸을 모두 채워주세요.");
      return;
    }

    for (let row of addedRows) {
      // TODO: backend 추가
      console.log("added formulas: ", row);
    }
    setAddedRows([]);

    for (let row of updatedRows) {
      // TODO: backend 추가
      console.log("updated formulas: ", row);
    }
    setUpdatedRows([]);
    
    fetchFormulas();
  }

  const handleDeleteButton = () => {
    const selectedIds = [...gridApiRef.current.getSelectedRows().values()].map(row => row.id);
    for (let id of selectedIds) {
      // TODO: backend 추가
      console.log("deleted formula id: ", id);
    }
    fetchFormulas();
  }

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

  const onRowClick = (params) => {
    setSelectedFormular(params.row);
  }

  return (
    <ContentBody>
      <SubTitle title={"배출활동 정보"} />
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
        editMode="row"
        processRowUpdate ={processRowUpdate}
        onProcessRowUpdate={(error) => {console.error(error)}}
        onRowClick={onRowClick}
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

export default CombustionManagement;
