import qs from "qs";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useGridApiRef } from "@mui/x-data-grid";
import { LinearProgress, Button } from "@mui/material";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid.js";
import { SelectedCombustionId } from "./States";
import { esgFetch } from "../../../components/FetchWrapper.js";

const NoRowsOverlay = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
            <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
        </div>
    )
}

const CombustionList = () => {
    const apiRef = useGridApiRef();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedRows, setUpdatedRows] = useState([]);

    const selectedCombustionId = useRecoilValue(SelectedCombustionId);

    // 파라미터 목록 불러오기
    const fetchParameters = async () => {
        setLoading(true);
        const url = `/api/parameters?filters[combustion][id][$eq]=${selectedCombustionId}&`;
        const query = qs.stringify({
            populate: [
                'combustion_regulation',
                'combustion_practice',
                'unit',
            ]
        });
        const response = await esgFetch(url + query, 'GET');
        if (response.ok) {
            const { data: value } = await response.json();
            const newData = value.map((v, i) => {
                return {
                    index: i + 1,
                    id: v.id,
                    name: v.attributes.name,
                    input_type: v.attributes.input_type,
                    combustion_regulation: v.attributes.combustion_regulation.data.attributes.name,
                    combustion_practice: v.attributes.combustion_practice.data.attributes.name,
                    version: v.attributes.version,
                    value: v.attributes.value,
                    unit: v.attributes.unit.data.attributes.type,
                    uncertainty: v.attributes.uncertainty
                }
            });
            setData(newData);
        }
    }

    // 파라미터 목록 조회
    useEffect(() => {
        fetchParameters();
    }, [selectedCombustionId]);

    // DataGrid에 데이터가 표시되면 로딩 상태 변경
    useEffect(() => {
        setLoading(false);
    }, [data])

    // 저장 버튼 눌렀을 때
    const handleSaveButton = async () => {
        let success = true;
        for (let row of updatedRows) {
            const body = {
                data: {
                    version: row.version,
                    uncertainty: row.uncertainty
                }
            }
            const response = await esgFetch(`/api/parameters/${row.id}`, 'PUT', body);
            if (!response.ok) {
                success = false;
                break;
            }
        }
        if (success) {
            setUpdatedRows([]);
        }
    }

    // 행이 업데이트 되었을 때
    const processRowUpdate = (updatedRowData) => {
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

    const dummyColumns = [
        { field: 'name', headerName: '파라미터', flex: 1 },
        { field: 'input_type', headerName: '입력구분', flex: 1 },
        { field: 'combustion_regulation', headerName: '배출규정등급', flex: 1 },
        { field: 'combustion_practice', headerName: '배출적용등급', flex: 1 },
        {
            field: 'version',
            headerName: '파라미터 버전',
            flex: 1,
            type: 'singleSelect',
            valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            editable: true
        },
        { field: 'value', headerName: '파라미터 값', flex: 1 },
        { field: 'unit', headerName: '단위', flex: 1 },
        {
            field: 'uncertainty',
            headerName: '불확도(%)',
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
        },
    ]

    return (
        <ContentBody>
            <SubTitle title={"파라미터 정보"}>
                <Button variant="outlined" size="small" color="btnSearch" onClick={handleSaveButton}>저장</Button>
            </SubTitle>
            <CustomDataGrid
                data={data}
                apiRef={apiRef}
                columns={dummyColumns}
                editable={false}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => { console.error(error) }}
                slots={{
                    noRowsOverlay: NoRowsOverlay,
                    loadingOverlay: LinearProgress,
                }}
                disableRowSelectionOnClick
                loading={loading}
                disableColumnMenu={true}
                columnHeaderHeight={40}
                rowHeight={30}
                autoHeight
                pageSize={5}
            />
        </ContentBody>
    )
}

export default CombustionList;
