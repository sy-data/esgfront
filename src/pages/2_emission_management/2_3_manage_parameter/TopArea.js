import { useState, useEffect, useRef, useMemo } from "react";
import qs from "qs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Button,
  LinearProgress,
  Box
} from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid.js";
import { esgFetch } from "../../../components/FetchWrapper.js";
import { SelectedYear, SelectedFactoryId, SelectedCombustionId } from "./States";


const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 시설 정보가 없습니다.</div>
    </div>
  )
}

const ParameterManagement = () => {
  const pageSize = 20;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);
  const selectedYear = useRecoilValue(SelectedYear);
  const selectedFactoryId = useRecoilValue(SelectedFactoryId);
  const setSelectedCombustionId = useSetRecoilState(SelectedCombustionId);

  // 배출활동 목록 가져오는 함수
  const fetchCombustions = async () => {
    setLoading(true);
    const url = `/api/combustions?filters[facility][factory][id][$eq]=${selectedFactoryId}&`
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
      ],
      filters: {
        facility: {
          createdAt: {
            $gte: `${selectedYear}-01-01`,
            $lte: `${selectedYear}-12-31`
          }
        }
      }
    });
    const response = await esgFetch(url+query, 'GET');
    if (response.ok) {
      const { data: value } = await response.json();
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
    if(selectedFactoryId && selectedYear) {
      fetchCombustions();
    }
  }, [selectedFactoryId, selectedYear]);

  // 컬럼 속성
  const dummyColumns = useMemo(() => {
    return [
      { field: "name", headerName: "시설명", flex: 1},
      { field: "facility", headerName: "배출시설", flex: 1}, 
      { field: "size", headerName: "규모", flex: 1},
      { field: "combustion", headerName: "배출활동", flex: 1}, 
      { field: "industry_type", headerName: "산업군", flex: 1}, 
      { field: "formula", headerName: "산정식", flex: 1}, 
      { field: "formula_version", headerName: "산정식버전", flex: 1}, 
      { field: "fuel_name", headerName: "연료명", flex: 1},
      { field: "regulation", headerName: "배출 규정등급", flex: 1},
      { field: "practice", headerName: "배출 적용등급", flex: 1},
    ]
  }, []);

  return (
    <ContentBody>
      <SubTitle title={"배출활동 목록"}>
      </SubTitle>
      <Box>
        <CustomDataGrid
          apiRef={gridApiRef}
          ref={gridRef}
          data={data}
          columns={dummyColumns}
          editable={false}
          slots={{
            noRowsOverlay: NoRowsOverlay,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          setLoading={setLoading}
          disableColumnMenu={true}
          columnHeaderHeight={40}
          onRowClick={(params) => setSelectedCombustionId(params.row.id)}
          rowHeight={30}
          autoHeight
          pageSize={pageSize}
        />
      </Box>
    </ContentBody>
  )
}

export default ParameterManagement;