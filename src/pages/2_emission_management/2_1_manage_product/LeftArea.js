import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useGridApiRef } from "@mui/x-data-grid";

import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import CustomDataGrid from "./CustomDataGrid.js";
import { UserCompanyId, SelectedYear, SelectedFactoryId } from "./States";
import { esgFetch } from "../../../components/FetchWrapper.js";

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
    const userCompanyId = useRecoilValue(UserCompanyId);
    const selectedYear = useRecoilValue(SelectedYear);
    const setSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

    // 사업장 목록 조회
    useEffect(() => {
        const url = `/api/factories?` + 
            `filters[company][id]=${userCompanyId}&` +
            `filters[company][createdAt][$gte]=${selectedYear}-01-01&` + 
            `filters[company][createdAt][$lte]=${selectedYear}-12-31`;
        esgFetch(url, 'GET').then(response => {
            if (response.ok) return response.json();
            else throw new Error(`${response.status} ${response.statusText}`);
        }).then(({data: value}) => {
            const newData = value.map((v, i) => {
                return {
                    index: i+1,
                    id: v.id,
                    name: v.attributes.name,
                    number: '111-11-11111' // TODO: 사업자 등록번호 수정 필요
                }
            });
            setData(newData);
        });
    }, [userCompanyId, selectedYear]);

    const dummyColumns = [
        { field: 'index', headerName: 'No', flex: 1 },
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
                columnHeaderHeight={40}
                rowHeight={30}
                autoHeight
                pageSize={5}
                onRowClick={(params) => setSelectedFacotyId(params.row.id)}
            />
        </ContentBody>
    )
}

export default FacilityList;
