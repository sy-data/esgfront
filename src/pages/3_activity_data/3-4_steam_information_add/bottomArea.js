import { styled } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import {
  baseInformationAtom,
  baseInformationFileAtom,
} from "../../../States/3_activtiy_data_states/3-3_sewage_wasterwater_atom";
import ContentBody from "../../../components/ContentBody";
import InformationAddModal from "../3-1_activtity_data_add/informationAddModal";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

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

const BottomArea = (Props) => {
  const apiRef = useGridApiRef();
  const [baseInformation, setBaseInformation] = useRecoilState(baseInformationAtom);
  const [baseInformationFile, setBaseInformationFile] = useRecoilState(baseInformationFileAtom);
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

  const columns = useMemo(
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
    // esgFetch("/api/...")
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setBaseInformationFile(response.data);
    //   });
  };
  return (
    <ContentBody>
      {isModalOpen && <InformationAddModal file={baseInformationFile} closeModal={closeModal} />}
      <TableTitleContainer>
        <SubTitle title={"근거자료"} />
        <Button onClick={handleSaveBaseInformation}>등록</Button>
      </TableTitleContainer>
      <CustomDataGrid
        data={baseInformation}
        apiRef={apiRef}
        columns={columns}
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

export default BottomArea;
