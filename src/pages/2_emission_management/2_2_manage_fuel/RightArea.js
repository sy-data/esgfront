import { useState, useEffect, useRef, useMemo } from "react";
import qs from "qs";
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

const CombustionManagement = () => {
  const pageSize = 20;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [combustionOptions, setCombustionOptions] = useState([]);
  const [industryTypeOptions, setIndustryTypeOptions] = useState([]);
  const [formulaOptions, setFormulaOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  const selectedFactoryId = useRecoilValue(SelectedFactoryId);

  useEffect(() => {
    // 배출활동 선택 목록 가져오기
    esgFetch(`/api/type-combustions`, 'GET')
    .then(response => response.json())
    .then(data => setCombustionOptions(data.data.map((v, i) => {
      return {
        id: v.id, type: v.attributes.type
      }
    })));

    // 산업군 선택 목록 가져오기
    esgFetch(`/api/type-industries`, 'GET')
    .then(response => response.json())
    .then(data => setIndustryTypeOptions(data.data.map((v, i) => { 
      return {
        id: v.id,
        type: v.attributes.type
      }
    })));

    // 산정식 선택 목록 가져오기
    esgFetch(`/api/formulas`, 'GET')
    .then(response => response.json())
    .then(data => setFormulaOptions(data.data.map((v, i) => {
      return {
        id: v.id,
        name: v.attributes.name,
        version: v.attributes.version
      }
    })));

    // 연료명 선택 목록 가져오기
    esgFetch(`/api/fuels`, 'GET')
    .then(response => response.json())
    .then(data => setFuelOptions(data.data.map((v, i) => { 
      return {
        id: v.id,
        name: v.attributes.name
      }
    })));
  }, []);

  // 시설 목록 가져오는 함수
  const fetchCombustions = async () => {
    setLoading(true);
    const url = `/api/combustions?filters[facility][factory][id][$eq]=${selectedFactoryId}&`;
    const query = qs.stringify({
      populate: [
        'facility',
        'facility.type_facility',
        'type',
        'facility.type_industry',
        'formula',
        'fuel',
        'combustion_regulation',
        'combustion_practice'
      ]
    })
    const response = await esgFetch(url+query, 'GET');
    if (response.ok) {
      const { data: value } = await response.json();
      console.log(value);
      const newData = value.map((v, i) => {
        return {
          index: i + 1,
          id: v.id,
          facility_id: v.attributes.facility.data.id,
          name: v.attributes.facility.data.attributes.name,
          facility: v.attributes.facility.data.attributes.type_facility.data.attributes.type,
          size: v.attributes.facility.data.attributes.size,
          combustion: v.attributes.type.data.attributes.type,
          industry_type: v.attributes.facility.data.attributes.type_industry.data.attributes.type,
          formula: v.attributes.formula.data.attributes.name,
          formula_version: v.attributes.formula.data.attributes.version,
          fuel_name: v.attributes.fuel.data.attributes.name,
          regulation: v.attributes.combustion_regulation.data.attributes.name,
          practice: v.attributes.combustion_practice.data.attributes.name,
        }
      });
      setData(newData);
    } else {
      console.error(`${response.status} ${response.statusText}`);
    }
  }

  // DataGrid에 데이터가 표시되면 로딩 상태 변경
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // 선택된 사업장이 바뀌면 사업장별 생산품 목록 조회
  useEffect(() => {
    fetchCombustions();
  }, [selectedFactoryId]);

  // 컬럼 속성
  const dummyColumns = useMemo(() => {
    return [
      { field: "name", headerName: "시설명", width: 150, editable: true }, // name
      { field: "facility", headerName: "배출시설", width: 150 }, // facility
      { field: "size", headerName: "규모", width: 150 }, // size
      { 
        field: "combustion", 
        headerName: "배출활동", 
        width: 150, 
        editable: true, 
        type: 'singleSelect',
        valueOptions: combustionOptions.map(combustion => combustion.type)
      }, // combustion의 type
      { 
        field: "industry_type", 
        headerName: "산업군", 
        width: 150, 
        editable: true,
        type: 'singleSelect',
        valueOptions: industryTypeOptions.map(industryType => industryType.type)
      }, // type_industry의 type
      { 
        field: "formula", 
        headerName: "산정식", 
        width: 150, 
        editable: true,
        type: 'singleSelect',
        valueOptions: formulaOptions.map(formula => formula.name)
      }, // combustions의 formula의 name
      { 
        field: "formula_version", 
        headerName: "산정식버전", 
        width: 150,
        // TODO: 산정식 Table에 데이터가 생기면 테스트 해봐야 함
        // valueGetter: (params) => formulaOptions.find(formula => formula.name === params.row.formula).version
      }, // combustions의 formula의 version
      { 
        field: "fuel_name", 
        headerName: "연료명", 
        width: 150, 
        editable: true,
        type: 'singleSelect',
        valueOptions: fuelOptions.map(fuel => fuel.name)
      }, // combustions의 fuel의 name
      { field: "regulation", headerName: "배출 규정등급", width: 150 }, // combustions의 regulation
      { field: "practice", headerName: "배출 적용등급", width: 150 }, // combustions의 practice
    ]
  }, [combustionOptions, industryTypeOptions, formulaOptions, fuelOptions]);
  

  // 저장 버튼 눌렀을 때
  const handleSaveButton = () => {
    console.log(updatedRows);
    let success = true;
    for (let row of updatedRows) {
      // 배출활동 수정
      const combustion_body = {
        data: {
          type: {
            id: combustionOptions.find(combustion => combustion.type === row.combustion).id
          },
          formula: {
            id: formulaOptions.find(formula => formula.name === row.formula).id
          },
          fuel: {
            id: fuelOptions.find(fuel => fuel.name === row.fuel_name).id
          }
        }
      }
      esgFetch(`/api/combustions/${row.id}`, 'PUT', combustion_body)
      .then(response => {
        if (!response.ok) {
          success = false;
        }
      });

      // 산업군 수정
      const facility_body = {
        data: {
          type_industry: {
            id: industryTypeOptions.find(industryType => industryType.type === row.industry_type).id
          }
        }
      }
      esgFetch(`/api/facilities/${row.facility_id}`, 'PUT', facility_body)
      .then(response => {
        if (!response.ok) {
          success = false;
        }
      });

    }
    if (success) {
      setUpdatedRows([]);
      fetchCombustions();
    }

  }

  // 행이 업데이트 되었을 때
  const processRowUpdate = (updatedRowData) => {
    // 기존 행이 수정된 경우
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
    const newData = data.map((data) => {
      if (updatedRowData.id === data.id) {
        return updatedRowData;
      }
      return data;
    });
    setData(newData);
    return updatedRowData;
  }

  return (
    <ContentBody>
      <SubTitle title={"시설 정보"}>
        <SearchButtonContainer>
          <Button variant="outlined" size="small" color="btnSearch" onClick={handleSaveButton} disabled={updatedRows.length === 0}>저장</Button>
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

export default CombustionManagement;
