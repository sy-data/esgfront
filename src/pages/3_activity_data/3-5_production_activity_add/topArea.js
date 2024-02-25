import { useGridApiRef } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { sewageWastwaterInfomationAtom } from "../../../States/3_activtiy_data_states/3-3_sewage_wasterwater_atom";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { styled } from "@mui/material";
import { productionActivityAtom } from "../../../States/3_activtiy_data_states/3-5_production_activity_atom";

const TableTitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const Button = styled("button")({
  padding: "5px 10px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const NoRows1Overlay = () => {
  return (
    <div style={{ textAlign: "center", padding: "5px 0px", backgroundColor: "#808080" }}>
      <div style={{ fontSize: "16px" }}>조회 된 생산품 정보가 없습니다.</div>
    </div>
  );
};

const TopArea = (Props) => {
  const apiRef = useGridApiRef();
  const [productionActivity, setProductionActivity] = useRecoilState(productionActivityAtom);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "No" },
      { field: "season", headerName: "배출시절" },
      { field: "activity", headerName: "배출활동" },
      { field: "fuel", headerName: "연료" },
      { field: "unit", headerName: "단위" },
      { field: "total", headerName: "합계" },
      { field: "jan", headerName: "1월", editable: true },
      { field: "feb", headerName: "2월", editable: true },
      { field: "mar", headerName: "3월", editable: true },
      { field: "apr", headerName: "4월", editable: true },
      { field: "may", headerName: "5월", editable: true },
      { field: "jun", headerName: "6월", editable: true },
      { field: "jul", headerName: "7월", editable: true },
      { field: "aug", headerName: "8월", editable: true },
      { field: "sep", headerName: "9월", editable: true },
      { field: "oct", headerName: "10월", editable: true },
      { field: "nov", headerName: "11월", editable: true },
      { field: "dec", headerName: "12월", editable: true },
    ],
    []
  );

  const processRowUpdate = (newRow, oldRow) => {
    // 새로운 행 데이터를 기반으로 'total' 값 계산
    const total = calculateTotal(newRow);
    const updatedRow = { ...newRow, total: total };

    // 로컬 상태 업데이트
    const updatedRows = productionActivity.map((row) => (row.id === oldRow.id ? updatedRow : row));
    setProductionActivity(updatedRows);

    // 로컬 스토리지에 저장
    localStorage.setItem("productionActivity", JSON.stringify(updatedRows));

    return updatedRow;
  };

  // 'total' 값을 계산하는 함수
  const calculateTotal = (row) => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return months.reduce((sum, month) => sum + (parseFloat(row[month]) || 0), 0);
  };

  // 기준년도 활동 자료 저장하는 부분
  const handleSaveActivityData = () => {
    const storedData = localStorage.getItem("productionActivity");
    console.log(storedData);

    // esgFetch("/api/...")
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setProductionActivity(response.data);
    // });
  };

  return (
    <ContentBody>
      <TableTitleContainer>
        <SubTitle title={"하/폐수 시설 정보"} />
        <Button onClick={handleSaveActivityData}>저장</Button>
      </TableTitleContainer>

      <CustomDataGrid
        data={productionActivity}
        apiRef={apiRef}
        columns={columns}
        slots={{
          noRowsOverlay: NoRows1Overlay,
        }}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        loading={Props.loading}
        rowHeight={40}
        autoHeight
        disableColumnMenu={true}
        columnHeaderHeight={40}
        pageSize={5}
      />
    </ContentBody>
  );
};

export default TopArea;
