import { useState, useEffect } from "react";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "./CustomDataGrid.js";
import { SearchButtonContainer } from "../../../components/Styles";
import { Button } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";


const NoRowsOverlay = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
            <div style={{ fontSize: '16px' }}>조회 된 생산품 정보가 없습니다.</div>
        </div>
    )
}

const ProductManagement = () => {
    const apiRef = useGridApiRef();
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [newRowId, setNewRowId] = useState(null);

    // TODO: 나중에 삭제해야 함
    useEffect(() => {
        console.log(apiRef);
    }, [apiRef])

    // TODO: 서버에서 데이터 가져오는 로직 추가
    useEffect(() => {
        setData([
            { id: 1, productName: "쓸모있는거", unit: "ton", rate: 40, etc: "안녕하세요" },
            { id: 2, productName: "쓸모있을까", unit: "ton", rate: 10, etc: "저는" },
            { id: 3, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 4, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 5, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 6, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 7, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 8, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 9, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 10, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 11, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 12, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
            { id: 13, productName: "예쁜쓰레기", unit: "ton", rate: 20, etc: "오지환입니다." },
        ]);
    }, []);

    // 컬럼 속성
    const dummyColumns = [
        { field: "productName", headerName: "생산품명", flex: 2, editable: true },
        { field: "unit", headerName: "단위", flex: 1 },
        { field: "rate", headerName: "비율", flex: 1, editable: true },
        { field: "etc", headerName: "비고", flex: 2, editable: true },
    ]

    // 신규 버튼 눌렀을 때
    const handleAddButton = () => {
        const newRow = {
            id: rows.length + 1,
            productName: "",
            unit: "ton",
            rate: 0,
            etc: "",
        }
        setRows([...rows, newRow]);
        setNewRowId(newRow.id);
    }

    // 저장 버튼 눌렀을 때
    const handleSaveButton = () => {
        const updatedRows = apiRef.current.getRowModels();
        let sum = 0;
        for (const [id, row] of updatedRows.entries()) {
            sum += row.rate;
            if (row.productName.length === 0) {
                alert("생산품명을 입력해주세요.");
                apiRef.current.startRowEditMode({ id: id });
                apiRef.current.setCellFocus(id, "productName");
                return;
            }
        }
        if (sum > 100) {
            alert("생산품 비율의 총 합은 100을 초과할 수 없습니다.");
            return;
        }
        // TODO: 서버에 저장하는 로직 추가
    }

    // 삭제 버튼 눌렀을 때
    const handleDeleteButton = () => {
        const selectedRows = apiRef.current.getSelectedRows();
        if (selectedRows.length === 0) {
            alert("삭제할 생산품을 선택하지 않았습니다.");
            return;
        }
        const selectedIds = [...selectedRows.keys()]
        const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
        setRows(updatedRows); // TODO: 서버에서 삭제하는 로직 추가
    }

    useEffect(() => {
        if (newRowId) {
            apiRef.current.startRowEditMode({ id: newRowId });
            apiRef.current.setCellFocus(newRowId, "productName");
            setNewRowId(null);
        }
    }, [newRowId]);

    return (
        <ContentBody>
            <SubTitle title={"사업장별 생사품 관리"}>
                <SearchButtonContainer>
                    <Button variant="outlined" size="small" color="btnSearch" onClick={handleAddButton}>신규</Button>
                    <Button variant="outlined" size="small" color="btnSearch" onClick={handleSaveButton}>저장</Button>
                    <Button variant="outlined" size="small" color="btnSearch" onClick={handleDeleteButton}>삭제</Button>
                </SearchButtonContainer>
            </SubTitle>
            <CustomDataGrid
                data={data}
                apiRef={apiRef}
                columns={dummyColumns}
                editMode="row"
                slots={{ noRowsOverlay: NoRowsOverlay }}
                checkboxSelection={true}
                disableColumnMenu={true}
                columnHeaderHeight={40}
                rowHeight={30}
                autoHeight
                pageSize={5}
            />
        </ContentBody>
    )
}

export default ProductManagement;
