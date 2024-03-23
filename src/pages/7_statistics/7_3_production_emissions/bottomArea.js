import { useState, useEffect, useRef } from "react";
import { Button, styled } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
}));

const CombustionIfno = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const gridApiRef = useGridApiRef();
  const gridRef = useRef(null);

  useEffect(() => {
    const dummyData = [
      { id: 1, code: "연료1", name: "연료1", cost: 1000 },
      { id: 2, code: "연료2", name: "연료2", cost: 2000 },
      { id: 3, code: "연료3", name: "연료3", cost: 3000 },
      { id: 4, code: "연료4", name: "연료4", cost: 4000 },
      { id: 5, code: "연료5", name: "연료5", cost: 5000 },
      { id: 6, code: "연료6", name: "연료6", cost: 6000 },
      { id: 7, code: "연료7", name: "연료7", cost: 7000 },
    ];

    setData(dummyData);
  }, []);

  const dummyColumns = [
    { field: "id", headerName: "", width: 50 },
    { field: "code", headerName: "연료코드", flex: 1 },
    { field: "name", headerName: "연료명", flex: 2 },
    { field: "cost", headerName: "연료비용", flex: 1 },
  ];
  return (
    <ContentBody>
      <SubTitle title={"연료정보"} />
      <ButtonContainer>
        <Button variant="outlined" size="samll" color="btnSearch">
          저장
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
  );
};

export default CombustionIfno;
