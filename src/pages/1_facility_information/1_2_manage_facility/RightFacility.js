import React from 'react';
import { useRecoilValue } from "recoil";
import { Button, styled } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";

import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { SearchButtonContainer } from "../../../components/Styles";
import { SelectedFactoryId } from "./States";
import { esgFetch } from "../../../components/FetchWrapper.js";

const ButtonNewSave = styled(Button)(() => ({
  marginLeft: '5px'
}));

const NoRowsOverlay = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5px 0px', backgroundColor: '#808080' }}>
      <div style={{ fontSize: '16px' }}>조회 된 시설정보가 없습니다.</div>
    </div>
  )
};

const columns = [
  { field: 'id', headerName: 'No', flex: 1 },
  { field: 'name', headerName: '시설명', flex: 2, editable: true },
  { field: 'facility', headerName: '배출시설', flex: 2, editable: true, type: 'singleSelect', },
  // [todo] 규모 -> 확인 필요
  { field: 'size', headerName: '규모', flex: 2 },
  { field: 'should_report', headerName: '정보보고대상', flex: 2 },
  { field: 'expansion_date', headerName: '시설증설일', flex: 2, type: 'date', editable: true },
];

const RightFacility = () => {
  const apiRef = useGridApiRef();
  const [facilities, setFacilities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const selectedFactoryId = useRecoilValue(SelectedFactoryId);

  const getFacilities = async (factoryId) => {
    const fetchUrl = `/api/facilities?filters[factory][id][$eq]=${factoryId}&populate[]=type_facility`;
    return await esgFetch(fetchUrl).then(res => res.json());
  };

  const convertFacilitiesData = (facilitiesData) => {
    return facilitiesData.map(item => {
      const attributesData = item.attributes;
      const facilityType = attributesData.type_facility?.data?.attributes?.type || '';

      return {
        id: item.id,
        name: attributesData.name,
        facility: facilityType,
        size: attributesData.size,
        should_report: attributesData.should_report,
        expansion_date: new Date(attributesData.expansion_date),
        isEdit: false,
      }
    });
  };

  const handleAddButtonClick = () => {
    setFacilities({
      id: 2,
      name: '',
      facility: null,
      size: null,
      should_report: false,
      expansion_date: new Date(),
      isEdit: true,
    });
  };

  const handleDeleteButtonClick = () => {

  };

  const handleSaveButtonClick = () => {

  };

  React.useEffect(() => {
    if (!selectedFactoryId) return;

    (async () => {
      setLoading(true);

      const facilitiesData = await getFacilities(selectedFactoryId);
      setFacilities(convertFacilitiesData(facilitiesData.data));

      setLoading(false);
    })();
  }, [selectedFactoryId]);

  return (
    <ContentBody>
      <SubTitle title={"시설 정보"}>
        <SearchButtonContainer>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleAddButtonClick}>신규</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleDeleteButtonClick}>저장</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleSaveButtonClick}>삭제</ButtonNewSave>
        </SearchButtonContainer>
      </SubTitle>

      <CustomDataGrid
        data={facilities}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={5}
        editMode="row"
        checkboxSelection={true}
      />
    </ContentBody>
  )
};

export default RightFacility;
