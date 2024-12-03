import { useRef, useState, useMemo, useCallback } from "react";

import { Button, OutlinedInput, InputAdornment, IconButton, Typography } from "@mui/material";

import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HsModal from './HsModal';

const ProductList = props => {
  const baseYearRef = useRef(null);
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
    { field: 'product_name', headerName: '생산품명', width: 220 },
    { 
      field: 'hs_code', headerName: 'HS Code', width: 220,
      renderCell: params => {
        if(!params.row.hs_code || params.row.hs_code.length === 0){
          return (
            <Button variant="btnInit" sx={{padding: 0, minWidth: "200px"}} onClick={()=>handleOpenModal(params.row.id)}>
              <div style={{display: "flex", alignItems: "center", height: "100%", gap: "5px"}}>
                <Typography sx={{fontSize: "14px", fontWeight: "bold"}}>HS Code 찾기</Typography>
                <SearchIcon />
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
    { field: 'unit', headerName: '단위' },
    { field: 'ratio', headerName: '비율' },
    { field: 'bigo', headerName: '비고', width: 300 },
    { field: 'edit', headerName: '' },
  ]), []);
  
  const [rows, setRows] = useState([
    {
      id: '1', product_name: "SDRAM", hs_code: "", unit: "Ton", ratio: "21%", bigo: "반도체 제조용 기기"
    },
    {
      id: '2', product_name: "SDRAM", hs_code: "9032.89-4091(반도체 제조용 기기)", unit: "Ton", ratio: "5%", bigo: "완제품"
    },
  ]);
  
  const NoRowsOverlay = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "20px", display: "flex", flexDirection: 'column', alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>등록된 생산품 정보가 없습니다.</div>
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
    setRows(rows.filter(r => !checked.includes(r.id)));
  }, [rows]);
  
  
  const [openHsModal, setOpenHsModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleOpenModal = idx => {
    console.log("handle", idx);
    setActiveIndex(idx);
    setOpenHsModal(true);
  }
  const handleCloseModal = () => setOpenHsModal(false);
  const handleSelectValue = value => {
    // const prevValues = [...values];
    // prevValues[activeIndex].code = `${value.row.c2}(${value.row.c4})`;
    // setValues(prevValues);
    // setOpenHsModal(false);
  }
  
  return (
    <div style={{display: "flex", flexDirection: "column", width: props.width, gap: "24px"}}>
      <div style={{display: "flex", gap: "6px"}}>
        <BaseYearSelect ref={baseYearRef} displayItemCount={5} />
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
          placeholder="생산품명을 입력하세요"
        />
        <Button variant="btnActive" sx={{width: 114}} onClick={handleSearchButtonClick}>검색</Button>
      </div>
      <ContentBody padding={"24px"} gap="16px" flex="1" width="auto">
        <SubTitle title={"생산품 목록"}>
          <div style={{display: "flex", gap: "8px"}}>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive" onClick={()=>props.register()}>신규 등록</Button>
            <Button sx={{width: "122px", fontSize: "14px"}} variant="btnInit" onClick={handleDeleteChecked}>삭제</Button>
          </div>
        </SubTitle>
        <form style={{height: "100%"}} ref={formRef}>
          <DataGrid
            columns={columns}
            rows={rows.filter(r=>r.product_name.includes(searchTerm))}
            slots={{
              noRowsOverlay: NoRowsOverlay,
              // loadingOverlay: LinearProgress,
            }}
          />
        </form>
      </ContentBody>
      <HsModal open={openHsModal} onClose={handleCloseModal} onSelect={handleSelectValue} />
    </div>
  )
};

export default ProductList;
