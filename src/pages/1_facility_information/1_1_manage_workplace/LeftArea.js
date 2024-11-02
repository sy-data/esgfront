import { Button, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const LeftArea = props => {
  const apiRef = useGridApiRef();
  
  const columns = [
    { field: "id", headerName: "No", sortable: false, renderHeader: () => <FormControlLabel control={<Checkbox />} label="ID" />},
    { field: 'type', headerName: '회사구분' },
    { field: 'company_name', headerName: '사업자명' },
    { field: 'company_number', headerName: '사업자등록번호', width: 120 },
    { field: 'company_use', headerName: '사업장 사용' },
    { field: 'company_size', headerName: '회사규모' },
    { field: 'industry_type', headerName: '산업군' },
    { field: 'register_date', headerName: '등록일' },
  ]
  
  const rows = [
    {
      id: 1,
      type: 1,
      company_name: "name",
      company_number: "123-45-67890",
      company_use: 1,
      company_size: 1,
      industry_type: 1,
      register_date: "1111-11-11"
    }
  ]
  
  const updateWorkplace = params => {
    props.updateFields(params.row.attributes);
    props.setSelectedWorkplace(params.id);
  }
  
  return (
    <ContentBody padding={"24px"} flex={props.flex} width={props.width} gap="16px">
      <SubTitle title={"사업장 목록"}>
        <Button sx={{width: "122px", fontSize: "14px"}} variant="btnActive">신규 등록</Button>
      </SubTitle>
      <DataGrid
        columns={columns}
        rows={rows}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
      />
    </ContentBody>
  )
}

export default LeftArea;
