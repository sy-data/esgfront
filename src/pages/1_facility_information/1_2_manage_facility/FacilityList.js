import { useRef, useState, useMemo, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { Button, OutlinedInput, InputAdornment, IconButton, Modal, Box } from "@mui/material";

import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import { SelectedYear, SelectedFactoryId } from "./States";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { esgFetch } from "../../../components/FetchWrapper";

const FacilityList = props => {
  const formRef = useRef();
  const termRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchButtonClick = () => setSearchTerm(termRef.current.value);
  const handleTermKeyDown = e => {
    if(e.key === "Enter"){
      e.preventDefault();
      handleSearchButtonClick();
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const setSelectedYear = useSetRecoilState(SelectedYear);
  // const resetSelectedYear = useResetRecoilState(SelectedYear);
  // const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  // const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  // useEffect(() => {
  //   return () => {
  //     resetSelectedYear();
  //     resetSelectedFacotyId();
  //   };
  // }, []);
  
  const columns = useMemo(() => ([
    { 
      field: "id", headerName: "No", sortable: false, 
      renderHeader: () => (
        <>
          <input type="checkbox" id="checkbox-header" onChange={handleHeaderChecked} />
          <label 
            for="checkbox-header"
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
              for={`checkbox-${params.id}`}
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
    {
      field: 'emission_type', headerName: '배출유형',
      renderCell: params => (
        <div style={{
            color: "#00B096", backgroundColor: "#DCF2EF", borderRadius: "8px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2px 8px", boxSizing: "border-box", fontSize: "12px", fontWeight: "bold"}}>
          {params.row.emission_type}
        </div>
      )
    },
    { field: 'fuel', headerName: '연료' },
    {
      field: 'industry_group', headerName: '산업군',
      renderCell: params => (
        <div style={{
            color: "#AAAAAA", backgroundColor: "#EEEEEE", borderRadius: "8px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2px 8px", boxSizing: "border-box", fontSize: "12px", fontWeight: "bold"}}>
          {params.row.industry_group}
        </div>
      )
    },
    { field: 'version', headerName: '버전' },
    { field: 'g_rate', headerName: '배출 규정등급' },
    { field: 'j_rate', headerName: '배출 적용등급' },
    {
      field: 'parameter', headerName: '파라미터',
      renderCell: params => <Button variant="btnInit" onClick={()=>openParameter(params.row)}>상세보기</Button>
    },
  ]), []);
  
  const openParameter = async e => {
    // e =
    // {
    //   description: "사업장 원자력발전기"
    //   emission_type: "고정연소"
    //   facility_name: "내연발전기"
    //   fuel: "부생연료2호"
    //   g_rate: "Tier2"
    //   id: "1"
    //   industry_group: "제조업"
    //   j_rate: "Tier2"
    //   version: "Ver1"
    // }
    const result = await esgFetch().then(res=>res.json());
    setParamRows(result);
    setOpenModal(true);
  }
  
  // const [rows, setRows] = useState([
  //   {
  //     id: '1', facility_name: "내연발전기", description: "사업장 원자력발전기", emission_type: "고정연소", fuel: "부생연료2호", industry_group: "제조업",
  //     version: "Ver1", g_rate: "Tier2", j_rate: "Tier2"
  //   },
  //   {
  //     id: '2', facility_name: "내연발전기", description: "사업장 원자력발전기", emission_type: "고정연소", fuel: "부생연료2호", industry_group: "제조업",
  //     version: "Ver1", g_rate: "Tier2", j_rate: "Tier2"
  //   },
  //   {
  //     id: '3', facility_name: "내연발전기", description: "사업장 원자력발전기", emission_type: "고정연소", fuel: "부생연료2호", industry_group: "제조업",
  //     version: "Ver1", g_rate: "Tier2", j_rate: "Tier2"
  //   },
  //   {
  //     id: '4', facility_name: "내연발전기", description: "사업장 원자력발전기", emission_type: "고정연소", fuel: "부생연료2호", industry_group: "제조업",
  //     version: "Ver1", g_rate: "Tier2", j_rate: "Tier2"
  //   },
  //   {
  //     id: '5', facility_name: "내연발전기", description: "사업장 원자력발전기", emission_type: "고정연소", fuel: "부생연료2호", industry_group: "제조업",
  //     version: "Ver1", g_rate: "Tier2", j_rate: "Tier2"
  //   },
  // ]);
  
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
  
  const handleHeaderChecked = useCallback(e => {
    const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
  }, []);
  const handleDeleteChecked = useCallback(() => {
    const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]:checked');
    const checked = Array.from(checkboxes).map((checkbox) => checkbox.id.replace("checkbox-",""));
    props.setFacilityList(props.facilityList.filter(r => !checked.includes(r.id)));
    
    // props.refreshList()
  }, [props.facilityList]);
  
  const [paramRows, setParamRows] = useState([]);
  const handleCloseParamModal = () => {
    setOpenModal(false);
    setParamRows([]);
  }
  const [paramLoading, setParamLoading] = useState(false);
  const updateParameter = async id => {
    setParamLoading(true)
    const result = await esgFetch().then(res=>{
      setParamLoading(false);
      return res.json;
    });
    if(Array.isArray(result.data?.items)){
      result.data.items.map(param=>({
        id: param.id,
        c2: param.name,
        c3: param.gubun,
        c4: param.g_rate,
        c5: param.j_rate,
        c6: param.version,
        c7: param.value,
        c8: param.unit,
        c9: param.bulhwakdo
        // id: '2', c2: 'CO2 배출량', c3:'시스템 결과 값', c4: 'Tier1', c5: '1', c6: '', c7: 'CO2-eq ton', c8: '', c9: '',
      }))
    }
  }
  
  return (
    <div style={{display: "flex", flexDirection: "column", width: props.width, gap: "24px"}}>
      <div style={{display: "flex", gap: "6px"}}>
        <BaseYearSelect ref={props.baseYearRef} displayItemCount={5} />
        <OutlinedInput
          error={false}
          inputRef={termRef}
          onKeyDown={handleTermKeyDown}
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
          size="small"
          placeholder="시설명을 입력하세요"
        />
        <Button variant="btnActive" sx={{width: 114}} onClick={handleSearchButtonClick}>검색</Button>
      </div>
      <ContentBody padding={"24px"} gap="16px" flex="1" width="auto">
        <SubTitle title={"시설 정보"}>
          <div style={{display: "flex", gap: "8px"}}>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive" onClick={()=>props.register()}>신규 등록</Button>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnInit" onClick={handleDeleteChecked}>삭제</Button>
          </div>
        </SubTitle>
        <form style={{height: "100%"}} ref={formRef}>
          <DataGrid
            columns={columns}
            // rows={rows.filter(r=>r.facility_name.includes(searchTerm))}
            rows={props.facilityList.filter(r=>r.facility_name.includes(searchTerm))}
            slots={{
              noRowsOverlay: NoRowsOverlay,
              // loadingOverlay: LinearProgress,
            }}
            loading={props.listLoading}
          />
        </form>
      </ContentBody>
      <Modal
        open={openModal}
        onClose={handleCloseParamModal}
      >
        <Box sx={{
          padding: "24px", borderRadius: "8px", backgroundColor: "white", border: '1px solid #EEEEEE',
          position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: "812px", display: "flex", flexDirection: "column", gap: "32px"
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "bold"
          }}>파라미터 조회</div>
          <CloseIcon sx={{position: "absolute", top:20, right:20, width: "24px", height: "24px", cursor: "pointer"}} onClick={handleCloseParamModal} />
          <DataGrid
            sx={{maxHeight: '630px'}}
            columns={[
              { field: 'id', headerName: 'No', sortable: false, width: 50 },
              { field: 'c2', headerName: '파라미터', sortable: false },
              { field: 'c3', headerName: '입력구분', sortable: false },
              { field: 'c4', headerName: '배출 규정등급', sortable: false },
              { field: 'c5', headerName: '배출 적용등급', sortable: false },
              { field: 'c6', headerName: '파라미터 버전', sortable: false },
              { field: 'c7', headerName: '파라미터 값', sortable: false },
              { field: 'c8', headerName: '단위', sortable: false },
              { field: 'c9', headerName: '불확도(%)', sortable: false },
            ]}
            rows={paramRows}
            slots={{
              noRowsOverlay: NoRowsOverlay,
              // loadingOverlay: LinearProgress,
            }}
            loading={paramLoading}
            pagination={false}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            disableRowSelectionOnClick
          />
        </Box>
      </Modal>
    </div>
  )
};

export default FacilityList;
