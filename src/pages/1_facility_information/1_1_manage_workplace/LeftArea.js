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
  const setWorkplaceDetail = useSetRecoilState(workplaceDetailAtom);
  
  const columns = [
    { 
      field: "id",
      headerName: "No", 
      sortable: false, 
      renderHeader: () => (
        <>
          <input type="checkbox" id="checkbox-No" />
          <label 
            for="checkbox-No"
            style={{
              color: "#757575",
              fontFamily: "Pretendard Variable",
              fontSize: "13px",
              // fontWeight: 600,
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
    { field: 'type', headerName: '회사구분' },
    { field: 'company_name', headerName: '사업자명' },
    { field: 'company_number', headerName: '사업자등록번호', width: 120 },
    {
      field: 'company_use', headerName: '사업장 사용',
      renderCell: params => {
        return <Android12Switch onClick={e => console.log(params)} />
      }
    },
    { field: 'company_size', headerName: '회사규모' },
    { field: 'industry_type', headerName: '산업군' },
    { field: 'register_date', headerName: '등록일' },
    { field: 'product_yn', headerName: '생산품' }
  ]
  
  const rows = [
    {
      id: 1,
      type: '본사(본점)',
      company_name: "경기 정밀 산업",
      company_number: "123-45-67890",
      company_use: 1,
      company_size: "대기업",
      industry_type: "제조업/건설업",
      register_date: "1111-11-11",
      product_yn: "유"
    }
  ]
  
  const handleSelectRow = rowId => {
    setWorkplaceDetail({
      open: true,
      id: rows[rowId-1].id,
      type: rows[rowId-1].type,
      company_name: rows[rowId-1].company_name,
      company_number1: rows[rowId-1].company_number.split('-')[0],
      company_number2: rows[rowId-1].company_number.split('-')[1],
      company_number3: rows[rowId-1].company_number.split('-')[2],
      company_use: rows[rowId-1].company_use,
      company_size: rows[rowId-1].company_size,
      industry_type: rows[rowId-1].industry_type,
      // register_date: rows[rowId-1].register_date
    })
  }
  
  const fetchTest = async () => {
    const asdf = await esgFetch("/account/user-sessions").then(res => res.json());
    console.log(asdf)
  }
  
  return (
    <ContentBody padding={"24px"} flex={props.flex} width={props.width} gap="16px">
      <SubTitle title={"사업장 목록"}>
        <div style={{display:"flex", gap:"8px"}}>
          <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive">신규 등록</Button>
          <Button onClick={fetchTest} sx={{width: "122px", fontSize: "14px"}} variant="btnInit">선택 삭제</Button>
        </div>
      </SubTitle>
      <DataGrid
        columns={columns}
        rows={rows}
        columnHeaderHeight={40}
        onRowSelectionModelChange={handleSelectRow}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
      />
    </ContentBody>
  )
}

export default LeftArea;
