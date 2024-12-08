import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, LinearProgress, FormGroup, Typography, Switch } from "@mui/material";
import { styled } from '@mui/material/styles';
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSetRecoilState } from "recoil";
import { workplaceDetailAtom } from "./states";
import { esgFetch } from "../../../components/FetchWrapper";

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

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24">
        <path fill="#FFFFFF" />
      </svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24">
        <path fill="#FFFFFF" />
      </svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const LeftArea = props => {
  const formRef = useRef();
  const setWorkplaceDetail = useSetRecoilState(workplaceDetailAtom);
  const handleHeaderChecked = useCallback(e => {
    const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
  }, []);
  const columns = [
    { 
      field: "id",
      headerName: "No", 
      sortable: false, 
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
              onClick={e=>e.stopPropagation()}
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
    { field: 'type', headerName: '회사구분' },
    { field: 'company_name', headerName: '사업자명' },
    { field: 'company_number', headerName: '사업자등록번호', width: 120 },
    {
      field: 'company_use', headerName: '사업장 사용',
      renderCell: params => {
        return <Android12Switch checked={props.rows[props.rows.findIndex(item=>item.id===params.row.id)]["company_use"]} onClick={e => {
          e.stopPropagation();
          let newRows = [...props.rows];
          const idx = newRows.findIndex(item=>item.id===params.row.id);
          newRows[idx]["company_use"] = !newRows[idx]["company_use"];
          props.setRows(newRows);
        }} />
      }
    },
    { field: 'company_size', headerName: '회사규모' },
    { field: 'industry_type', headerName: '산업군' },
    { field: 'register_date', headerName: '등록일' },
    { field: 'product_yn', headerName: '생산품' }
  ]
  
  // const handleSelectRow = rowId => {
  //   console.log(rowId);
  //   const selectedRow = props.rows.filter(f=>f.id===rowId[0])[0]
    
  //   if(selectedRow && Object.keys(selectedRow).length > 0){
  //     setWorkplaceDetail({
  //       open: true,
  //       id: selectedRow.id || "",
  //       type: selectedRow.type || "",
  //       company_branch: selectedRow.company_branch || "",
  //       company_name: selectedRow.company_name || "",
  //       company_use: selectedRow.company_use || "",
  //       company_number1: selectedRow.company_number1 || "",
  //       company_number2: selectedRow.company_number2 || "",
  //       company_number3: selectedRow.company_number3 || "",
  //       workplace_name: selectedRow.workplace_name || "",
  //       phone_number1: selectedRow.phone_number1 || "",
  //       phone_number2: selectedRow.phone_number2 || "",
  //       phone_number3: selectedRow.phone_number3 || "",
  //       industry_type: selectedRow.industry_type || "",
  //       company_size: selectedRow.company_size || "",
  //       employee_number: selectedRow.employee_number || "",
  //       address1: selectedRow.address1 || "",
  //       address2: selectedRow.address2 || "",
  //       address3: selectedRow.address3 || "",
  //       sales_last: selectedRow.sales_last || "",
  //       sales_now: selectedRow.sales_now || "",
  //       area_j: selectedRow.area_j || "",
  //       area_y: selectedRow.area_y || "",
  //       register_date: selectedRow.register_date || null,
  //       close_date: selectedRow.close_date || null,
  //       product_yn: selectedRow.product_yn || ""
  //     });
  //   }
  // }
  
  const handleDeleteChecked = useCallback(() => {
    const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]:checked');
    const checked = Array.from(checkboxes).map((checkbox) => checkbox.id.replace("checkbox-","")).filter(f=>f!=='');
    props.setRows(props.rows.filter(r => !checked.includes(r.id.toString())));
    
    props.refreshList();
  }, [props.rows]);
  
  return (
    <ContentBody padding={"24px"} flex={props.flex} width={props.width} gap="16px">
      <SubTitle title={"사업장 목록"}>
        <div style={{display:"flex", gap:"8px"}}>
          <Button onClick={()=>props.handleSelectRow(null)} sx={{width: "122px", fontSize: "14px"}} variant="btnActive">신규 등록</Button>
          <Button onClick={handleDeleteChecked} sx={{width: "122px", fontSize: "14px"}} variant="btnInit">선택 삭제</Button>
        </div>
      </SubTitle>
      <form style={{height: "100%"}} ref={formRef}>
        <DataGrid
          columns={columns}
          rows={props.rows}
          columnHeaderHeight={40}
          onRowSelectionModelChange={props.handleSelectRow}
          onCellClick={(params, event) => {
            if(event.target.tagName === "INPUT"){
              event.stopPropagation();
            }
          }}
          slots={{
            noRowsOverlay: NoRowsOverlay,
            loadingOverlay: LinearProgress,
          }}
          loading={props.loading}
        />
      </form>
    </ContentBody>
  )
}

export default LeftArea;
