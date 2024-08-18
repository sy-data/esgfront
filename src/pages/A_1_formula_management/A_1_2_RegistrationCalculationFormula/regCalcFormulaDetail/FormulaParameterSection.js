import {ButtonContainer, CancelButton, ConfirmButton, StyledMenuTitleContainer, TitleButtonContainer} from "../styles";
import {FormulaDetailSectionContainer} from "./styles";
import React, {useState} from "react";
import {useGridApiRef} from "@mui/x-data-grid";
import {FormulaParameterList} from "./FormulaParameterList";
import {ParameterGroupSearchModal} from "./ParameterGroupSearchModal";

const dummyData = Array.from({length: 50}, (_, index) => {
  return {
    no: index + 1,
    id: index + 1,
    parentGroupName: "배출량",
    groupId: "00010",
    groupName: "CO2배출량",
    inputType: '00733',
    inputTypeCode: '사용자입력값'
  }
})

/**
 * A_1_2. 산정식 등록 > 산정식 파라미터 섹션
 */
export const FormulaParameterSection = () => {
  const gridApiRef = useGridApiRef();

  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState([]);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleClickAdd = () => {
    setIsSearchModalOpen(true);
  }

  const handleClickDelete = () => {
    setData((prevState) =>
      prevState.filter((v) => !selectedRow.includes(v.id))
    );
  }

  return (
    <FormulaDetailSectionContainer>
      <TitleButtonContainer>
        <StyledMenuTitleContainer>산정식 파라미터</StyledMenuTitleContainer>
        <ButtonContainer>
          <ConfirmButton onClick={handleClickAdd}>
            추가
          </ConfirmButton>
          <CancelButton
            onClick={handleClickDelete}
            disabled={selectedRow.length === 0}
          >
            삭제
          </CancelButton>
        </ButtonContainer>
      </TitleButtonContainer>

      <FormulaParameterList
        gridApiRef={gridApiRef}
        data={data}
        setData={setData}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />

      <ParameterGroupSearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen}/>
    </FormulaDetailSectionContainer>
  )
}
