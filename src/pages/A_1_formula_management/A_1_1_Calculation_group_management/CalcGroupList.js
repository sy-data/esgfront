import React, { useState, useCallback, useMemo } from "react";
import CustomDataGrid from "./CalcGroupCustomDataGrid";
import CustomTextField from "./CustomTextField";
import CustomToolbar from "./CustomToolbar";
import { CustomCheckbox, headerStyle } from "./styles";
import { Snackbar } from "@mui/material";
import { handleSnackbarOpen, handleSnackbarClose } from "./snackbarHandlers";
import {
  handleGroupNameChange,
  handleGroupNameBlur,
  handleGroupNameKeyPress,
} from "./groupNameHandlers";
import {
  handleDescriptionChange,
  handleDescriptionBlur,
  handleDescriptionKeyPress,
} from "./descriptionHandlers";
import {
  handleRowSelectionModelChange,
  handleRowDoubleClick,
} from "./rowHandlers";

const ParameterGroupList = (props) => {
  const {
    gridApiRef,
    data,
    setData,
    selectedRow,
    setSelectedRow,
    editRowId,
    setEditRowId,
  } = props;

  const [editingDescriptions, setEditingDescriptions] = useState({});
  const [editingGroupNames, setEditingGroupNames] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={headerStyle}>No</span>,
    },
    {
      field: "groupId",
      headerName: "산정식ID",
      flex: 3,
      sortable: false,
      renderHeader: () => <span style={headerStyle}>산정식 ID</span>,
    },
    {
      field: "groupName",
      headerName: "산정식그룹명",
      flex: 4,
      renderHeader: () => <span style={headerStyle}>산정식그룹명</span>,
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId;
        const isAddRow = editRowId === -1 && params.row.id === data[0].id;
        if (isEditRow || isAddRow) {
          return (
            <CustomTextField
              value={
                editingGroupNames[params.id] !== undefined
                  ? editingGroupNames[params.id]
                  : params.value || ""
              }
              onChange={(value) =>
                handleGroupNameChange(params.id, value, setEditingGroupNames)
              }
              onKeyDown={(event) =>
                handleGroupNameKeyPress(
                  params.id,
                  event,
                  setEditRowId,
                  setData,
                  editingGroupNames,
                  setEditingGroupNames,
                  () => handleSnackbarOpen(setOpenSnackbar)
                )
              }
              onBlur={() =>
                handleGroupNameBlur(
                  params.id,
                  setData,
                  editingGroupNames,
                  setEditingGroupNames,
                  () => handleSnackbarOpen(setOpenSnackbar)
                )
              }
              placeholder="산정식그룹 입력"
              autoFocus={isAddRow} // 새로운 행일 경우 autoFocus를 true로 설정
            />
          );
        } else {
          return params.value;
        }
      },
      sortable: false,
    },
    {
      field: "description",
      headerName: "비고",
      flex: 3,
      renderHeader: () => <span style={headerStyle}>비고</span>,
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId;
        const isAddRow = editRowId === -1 && params.row.id === data[0].id;
        if (isEditRow || isAddRow) {
          return (
            <CustomTextField
              value={
                editingDescriptions[params.id] !== undefined
                  ? editingDescriptions[params.id]
                  : params.value || ""
              }
              onChange={(value) =>
                handleDescriptionChange(
                  params.id,
                  value,
                  setEditingDescriptions
                )
              }
              onKeyDown={(event) =>
                handleDescriptionKeyPress(
                  params.id,
                  event,
                  setEditRowId,
                  setData,
                  editingDescriptions,
                  setEditingDescriptions,
                  () => handleSnackbarOpen(setOpenSnackbar)
                )
              }
              onBlur={() =>
                handleDescriptionBlur(
                  params.id,
                  setData,
                  editingDescriptions,
                  setEditingDescriptions,
                  () => handleSnackbarOpen(setOpenSnackbar)
                )
              }
            />
          );
        } else {
          return params.value;
        }
      },
      sortable: false,
    },
  ];

  return (
    <>
      <CustomDataGrid
        apiRef={gridApiRef}
        data={data}
        columns={columns}
        checkboxSelection
        pageSize={15}
        rowSelectionModel={selectedRow}
        onRowSelectionModelChange={(rowIds) =>
          handleRowSelectionModelChange(rowIds, editRowId, setSelectedRow)
        }
        onRowDoubleClick={(params) =>
          handleRowDoubleClick(
            params,
            setEditRowId,
            setEditingDescriptions,
            setEditingGroupNames
          )
        }
        components={{
          BaseCheckbox: CustomCheckbox,
          Toolbar: CustomToolbar,
        }}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={(event, reason) =>
          handleSnackbarClose(event, reason, setOpenSnackbar)
        }
        message="저장되었습니다."
      />
    </>
  );
};

export default ParameterGroupList;
