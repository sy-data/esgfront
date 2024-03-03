import React, { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { baseInformationThreeOneAtom } from "../../../States/3_activtiy_data_states/3-1_activity_data_add_atom";
import ContentBody from "../../../components/ContentBody";
import { Subtitles } from "@mui/icons-material";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import SubTitle from "../../../components/SubTitle";
import { esgFetch } from "../../../components/FetchWrapper";
import { styled } from "@mui/material";
import InformationAddModal from "./informationAddModal";

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

const NoRows2Overlay = () => {
  return (
    <div style={{ textAlign: "center", padding: "5px 0px", backgroundColor: "#808080" }}>
      <div style={{ fontSize: "16px" }}>조회 된 근거자료 정보가 없습니다.</div>
    </div>
  );
};

const BaseInformationArea = (Props) => {
  const apiRef = useGridApiRef();
  const [baseInformation, setBaseInformation] = useRecoilState(baseInformationThreeOneAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const openModal = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const columns2 = useMemo(
    () => [
      { field: "date", headerName: "기준월" },
      { field: "activity", headerName: "배출활동" },
      { field: "fuel", headerName: "연료" },
      { field: "etc", headerName: "비고" },
      {
        field: "file",
        headerName: "근거자료(파일)",
        renderCell: (cellValues) => (
          <div style={{ color: "blue", cursor: "pointer" }} onClick={() => openModal(cellValues.value)}>
            파일 확인
          </div>
        ),
      },
    ],
    []
  );

  // 근거자료에 해당하는 파일 목록 호출
  const handleSaveBaseInformation = () => {
    setIsModalOpen((prev) => !prev);
  };
  console.log(isModalOpen);
  return (
    <ContentBody>
      {isModalOpen ? <InformationAddModal isModalOpen={isModalOpen} onClose={closeModal} /> : null}
      <TableTitleContainer>
        <SubTitle title={"근거자료"} />
        <Button onClick={handleSaveBaseInformation}>등록</Button>
      </TableTitleContainer>
      <CustomDataGrid
        data={baseInformation}
        apiRef={apiRef}
        columns={columns2}
        slots={{
          noRowsOverlay: NoRows2Overlay,
        }}
        loading={Props.loading}
        rowHeight={30}
        autoHeight
        disableColumnMenu={true}
        columnHeaderHeight={40}
        pageSize={5}
      />
    </ContentBody>
  );
};

export default BaseInformationArea;
