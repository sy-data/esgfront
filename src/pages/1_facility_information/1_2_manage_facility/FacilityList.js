import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import { Button, OutlinedInput, InputAdornment, IconButton } from "@mui/material";

import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { SelectedYear, SelectedFactoryId } from "./States";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';

const FacilityList = props => {
  const baseYearRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const setSelectedYear = useSetRecoilState(SelectedYear);
  // const resetSelectedYear = useResetRecoilState(SelectedYear);
  // const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const handleSearchButtonClick = () => setSelectedYear(baseYearRef.current.baseYear);
  
  // const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  // useEffect(() => {
  //   return () => {
  //     resetSelectedYear();
  //     resetSelectedFacotyId();
  //   };
  // }, []);
  
  const columns = [
    { 
      field: "id", headerName: "No", sortable: false, 
      renderHeader: () => (
        <>
          <input type="checkbox" id="checkbox-No" />
          <label 
            for="checkbox-No"
            style={{
              color: "#757575",
              fontFamily: "Pretendard Variable",
              fontSize: "13px",
              marginLeft: "6px",
              display: "flex",
              gap: "10px"
            }}
          >
            <span className="style-checkbox"></span>
            <div style={{height: "20px", lineHeight: "20px"}}>No</div>
          </label>
        </>
      ),
      renderCell: params => {
        return (
          <>
            <input type="checkbox" id={`checkbox-${params.id}`} />
            <label 
              for="rememberId"
              style={{
                color: "#111111",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                marginLeft: "6px",
                display: "flex",
                gap: "10px"
              }}
            >
              <span className="style-checkbox"></span>
              <div style={{height: "20px"}}>
              {params.id}
              </div>
            </label>
          </>
        )
      }
    },
    { field: 'facility_name', headerName: '시설명' },
    { field: 'description', headerName: '부연설명' },
    { field: 'emission_type', headerName: '배출유형' },
    { field: 'fuel', headerName: '연료' },
    { field: 'industry_group', headerName: '산업군' },
    { field: 'version', headerName: '버전' },
    { field: 'g_rate', headerName: '배출 규정등급' },
    { field: 'j_rate', headerName: '배출 적용등급' },
    { field: 'parameter', headerName: '파라미터' },
  ];
  const rows = [];
  const NoRowsOverlay = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "20px", display: "flex", flexDirection: 'column', alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>등록된 시설정보가 없습니다.</div>
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>신규 등록을 진행해주세요.</div>
        </div>
      </div>
    )
  }
  
  return (
    <div style={{display: "flex", flexDirection: "column", width: props.width, gap: "24px"}}>
      <div style={{display: "flex", gap: "6px"}}>
        <BaseYearSelect ref={baseYearRef} displayItemCount={5} />
        <OutlinedInput
          error={false}
          value={searchTerm}
          type='text'
          sx={{width: "338px"}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                // onClick={() => console.log("search action")}
                onMouseDown={e => e.preventDefault()}
                onMouseUp={e => e.preventDefault()}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={event=>setSearchTerm(event.target.value)}
          size="small"
          placeholder="시설명을 입력하세요"
        />
        <Button variant={searchTerm.length>0?"btnActive":"btnDisabled"} sx={{width: 114}} onClick={handleSearchButtonClick}>검색</Button>
      </div>
      <ContentBody padding={"24px"} gap="16px" flex="1" width="auto">
        <SubTitle title={"시설 정보"}>
          <div style={{display: "flex", gap: "8px"}}>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive" onClick={()=>props.register()}>신규 등록</Button>
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
    </div>
  )
};

export default FacilityList;
