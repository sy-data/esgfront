import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid.js";
import { SearchButtonContainer } from "../../../components/Styles";
import { esgFetch } from "../../../components/FetchWrapper.js";
import { SelectedFactoryId } from "./States";


const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 생산품 정보가 없습니다.</div>
    </div>
  )
}

const ProductManagement = () => {
  const pageSize = 20;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedRows, setAddedRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [units, setUnits] = useState([]);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const selectedFactoryId = useRecoilValue(SelectedFactoryId);

  // 생산품 목록 가져오는 함수
  const fetchProducts = async () => {
    setLoading(true);
    const url = `/api/products?filters[factory][id][$eq]=${selectedFactoryId}&populate=unit`;
    const response = await esgFetch(url, 'GET');
    if (response.ok) {
      const { data: value } = await response.json();
      const newData = value.map((v, i) => {
        return {
          index: i + 1,
          id: v.id,
          name: v.attributes.name,
          unit: v.attributes.unit.data.attributes.type,
          rate: v.attributes.rate,
          description: v.attributes.description
        }
      });
      setData(newData);
    } else {
      console.error(`${response.status} ${response.statusText}`);
    }
  }

  // ton으로 시작하는 단위 목록 가져오는 함수
  useEffect(() => {
    const url = `/api/type-units?filters[type][$contains]=ton`;
    esgFetch(url, 'GET').then(response => {
      if (response.ok) {
        response.json().then(({data: values}) => {
          const listOfUnits = values.map(value => {
            return {id: value.id, type: value.attributes.type}
          });
          setUnits(listOfUnits);
        })
      }
    });
  }, []);

  // DataGrid에 데이터가 표시되면 로딩 상태 변경
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // 선택된 사업장이 바뀌면 사업장별 생산품 목록 조회
  useEffect(() => {
    fetchProducts();
  }, [selectedFactoryId]);

  // 컬럼 속성
  const dummyColumns = [
    { field: "name", headerName: "생산품명", flex: 2, editable: true },
    { field: "unit", headerName: "단위", flex: 1, type: 'singleSelect', editable: true, valueOptions: units.map(unit => unit.type) },
    { 
      field: "rate", 
      headerName: "비율", 
      flex: 1, 
      editable: true, 
      type: 'number',
      valueParser: (value) => {
        if (value < 0) {
          return 0;
        }
        if (value > 100) {
          return 100;
        }
        return value;
      }
    }, // TODO: 음수로 입력되는 것 방지
    { field: "description", headerName: "비고", flex: 2, editable: true },
  ]

  // 백엔드에 저장하기 전에 사용할 random id 생성 함수
  const generateRandomId = () => {
    let randomId;
    const max = 100000;
    const min = 1;
    do {
      randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (data.map(row => row.id).includes(randomId));
    return randomId;
  }

  // 신규 버튼 눌렀을 때
  const handleAddButton = () => {
    const newRow = {
      index: data.length + 1,
      id: generateRandomId(),
      name: "",
      unit: units[0].type,
      rate: 0,
      description: "",
    }
    setAddedRows([...addedRows, newRow]);
    setData([...data, newRow]);
    gridRef.current.focusRow(newRow);
  }

  // 저장 버튼 눌렀을 때
  const handleSaveButton = async () => {
    const sum = data.reduce((acc, cur) => acc + cur.rate, 0);
    console.log(sum);
    if (sum > 100) {
      alert("생산품 비율의 총 합은 100을 초과할 수 없습니다.");
      return;
    }
    const noNameData = data.filter(row => row.name.length === 0);
    if (noNameData.length > 0) {
      alert("생산품명을 입력해주세요.");
      gridRef.current.focusRow(noNameData[0]);
      return;
    }

    // Transaction 처리 필요
    for (let row of addedRows) {
      const body = {
        data: {
          name: row.name,
          rate: row.rate,
          description: row.description,
          factory: {
            id: selectedFactoryId
          },
          unit: {
            id: units.filter(unit => unit.type === row.unit)[0].id
          }
        }
      }
      const response = await esgFetch('/api/products', 'POST', body);
      if (!response.ok) {
        alert("생산품 정보를 저장하는데 실패했습니다.");
        return;
      }
    }
    setAddedRows([]);

    for (let row of updatedRows) {
      const body = {
        data: {
          name: row.name,
          rate: row.rate,
          description: row.description,
          unit: {
            id: units.filter(unit => unit.type === row.unit)[0].id
          }
        }
      }
      const response = await esgFetch(`/api/products/${row.id}`, 'PUT', body);
      if (!response.ok) {
        alert("생산품 정보를 저장하는데 실패했습니다.");
        return;
      }
      setUpdatedRows([]);
    }

    fetchProducts();
  }

  // 삭제 버튼 눌렀을 때 삭제 다이얼로그 열기
  const handleDeleteButton = () => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    if (selectedRows.length === 0) {
      alert("삭제할 생산품을 선택하지 않았습니다.");
      return;
    }
    setOpenDeleteDialog(true);
  }

  // 삭제 다이얼로그에서 삭제 버튼 눌렀을 때 DELETE 요청 전송
  const handleDeleteDialog = () => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    const selectedIds = [...selectedRows.values()].map(row => row.id);
    for (let id of selectedIds) {
      esgFetch(`/api/products/${id}`, 'DELETE').then(response => {
        if (response.ok) {
          fetchProducts();
          gridApiRef.current.setRowSelectionModel([]);
        }
      })
    }
    setOpenDeleteDialog(false);
  }

  // 행이 업데이트 되었을 때 addedRow와 updatedRow에 추가
  const processRowUpdate = (updatedRowData) => {
    if (updatedRowData.name === '' && addedRows.map(row => row.id).includes(updatedRowData.id)) { // 새로운 행이 추가된 후 아무 입력도 없이 포커스를 잃었을 때
      const newAddedRows = addedRows.filter(addedRow => addedRow.id !== updatedRowData.id);
      setAddedRows(newAddedRows);
      const newData = data.filter(data => data.id !== updatedRowData.id);
      setData(newData);
      return updatedRowData;
    }

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
      if (updatedRowData .id === data.id) {
        return updatedRowData ;
      }
      return data;
    });
    setData(newData);
    return updatedRowData ;
  }

  return (
    <ContentBody>
      <SubTitle title={"사업장별 생산품 관리"}>
        <SearchButtonContainer>
          <Button variant="outlined" size="small" color="btnSearch" onClick={handleAddButton} disabled={selectedFactoryId === null}>신규</Button>
          <Button variant="outlined" size="small" color="btnSearch" onClick={handleSaveButton} disabled={selectedFactoryId === null}>저장</Button>
          <Button variant="outlined" size="small" color="btnSearch" onClick={handleDeleteButton} disabled={selectedFactoryId === null}>삭제</Button>
        </SearchButtonContainer>
      </SubTitle>
      <CustomDataGrid
        apiRef={gridApiRef}
        ref={gridRef}
        data={data}
        columns={dummyColumns}
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => { console.error(error) }}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        setLoading={setLoading}
        checkboxSelection={true}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={pageSize}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          시설정보 삭제하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            선택하신 생산품 정보를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>취소</Button>
          <Button onClick={handleDeleteDialog} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </ContentBody>
  )
}

export default ProductManagement;
