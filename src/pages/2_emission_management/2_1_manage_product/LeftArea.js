import { useState, useEffect } from "react";
import { useGridApiRef } from "@mui/x-data-grid";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "./CustomDataGrid.js";

const NoRowsOverlay = () => {
  return (
      <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
          <div style={{ fontSize: '16px' }}>조회 된 사업장 정보가 없습니다.</div>
      </div>
  )
}

const FacilityList = () => {
    const apiRef = useGridApiRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {id: 1, name: '사업장1', number: '111-11-11111'},
            {id: 2, name: '사업장2', number: '111-11-11112'},
            {id: 3, name: '사업장3', number: '111-11-11113'}
        ])
    }, []);

    const dummyColumns = [
        { field: 'id', headerName: 'No', flex: 1 },
        { field: 'name', headerName: '사업장명', flex: 2 },
        { field: 'number', headerName: '사업자번호', flex: 2 },
    ]

    return (
        <ContentBody>
            <SubTitle title={"사업장목록"} />
            <CustomDataGrid
                data={data}
                apiRef={apiRef} 
                columns={dummyColumns} 
                editable={false}
                slots={{ noRowsOverlay: NoRowsOverlay}}
                disableColumnMenu={true}
                disableRowSelectionOnClick
                columnHeaderHeight={40}
                rowHeight={30}
                autoHeight
                pageSize={5}
            />
        </ContentBody>
    )
}

export default FacilityList;
