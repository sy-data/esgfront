import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  LinearProgress,
  Box
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
      <div style={{ fontSize: '16px' }}>조회 된 시설 정보가 없습니다.</div>
    </div>
  )
}

const ProductManagement = () => {
  const pageSize = 20;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedRows, setAddedRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const selectedFactoryId = useRecoilValue(SelectedFactoryId);

  const dummyData = [
    { index: 1, id: 1, name: '내연발전기', type_facility: '발전용 내연기관', size: 'A그룹', activity: '액체연료연소', type_industry: '제조업/건설업', formula: '액체연료연소', formula_version: 1, fuel_name: '가스/디젤 오일(경유', level_1: 'Tier 1', level_2: 'Tier 1'},
    { index: 2, id: 2, name: '내연발전기', type_facility: '발전용 내연기관', size: 'A그룹', activity: '액체연료연소', type_industry: '제조업/건설업', formula: '액체연료연소', formula_version: 1, fuel_name: '가스/디젤 오일(경유', level_1: 'Tier 1', level_2: 'Tier 1'},
    { index: 3, id: 3, name: '내연발전기', type_facility: '발전용 내연기관', size: 'A그룹', activity: '액체연료연소', type_industry: '제조업/건설업', formula: '액체연료연소', formula_version: 1, fuel_name: '가스/디젤 오일(경유', level_1: 'Tier 1', level_2: 'Tier 1'},
  ]

  // 시설 목록 가져오는 함수
  const fetchFacilities = async () => {
    setLoading(true);
    setData(dummyData);
    // TODO: 시설 정보 불러오는 부분 Backend 변경되면 연결하기
    // const url = `/api/facilities?filters[factory][id][$eq]=${selectedFactoryId}`;
    // const response = await esgFetch(url, 'GET');
    // if (response.ok) {
    //   const { data: value } = await response.json();
    //   const newData = value.map((v, i) => {
    //     return {
    //       index: i + 1,
    //       id: v.id,
    //       name: v.attributes.name,
    //       unit: 'ton',
    //       rate: v.attributes.rate,
    //       description: v.attributes.description
    //     }
    //   });
    //   setData(newData);
    // } else {
    //   console.error(`${response.status} ${response.statusText}`);
    // }
  }

  // DataGrid에 데이터가 표시되면 로딩 상태 변경
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // 선택된 사업장이 바뀌면 사업장별 생산품 목록 조회
  useEffect(() => {
    fetchFacilities();
  }, [selectedFactoryId]);

  // 컬럼 속성
  const dummyColumns = [
    { field: "name", headerName: "시설명", width: 150, editable: true },
    { field: "type_facility", headerName: "배출시설", width: 150 },
    { field: "size", headerName: "규모", width: 150, editable: true },
    { field: "activity", headerName: "배출활동", width: 150, editable: true },
    { field: "type_industry", headerName: "산업군", width: 150, editable: true },
    { field: "formula", headerName: "산정식", width: 150, editable: true },
    { field: "formula_version", headerName: "산정식버전", width: 150, editable: true },
    { field: "fuel_name", headerName: "연료명", width: 150, editable: true },
    { field: "level_1", headerName: "배출 규정등급", width: 150, editable: true },
    { field: "level_2", headerName: "배출 적용등급", width: 150, editable: true },
  ]

  // 저장 버튼 눌렀을 때
  const handleSaveButton = () => {
    // for (let row of addedRows) {
    //   const body = {
    //     data: {
    //       name: row.name,
    //       rate: row.rate,
    //       description: row.description,
    //       factory: {
    //         id: selectedFactoryId
    //       },
    //       // TODO: 단위(unit) 추가 필요
    //     }
    //   }
    //   esgFetch('/api/facilities', 'POST', body).then(response => {
    //     if (response.ok) setAddedRows([]);
    //   });
    // }

    // for (let row of updatedRows) {
    //   const body = {
    //     data: {
    //       name: row.name,
    //       rate: row.rate,
    //       description: row.description,
    //     }
    //   }
    //   esgFetch(`/api/facilities/${row.id}`, 'PUT', body).then(response => {
    //     if (response.ok) setUpdatedRows([]);
    //   });
    // }

    // fetchFacilities();
  }

  // 행이 업데이트 되었을 때
  const processRowUpdate = (row) => {
    // 기존 행이 수정된 경우
    const updatedRowsId = updatedRows.map(row => row.id);
    if (!updatedRowsId.includes(row.id)) {
      setUpdatedRows([...updatedRows, row]);
    } else {
      const newUpdatedRows = updatedRows.map(row => {
        if (row.id === row.id) {
          return row;
        }
        return row;
      });
      setUpdatedRows(newUpdatedRows);
    }
    const newData = data.map((data) => {
      if (row.id === data.id) {
        return row;
      }
      return data;
    });
    setData(newData);
    return row;
  }

  return (
    <ContentBody>
      <SubTitle title={"시설 정보"}>
        <SearchButtonContainer>
          <Button variant="outlined" size="small" color="btnSearch" onClick={handleSaveButton} disabled={selectedFactoryId === null}>저장</Button>
        </SearchButtonContainer>
      </SubTitle>
      <Box sx={{overflow: 'auto', width: '950px'}}>
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
      </Box>
    </ContentBody>
  )
}

export default ProductManagement;
