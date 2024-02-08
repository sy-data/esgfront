import React from 'react';
import { useRecoilValue } from "recoil";
import {
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress
} from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';

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

const generateRandomId = (ids, min, max) => {
  let randomId;
  do { randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (ids.includes(randomId));
  return randomId;
}

const RightFacility = () => {
  const apiRef = useGridApiRef();

  const [loading, setLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [facilities, setFacilities] = React.useState([]);
  const [facilityTypes, setFacilityTypes] = React.useState([]);

  const selectedFactoryId = useRecoilValue(SelectedFactoryId);

  const columns = React.useMemo(() => ([
    {
      field: 'index',
      headerName: 'No',
      flex: 1
    },
    {
      field: 'name',
      headerName: '시설명',
      flex: 2,
      editable: true
    },
    {
      field: 'facility',
      headerName: '배출시설',
      flex: 2,
      editable: true,
      type: 'singleSelect',
      valueOptions: facilityTypes.map(type => type.attributes.type)
    },
    // [todo] 규모 -> 확인 필요
    {
      field: 'size',
      headerName: '규모',
      flex: 2
    },
    {
      field: 'should_report',
      headerName: '정보보고대상',
      flex: 2,
      renderCell: (params) => <Checkbox checked={params.value} onChange={handleDataGridRowCheckboxUpdate(params.id)} />
    },
    {
      field: 'expansion_date',
      headerName: '시설증설일',
      flex: 2,
      type: 'date',
      editable: true
    }
  ]), [facilityTypes]);

  const facilityIds = facilities.map(item => item.id);
  const dataGridFacilitiesData = React.useMemo(() => {
    return facilities.map((item, index) => ({ ...item, index: index + 1 }));
  }, [facilities]);

  const getFacilities = async (factoryId) => {
    const fetchUrl = `/api/facilities?filters[factory][id][$eq]=${factoryId}&populate[]=type_facility&sort[0]=id:asc`;
    return await esgFetch(fetchUrl, 'GET').then(res => res.json());
  };

  const getFacilityTypes = async () => {
    const fetchUrl = '/api/type-facilities';
    return await esgFetch(fetchUrl, 'GET').then(res => res.json());
  };

  const initializeFacilityData = async () => {
    // 배출 시설 fetch
    const facilityTypesData = await getFacilityTypes();
    setFacilityTypes(facilityTypesData.data);

    // 시설 정보 fetch
    const facilitiesData = await getFacilities(selectedFactoryId);
    setFacilities(convertFacilitiesData(facilitiesData.data));
  }

  const createFacilities = async (facilitiesData) => {
    const noNameData = facilitiesData.some(item => !item.name);
    const promises = [];

    if (noNameData) {
      alert('시설명을 입력해주세요.');
      return;
    }

    facilitiesData.forEach((item) => {
      const typeFacilityValue = facilityTypes.find(type => type.attributes.type === item.facility)?.id;
      const requestBody = {
        data: {
          name: item.name,
          factory: { id: selectedFactoryId },
          type_facility: { id: typeFacilityValue },
          size: item.size,
          should_report: item.should_report,
          expansion_date: item.expansion_date
        }
      };

      promises.push(esgFetch(`/api/facilities`, 'POST', requestBody));
    });

    const result = await Promise.all(promises);
    const isError = result.some(item => !item.ok);
    if (isError) alert('일부 시설 정보를 저장하는 중 오류가 발생하였습니다.')
    else alert('저장이 완료되었습니다.');
  };

  const updateFacilities = async (facilitiesData) => {
    const noNameData = facilitiesData.some(item => !item.name);
    const promises = [];

    if (noNameData) {
      alert('시설명을 입력해주세요.');
      return;
    }

    facilitiesData.forEach((item) => {
      const typeFacilityValue = facilityTypes.find(type => type.attributes.type === item.facility)?.id;
      const requestBody = {
        data: {
          name: item.name,
          factory: { id: selectedFactoryId },
          type_facility: { id: typeFacilityValue },
          size: item.size,
          should_report: item.should_report,
          expansion_date: item.expansion_date
        }
      };

      promises.push(esgFetch(`/api/facilities/${item.id}`, 'PUT', requestBody));
    });

    const result = await Promise.all(promises);
    const isError = result.some(item => !item.ok);
    if (isError) alert('일부 시설 정보를 저장하는 중 오류가 발생하였습니다.')
    else alert('저장이 완료되었습니다.');
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
        status: 'default',
      }
    });
  };

  const handleAddButtonClick = () => {
    setFacilities((prev) => [...prev, {
      id: generateRandomId(facilityIds,  1, 100000),
      name: '',
      facility: facilityTypes[0].attributes.type,
      size: 'big', // [todo] 규모 -> 확인 필요
      should_report: false,
      expansion_date: new Date(),
      status: 'new',
    }]);
  };

  const handleDeleteButtonClick = () => {
    const selectedRows = apiRef.current.getSelectedRows();

    if ([...selectedRows.values()].length === 0) {
      alert('삭제할 시설을 선택하지 않았습니다.');
      return;
    }

    setOpenDeleteDialog(true);
  };

  const handleSaveButtonClick = async () => {
    const addedRows = facilities.filter(item => item.status === 'new');
    const updatedRows = facilities.filter(item => item.status === 'update');

    if (addedRows.length > 0) await createFacilities(addedRows);
    if (updatedRows.length > 0) await updateFacilities(updatedRows);

    await initializeFacilityData();
    apiRef.current.setRowSelectionModel([]);
  };

  const handleDataGridRowUpdate = (updatedRowData) => {
    setFacilities(prev => prev.map((data) => {
      const isNewRow = data.status === 'new';
      if (data.id === updatedRowData.id) return { ...updatedRowData, ...(!isNewRow ? { status: 'update' } : {}) };
      return data;
    }));

    return updatedRowData;
  };

  const handleDataGridRowCheckboxUpdate = (rowId) => () => {
    setFacilities((prev) => prev.map((data) => {
      const isNewRow = data.status === 'new';
      if (data.id !== rowId) return data;
      return { ...data, should_report: !data.should_report, ...(!isNewRow ? { status: 'update' } : {}) };
    }));
  };

  const handleCloseDialog = () => setOpenDeleteDialog(false);
  const handleDeleteConfirmButtonClick = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    const selectedIds = [...selectedRows.values()].map(row => row.id);
    const deleteFetchRowIds = selectedIds.filter(id => {
        const row = facilities.find(facility => facility.id === id);
        return row.status !== 'new';
    })

    const promises = deleteFetchRowIds.map((id) => esgFetch(`/api/facilities/${id}`, 'DELETE'));
    const result = await Promise.all(promises);
    const isError = result.some(item => !item.ok);
    if (isError) alert('일부 시설 정보를 삭제하는 중 오류가 발생하였습니다.')
    else alert('삭제가 완료되었습니다.');

    setFacilities((prev) => prev.filter(item => !selectedIds.includes(item.id)));
    handleCloseDialog();
  }

  React.useEffect(() => {
    if (!selectedFactoryId) return;

    (async () => {
      setLoading(true);
      await initializeFacilityData();
      setLoading(false);
    })();
  }, [selectedFactoryId]);

  return (
    <ContentBody>
      <SubTitle title={"시설 정보"}>
        <SearchButtonContainer>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleAddButtonClick}>신규</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleSaveButtonClick}>저장</ButtonNewSave>
          <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={handleDeleteButtonClick}>삭제</ButtonNewSave>
        </SearchButtonContainer>
      </SubTitle>

      <CustomDataGrid
        data={dataGridFacilitiesData}
        apiRef={apiRef}
        columns={columns}
        editable={false}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          loadingOverlay: LinearProgress
        }}
        loading={loading}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        rowHeight={30}
        autoHeight
        pageSize={20}
        editMode="row"
        checkboxSelection={true}
        processRowUpdate={handleDataGridRowUpdate}
      />

      {/** 시설 정보 삭제 dialog */}
      <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          시설정보 삭제하기
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            선택하신 시설정보를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleDeleteConfirmButtonClick} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </ContentBody>
  )
};

export default RightFacility;
