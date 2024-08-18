import {Button, Dialog, IconButton, MenuItem, styled} from "@mui/material";
import React, {useCallback, useState} from "react";
import {CloseIcon} from "./icon";
import {DataGrid, useGridApiRef} from "@mui/x-data-grid";
import {FormulaDetailSelectBox, FormulaDetailSelectPlaceholder} from "./styles";

const ModalContainer = styled('div')({
  padding: 24,
});

const DialogTitle = styled('div')({
  width: '100%',
  textAlign: 'center',
  color: 'var(--Neutral-100, #000)',
  fontFamily: "Pretendard Variable",
  fontSize: 24,
  fontWeight: 700,
});

const FilterContainer = styled('div')({
  display: 'flex',
  marginTop: 24,
  marginBottom: 16,
  gap: 8,
});

const GridContainer = styled('div')({
  height: 450,
});

const ParameterGroupListDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-footerContainer': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaders': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowY: 'auto',
  },
});

const SelectBox = styled(FormulaDetailSelectBox)({
  flex: 1,
  marginTop: 0
});

const RegistrationButton = styled(Button)(({disabled}) => ({
  width: 115,
  height: 40,
  borderRadius: "8px",
  background: disabled ? 'var(--Gray-eaeaea, #EAEAEA)' : "var(--Primary-Primary, #00CD9B)",
  color: disabled ? 'var(--Gray-ccc, #CCC)' : "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontWeight: 700,
}));

const dummyData = Array.from({length: 30}, (_, index) => {
  return {
    no: index + 1,
    id: index + 1,
    parentGroupId: "00010",
    parentGroupName: "활동량",
    groupId: "00062",
    groupName: "LTO 횟수",
    inputType: '사용자입력값',
    isActive: '사용',
  }
})

export const ParameterGroupSearchModal = ({isOpen, handleCloseModal}) => {
  const gridApiRef = useGridApiRef();

  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState([]);

  const [industry, setIndustry] = useState('');
  const [emissions, setEmissions] = useState('');

  const columns = [
    {field: "no", headerName: "No", flex: 1, sortable: false},
    {field: "parentGroupId", headerName: "상위그룹ID", flex: 2, sortable: false},
    {field: "parentGroupName", headerName: "상위그룹명", flex: 2, sortable: false},
    {field: "groupId", headerName: "그룹ID", flex: 2, sortable: false},
    {field: "groupName", headerName: "그룹명", flex: 2, sortable: false},
    {field: "inputType", headerName: "입력구분", flex: 2, sortable: false},
    {field: "isActive", headerName: "사용여부", flex: 2, sortable: false},
  ];

  const renderValue = useCallback((selected, placeholder) => {
    if (selected === '') {
      return <FormulaDetailSelectPlaceholder>{placeholder}</FormulaDetailSelectPlaceholder>;
    }
    return selected;
  }, []);

  const handleClickRegistration = () => {
    handleCloseModal();
  }


  return (
    <Dialog
      open={isOpen}
      maxWidth={false}
      PaperProps={{
        style: {
          width: 800,
          borderRadius: 8,
        }
      }}>
      <ModalContainer>
        <DialogTitle>
          파라미터 그룹 검색
          <IconButton onClick={handleCloseModal} sx={{position: "absolute", right: 14, top: 14}}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>

        <FilterContainer>
          <SelectBox
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "산업군")}>
            <MenuItem value="에너지산업 1">에너지산업 1</MenuItem>
            <MenuItem value="에너지산업 2">에너지산업 2</MenuItem>
            <MenuItem value="에너지산업 3">에너지산업 3</MenuItem>
            <MenuItem value="에너지산업 4">에너지산업 4</MenuItem>
          </SelectBox>
          <SelectBox
            value={emissions}
            onChange={(e) => setEmissions(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "배출활동")}>
            <MenuItem value="고체연료연소 1">고체연료연소 1</MenuItem>
            <MenuItem value="고체연료연소 2">고체연료연소 2</MenuItem>
            <MenuItem value="고체연료연소 3">고체연료연소 3</MenuItem>
            <MenuItem value="고체연료연소 4">고체연료연소 4</MenuItem>
          </SelectBox>
          <RegistrationButton onClick={handleClickRegistration} disabled={selectedRow.length === 0}>
            등록
          </RegistrationButton>
        </FilterContainer>

        <GridContainer>
          <ParameterGroupListDataGrid
            apiRef={gridApiRef}
            rows={data}
            columns={columns}
            checkboxSelection
            rowSelectionModel={selectedRow}
            onRowSelectionModelChange={setSelectedRow}
          />
        </GridContainer>
      </ModalContainer>
    </Dialog>
  )
}
