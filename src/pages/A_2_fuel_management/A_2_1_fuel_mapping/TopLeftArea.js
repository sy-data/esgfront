import { useState, useEffect, useRef } from "react"
import { Button, styled } from "@mui/material"
import { useGridApiRef } from "@mui/x-data-grid"
import { LinearProgress } from "@mui/material"
import SubTitle from "../../../components/SubTitle"
import ContentBody from "../../../components/ContentBody"
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
}));

const CombustionManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  useEffect(() => {
    const dummyData = [
      { index: 1, id: 1, name: '산정식1', combustion_id: 1 },
      { index: 2, id: 2, name: '산정식2', combustion_id: 2 },
      { index: 3, id: 3, name: '산정식3', combustion_id: 3 },
      { index: 4, id: 4, name: '산정식4', combustion_id: 4 },
      { index: 5, id: 5, name: '산정식5', combustion_id: 5 },
      { index: 6, id: 6, name: '산정식6', combustion_id: 6 },
      { index: 7, id: 7, name: '산정식7', combustion_id: 7 },
    ]

    setData(dummyData);
  }, []);

  const dummyColumns = [
    { field: 'index', headerName: '', width: 50 },
    { field: 'id', headerName: '산정식ID', flex: 1 },
    { field: 'name', headerName: '산정식명', flex: 1},
    { field: 'combustion_id', headerName: '배출활동ID', flex: 1 }
  ]
  return (
    <ContentBody>
      <SubTitle title={"배출활동 정보"} />
      <ButtonContainer>
        <Button variant="outlined" size="samll" color="btnSearch">
          추가
        </Button>
        <Button variant="outlined" size="samll" color="btnSearch">
          저장
        </Button>
        <Button variant="outlined" size="samll" color="btnSearch">
          삭제
        </Button>
      </ButtonContainer>
      <CustomDataGrid
        apiRef={gridApiRef}
        ref={gridRef}
        data={data}
        columns={dummyColumns}
        editMode="row"
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        setLoading={setLoading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={7}
      />
    </ContentBody>
  )
}

export default CombustionManagement;
