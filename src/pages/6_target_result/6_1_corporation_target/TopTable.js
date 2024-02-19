import React, {useMemo} from 'react';
import {SearchButtonContainer} from "../../../components/Styles";
import {Box, Button, LinearProgress} from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import ContentBody from "../../../components/ContentBody";
import {months, monthsArray} from "./constants";
import styled from '@emotion/styled'
import {esgFetch} from "../../../components/FetchWrapper";

const NoRowsOverlay = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
            <div style={{ fontSize: '16px' }}>조회 된 시설 정보가 없습니다.</div>
        </div>
    )
}

const TableContainer = styled(ContentBody)`
  flex: 1;
  display: flex;
`;

const TopTable = (props) => {
    const pageSize = 10;

    const dummyColumns = useMemo(() => {
        return [
            {
                field: "companyName",
                headerName: "법인명",
                flex: 1,
                valueGetter: (params) => params.value.name,
            },
            ...(monthsArray.map(([_, value]) => {
                return {
                    valueGetter: (params) => params.value.value,
                    field: `${value}_field`,
                    headerName: `${value}월`,
                    flex: 1,
                    editable: true,
                }
            }))
        ]
    }, []);

    const handleSaveButton = async() => {
        const promises = [];

        props.data.forEach((item) => {
            Object.entries(item).forEach(([key, value]) => {
                if (['companyName', 'baseYear', 'id'].includes(key) || value.status === 'saved') return;

                const requestBody = {
                    data: {
                        company: { id: item.companyName.id },
                        date: `${item.baseYear}-${value.month}-01`,
                        value: value.value,
                    }
                }

                if (value.status === 'new' && value.value) promises.push(esgFetch(`/api/company-goals`, 'POST', requestBody));
                if (value.status === 'edit' && value.value) promises.push(esgFetch(`/api/company-goals/${value.id}`, 'PUT', requestBody));
                if (value.status === 'edit' && value.value === '') promises.push(esgFetch(`/api/company-goals/${value.id}`, 'DELETE', requestBody));
            })
        });

        const result = await Promise.all(promises);
        const isError = result.some(item => !item.ok);
        if (isError) alert('일부 법인 계획 설정 정보를 저장하는 중 오류가 발생하였습니다.')
        else alert('저장이 완료되었습니다.');

        props.onSave && props.onSave();
    };

    const processRowUpdate = (updatedRowData) => {
        props.setCompanyTargetData(prev => prev.map(item => {
            Object.entries(updatedRowData).forEach(([key, value]) => {
                if (['companyName', 'baseYear', 'id'].includes(key) || item[key].value === value) return;
                item[key] = { ...item[key], value, status: item[key].status === 'saved' ? 'edit' : item[key].status }
            });

            return item;
        }));

        return updatedRowData;
    };

    return (
        <TableContainer>
            <SubTitle title={"법인 계획 설정"}>
                <SearchButtonContainer>
                    <Button
                        variant="outlined"
                        size="small"
                        color="btnSearch"
                        onClick={handleSaveButton}
                    >
                        저장
                    </Button>
                </SearchButtonContainer>
            </SubTitle>

            <Box sx={{width: '100%'}}>
                <CustomDataGrid
                    data={props.data}
                    columns={dummyColumns}
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => { console.error(error) }}
                    slots={{
                        noRowsOverlay: NoRowsOverlay,
                        loadingOverlay: LinearProgress,
                    }}
                    loading={props.loading}
                    disableColumnMenu={true}
                    columnHeaderHeight={40}
                    rowHeight={30}
                    autoHeight
                    pageSize={pageSize}
                />
            </Box>
        </TableContainer>
    )
}

export default TopTable;
