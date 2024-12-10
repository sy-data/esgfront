import { useRef, useState, useMemo, useCallback } from "react";

import { Button, OutlinedInput, InputAdornment, IconButton, Typography, Select, MenuItem, Tabs, Tab, Modal, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { esgFetch } from "../../../components/FetchWrapper";
import { useDropzone } from "react-dropzone";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

const FuelInformation = props => {
  const [sbMsg, setSbMsg] = useState("");
  const fileContent = useRef();
  const handleFileReset = () => {
    fileContent.current = null;
    setFileName("");
  }
  const onDrop = acceptedFiles => {
    setFileName(acceptedFiles[0].name);
    const reader = new FileReader();
    reader.onload = event => {
      fileContent.current = event.target.result;
    }
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }
  const handleStartUpload = async () => {
    if(fileName.length > 0){
      const formData = new FormData();
      const blob = new Blob([fileContent.current], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      formData.append("filekey.", blob, fileName);
      const host = process.env.REACT_APP_PROD_API_ENDPOINT ? process.env.REACT_APP_PROD_API_ENDPOINT : "";
      const session = localStorage.getItem("__session");
      const response = await fetch(`${host}/api/v1/emission/xlsx/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session}`,
        },
        body: formData
      }).then(res=>res.json());
      
      if("success" in response && response.success === true) {
        setSbMsg("업로드 완료했습니다.");
      }
      // response = {activity:468, category: 13, facility: 38, premises: 1, success: true}
    }
    else {
      alert("파일을 등록해주세요.");
    }
  }
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, multiple: false, maxFiles: 1, noClick: true });
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
  
  const [tabIndex, setTabIndex] = useState(0);

  const column0 = useMemo(() => ([
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
    { field: 'c1', headerName: '시설명' },
    { field: 'c2', headerName: '배출활동' },
    { field: 'c3', headerName: '배출계수 적용 기준' },
    { field: 'c4', headerName: '산정식' },
    { field: 'c5', headerName: '산정식 버전' },
    { field: 'c6', headerName: '연료명' },
    { field: 'c7', headerName: '배출 규정등급' },
    { field: 'c8', headerName: '배출 적용등급' },
    { 
      field: 'c9', headerName: '파라미터', width: 130, sortable: false,
      renderCell: params => {
        if(!params.row.hs_code || params.row.hs_code.length === 0){
          return (
            <Button variant="btnInit" sx={{padding: 0, minWidth: "110px", height: "40px"}} onClick={()=>openParamDetail(params.row)}>
              <div style={{display: "flex", alignItems: "center", height: "100%", gap: "5px"}}>
                <Typography sx={{fontSize: "14px", fontWeight: "bold"}}>상세보기</Typography>
              </div>
            </Button>
          );
        }
        else {
          return (
            <Typography sx={{fontSize: "14px", fontWeight: "bold", color: "#CCCCCC"}}>{params.row.hs_code}</Typography>
          )
        }
      }
    },
    {
        field: 'c10', headerName: '', sortable: false,
        renderCell: params => <IconButton onClick={()=>{setDetailModal(true);console.log(params)}}><ModeEditOutlinedIcon/></IconButton>
    },
  ]), []);
  const column1 = useMemo(() => ([
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
    { field: 'c1', headerName: '시설명' },
    { field: 'c2', headerName: '배출시설' },
    { field: 'c3', headerName: '법인명' },
    { field: 'c4', headerName: '사업장명' },
    { field: 'c5', headerName: '사용연료' },
    { field: 'c6', headerName: '단위' },
    { field: 'c7', headerName: '배출계수' },
    { field: 'c8', headerName: '' },
  ]), []);
  
  // const [rows0, setRows0] = useState([
  //   {id:'1',c1:"유리생산",c2:"공정배출",c3:"제조업∙건설업",c4:"유리생산량",c5:"Ver1",c6:"유리장섬유",c7:"Tier 1",c8:"Tier 1"},
  //   {id:'2',c1:"특수차량(1톤)",c2:"이동연소",c3:"제조업∙건설업",c4:"이동연소",c5:"Ver1",c6:"경유",c7:"Tier 1",c8:"Tier 1"},
  // ]);
  // const [rows1, setRows1] = useState([
  //   {id:'1',c1:"하폐수 처리기",c2:"스팀사용시설",c3:"A회사",c4:"AA사업장",c5:"스팀",c6:"Ton",c7:"0.133245"}
  // ])
  
  const columnDetail = useMemo(() => ([
    { field: "id", headerName: "No", width: 50, sortable: false },
    { field: 'c1', headerName: '파라미터', width: 110, sortable: false },
    { field: 'c2', headerName: '입력구분', width: 110, sortable: false },
    { field: 'c3', headerName: '배출 규정등급', sortable: false },
    { field: 'c4', headerName: '배출 규정등급', sortable: false },
    { field: 'c5', headerName: '파라미터 버전', sortable: false },
    { field: 'c6', headerName: '파라미터 값', sortable: false },
    { field: 'c7', headerName: '단위', width: 110, sortable: false },
    { field: 'c8', headerName: '불확도(%)', sortable: false },
    {
      field: 'c9', headerName: '', sortable: false,
      renderCell: params => <IconButton onClick={()=>setSbMsg("저장되었습니다.")}><ModeEditOutlinedIcon/></IconButton>
    },
  ]), []);
  
  const [rowDetail, setRowDetail] = useState([
    // {id: '1', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '2', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '3', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '4', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '5', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '6', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '7', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '8', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '9', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '10', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '11', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
    // {id: '12', c1:"에너지 사용량", c2:"시스템 입력값", c3:"Tier 1", c4:"Tier 1", c5:"1", c6:"0", c7:"CO2-eq ton",c8:"23"},
  ]);
  
  const openParamDetail = async row => {
    // 입력값 row ->
    // {
    //   c1: "특수차량(1톤)",
    //   c2: "이동연소",
    //   c3: "제조업∙건설업",
    //   c4: "이동연소",
    //   c5: "Ver1",
    //   c6: "경유",
    //   c7: "Tier 1",
    //   c8: "Tier 1",
    //   id: "2"
    // }
    const result = await esgFetch().then(res=>setRowDetail(res.json()));
  }
  
  const NoRowsOverlay0 = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "20px", display: "flex", alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>조회된 배출활동 연료가 없습니다.</div>
        </div>
      </div>
    )
  }
  
  const NoRowsOverlay1 = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "20px", display: "flex", flexDirection: 'column', alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>조회된 정보가 없습니다.</div>
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>외부 업체에서 사용하는 스팀이 있을 경우 신규등록을 진행해주세요.</div>
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
    if(tabIndex === 0){
      props.setFuelActivityList(props.fuelActivityList.filter(r => !checked.includes(r.id)));
    }
    else{
      props.setExternalFuelList(props.externalFuelList.filter(r => !checked.includes(r.id)));
    }
    
    // props.updateFuelList();
  }, [props.fuelActivityList, props.externalFuelList]);
  
  const [uploadModal, setUploadModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const handleCloseModal = () => {
    setUploadModal(false);
    setFileName("");
  }
  const handleCloseDetailModal = () => {
    setDetailModal(false);
  }
  
  const [fileName, setFileName] = useState("");
  const [searchType, setSearchType] = useState("");
  
  return (
    <div style={{display: "flex", flexDirection: "column", width: props.width, gap: "24px"}}>
      <div style={{display: "flex", gap: "6px"}}>
        <BaseYearSelect ref={props.baseYearRef} displayItemCount={5} width={222} />
        <Select
          value={searchType}
          size="small"
          IconComponent={ExpandMoreIcon}
          sx={{width: 222}}
          onChange={e=>setSearchType(e.target.value)}
          displayEmpty
          renderValue={selected => {
            if(selected.length === 0){
              return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>검색유형</Typography>
            }
            return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
          }}
        >
          <MenuItem value="배출시설">배출시설</MenuItem>
          <MenuItem value="배출활동">배출활동</MenuItem>
          <MenuItem value="연료명">연료명</MenuItem>
        </Select>
        <OutlinedInput
          error={false}
          inputRef={termRef}
          onKeyDown={handleTermKeyDown}
          type='text'
          sx={{width: "338px"}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onMouseDown={e => e.preventDefault()}
                onMouseUp={e => e.preventDefault()}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          size="small"
          placeholder="검색어를 입력하세요"
        />
        <Button variant="btnActive" sx={{width: 114}} onClick={handleSearchButtonClick}>검색</Button>
      </div>
      <ContentBody padding={"24px"} flex="1" width="auto">
        <SubTitle title={"배출 연료 정보"}>
          <div style={{display: "flex", gap: "8px"}}>
            {
              tabIndex === 0 ?
              <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive" onClick={()=>setUploadModal(true)}>엑셀 업로드</Button>
              :
              <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive" onClick={()=>props.register()}>신규 등록</Button>
            }
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnInit" onClick={handleDeleteChecked}>삭제</Button>
          </div>
        </SubTitle>
        <Tabs value={tabIndex} sx={{marginTop: "16px"}} onChange={(e,v)=>{props.closeRegister(); setUploadModal(false); setTabIndex(v);}}>
          <Tab label="연료 활동 관리" />
          <Tab label="외부 연료 관리" />
        </Tabs>
        <form style={{height: "100%"}} ref={formRef}>
          {tabIndex === 0 ?
            <DataGrid
              columns={column0}
              // rows={rows0.filter(r=>r.c1.includes(searchTerm))}
              rows={props.fuelActivityList.filter(r => {
                if(searchType === "배출시설"){
                  return r.c1.includes(searchTerm);
                }
                else if(searchType === "배출활동"){
                  return r.c2.includes(searchTerm);
                }
                else if(searchType === "연료명"){
                  return r.c6.includes(searchTerm);
                }
                else{
                  return r.c1.includes(searchTerm) || r.c2.includes(searchTerm) || r.c6.includes(searchTerm);
                }
              })}
              slots={{
                noRowsOverlay: NoRowsOverlay0,
                // loadingOverlay: LinearProgress,
              }}
              disableColumnFilter
              disableColumnSelector
              disableColumnMenu
              disableRowSelectionOnClick
            />
            :
            <DataGrid
              columns={column1}
              // rows={rows1.filter(r=>r.c1.includes(searchTerm))}
              rows={props.externalFuelList.filter(r => {
                if(searchType === "배출시설"){
                  return r.c1.includes(searchTerm) || r.c2.includes(searchTerm);
                }
                else if(searchType === "배출활동"){
                  return r.c1.includes(searchTerm) || r.c2.includes(searchTerm);
                }
                else if(searchType === "연료명"){
                  return r.c5.includes(searchTerm);
                }
                else{
                  return r.c1.includes(searchTerm) || r.c2.includes(searchTerm) || r.c5.includes(searchTerm);
                }
              })}
              slots={{
                noRowsOverlay: NoRowsOverlay1,
                // loadingOverlay: LinearProgress,
              }}
              disableColumnFilter
              disableColumnSelector
              disableColumnMenu
              disableRowSelectionOnClick
            />
          }
        </form>
      </ContentBody>
      <Modal
        open={uploadModal}
        onClose={handleCloseModal}
      >
        <Box sx={{
          padding: "24px", borderRadius: "8px", backgroundColor: "white", border: '1px solid #EEEEEE',
          position: "relative", top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: "618px", display: "flex", flexDirection: "column", gap: "24px"
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "bold"
          }}>엑셀 업로드</div>
          <CloseIcon sx={{position: "absolute", top:20, right:20, width: "24px", height: "24px", cursor: "pointer"}} onClick={handleCloseModal} />
          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div style={{fontSize: "13px", color: "#757575", lineHeight: "16px"}}>
                GHG Protocol excel 파일을 첨부해주세요. <br/>
                다운로드 받은 양식과 동일한 파일을 첨부하지 않을 경우 <br/>
                데이터를 불러오는 과정에서 오류가 발생할 수 있습니다.
              </div>
              <Button variant="btnInit">
                <div style={{display: "flex", alignItems: "center", height: "100%", gap: "5px"}}>
                  <Typography sx={{fontSize: "14px", fontWeight: "bold", height: "100%"}}>엑셀 양식 다운로드</Typography>
                  <SaveAltIcon />
                </div>
              </Button>
            </div>
            <div style={{border: '1px solid #EEEEEE', borderRadius: "8px", width: "100%", height: "194px"}} {...getRootProps()}>
              <input {...getInputProps()} />
              {
                fileName.length === 0 ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F9F9F9", gap: "8px", width: "100%", height: "100%"}}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.3327 22.7773V28.7033C33.3327 29.4891 33.0205 30.2427 32.4648 30.7984C31.9092 31.3541 31.1555 31.6662 30.3697 31.6662H9.62898C8.84315 31.6662 8.08951 31.3541 7.53385 30.7984C6.97818 30.2427 6.66602 29.4891 6.66602 28.7033V22.7773" stroke="#757575" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                    <path d="M27.4082 12.407L20.0008 4.99956M20.0008 4.99956L12.5934 12.407M20.0008 4.99956L20.0008 22.7773" stroke="#757575" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                  </svg>
                  <div style={{fontSize: "16px", color: "#757575"}}>
                    파일을 드래그 앤 드롭하여 업로드
                  </div>
                  <Button variant="btnInit" sx={{width: 60, height: 30, padding: 0}} onClick={e=>{e.stopPropagation();open();}}><Typography sx={{fontSize:"13px", fontWeight:"bold"}}>파일선택</Typography></Button>
                </div>
                :
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F9F9F9", gap: "8px", width: "100%", height: "100%"}}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.5709 32.8577C33.4044 32.8577 34.2038 32.5213 34.7932 31.9224C35.3826 31.3236 35.7137 30.5113 35.7137 29.6644V13.698C35.7137 12.8511 35.3826 12.0389 34.7932 11.44C34.2038 10.8412 33.4044 10.5048 32.5709 10.5048H20.1566C19.631 10.51 19.1124 10.3812 18.6485 10.1302C18.1845 9.87911 17.79 9.51385 17.5009 9.06778L16.228 7.15182C15.9418 6.7103 15.5523 6.34788 15.0942 6.09707C14.6362 5.84627 14.124 5.71493 13.6037 5.71484H7.42801C6.59448 5.71484 5.79508 6.05128 5.20568 6.65013C4.61628 7.24899 4.28516 8.06121 4.28516 8.90812V29.6644C4.28516 30.5113 4.61628 31.3236 5.20568 31.9224C5.79508 32.5213 6.59448 32.8577 7.42801 32.8577H32.5709Z" fill="#DCF2EF"/>
                  </svg>
                  <div style={{fontSize: "14px", fontWeight: 600, color: "#333333", display: "flex", alignItems: "center", gap: "4px"}}>
                    {fileName}
                    <HighlightOffIcon sx={{color: "#FF462D", cursor: "pointer"}} onClick={e=>{e.stopPropagation();handleFileReset();}} />
                  </div>
                </div>
              }
            </div>
          </div>
          <Button variant="btnActive" size="small" fullWidth onClick={handleStartUpload}>업로드</Button>
        </Box>
      </Modal>
      <Modal
        open={detailModal}
        onClose={handleCloseDetailModal}
      >
        <Box sx={{
          padding: "24px", borderRadius: "8px", backgroundColor: "white", border: '1px solid #EEEEEE',
          position: "relative", top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: "957px", display: "flex", flexDirection: "column", gap: "24px"
        }}>
          <div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: "bold"
            }}>파라미터 관리</div>
            <div style={{marginTop: "8px", fontSize: "13px", color: "#757575", textAlign: "center"}}>
              배출활동의 파라미터 값을 조회 및 수정할 수 있습니다.
            </div>
          </div>
          <CloseIcon sx={{position: "absolute", top:20, right:20, width: "24px", height: "24px", cursor: "pointer"}} onClick={handleCloseDetailModal} />
          <DataGrid
            sx={{maxHeight: '630px'}}
            columns={columnDetail}
            rows={rowDetail}
            slots={{
              noRowsOverlay: NoRowsOverlay0,
              // loadingOverlay: LinearProgress,
            }}
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            disableRowSelectionOnClick
          />
          <Button variant="btnActive" size="small" fullWidth onClick={handleStartUpload}>저장</Button>
        </Box>
      </Modal>
      <Snackbar
        open={sbMsg.length !== 0}
        onClose={()=>setSbMsg("")}
        TransitionComponent={SlideTransition}
        key="resultSnackbar"
        autoHideDuration={3000}
      >
        <div style={{width: "400px", height: "56px", borderRadius: "8px", backgroundColor: "#111111", display: "flex", alignItems: "center", gap: "12px", padding: "0 20px"}}>
          <CheckCircleIcon sx={{color: "#00CD9B"}} />
          <span style={{fontSize: "16px", color: "#FFFFFF"}}>{sbMsg}</span>
        </div>
      </Snackbar>
    </div>
  )
};

export default FuelInformation;
