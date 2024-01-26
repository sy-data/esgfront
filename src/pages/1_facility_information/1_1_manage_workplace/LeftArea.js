import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { esgFetch } from "../../../components/FetchWrapper";

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
    </div>
  )
}

const LeftArea = props => {
  const apiRef = useGridApiRef();
  const [workplaceList, setWorkplaceList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const columns = [
    { field: 'index', headerName: 'No', flex: 1 },
    { field: 'name', headerName: '사업장명', flex: 2 },
    { field: 'number', headerName: '사업자번호', flex: 2 },
  ]
  
  useEffect(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=company.industry')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response.data.map((v,i)=>({
          index: i+1,
          id: v.id,
          name: v.attributes.name,
          number: v.attributes.brn,
          industry: v.attributes.company.data.attributes.industry.data.id,
          attributes: v.attributes
        })));
        setLoading(false);
      });
  }, []);
  
  return (
    <ContentBody>
      <SubTitle title={"사업장 목록"} />
      <CustomDataGrid
        data={workplaceList}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
        onRowClick={(params) => props.updateFields(workplaceList.find(w => w.id === params.id).attributes)}
      />
    </ContentBody>
  )
}

export default LeftArea;
