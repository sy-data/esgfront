import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import ChevronRight from "@mui/icons-material/ChevronRight";
import { Button, FormControlLabel, Checkbox } from "@mui/material";

import { ContentWithTitie, FilterBlock, FilterLine, SearchButtonContainer } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { SelectedYear, SelectedFactoryId } from "./States";
import LeftFacility from "./LeftFacility";
import RightFacility from "./RightFacility";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const ManageFacility = () => {
  const baseYearRef = React.useRef(null);

  const setSelectedYear = useSetRecoilState(SelectedYear);
  const resetSelectedYear = useResetRecoilState(SelectedYear);
  const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const handleSearchButtonClick = () => setSelectedYear(baseYearRef.current.baseYear);
  
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("시설정보관리");
    return () => {
      resetSelectedYear();
      resetSelectedFacotyId();
    };
  }, []);
  
  const columns = [
    { field: "id", headerName: "No", sortable: false, renderHeader: () => <FormControlLabel control={<Checkbox />} label="ID" />},
    { field: 'place_name', headerName: '사업장명', width: 300 },
    { field: 'facility_name', headerName: '시설명', width: 330 },
    { field: 'facility', headerName: '배출시설', width: 330 },
    { field: 'size', headerName: '규모' },
    { field: 'report_target', headerName: '정부보고대상' },
    { field: 'append_date', headerName: '시설증설일' },
  ];
  const rows = [];
  const NoRowsOverlay = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
      <div style={{ height: "20px", display: "flex", alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>조회된 사업장정보가 없습니다.</div>
        </div>
    </div>
  )
}


  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", height: "100%", padding: "24px", boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: "24px"
    }}>
      {/* <MenuTitle title={<div style={{ display: "flex", alignItems: "center" }}>시설정보관리 <ChevronRight sx={{ fontSize: 40 }} /> 사업장 시설정보 관리</div>} /> */}

      <div style={{display: "flex", gap: "6px"}}>
        <BaseYearSelect ref={baseYearRef} />
        <Button variant="btnDisabled" sx={{width: 114}} onClick={handleSearchButtonClick}>검색</Button>
      </div>
      <ContentBody padding={"24px"} gap="16px">
        <SubTitle title={"시설 정보"}>
          <div style={{display: "flex", gap: "8px"}}>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive">신규 등록</Button>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnInit">삭제</Button>
          </div>
        </SubTitle>
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{
            noRowsOverlay: NoRowsOverlay,
            // loadingOverlay: LinearProgress,
          }}
        />
      </ContentBody>
      {/* <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef} />
        </FilterLine>
      </FilterBlock>

      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch" onClick={handleSearchButtonClick}>검색</Button>
      </SearchButtonContainer>
      
      <SplitArea>
        <LeftFacility />
        <RightFacility />
      </SplitArea> */}
    </div>
  )
}

export default ManageFacility;
