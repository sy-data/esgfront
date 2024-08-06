import React, { useState, useCallback } from "react";
import CustomDataGrid from "./CalcGroupCustomDataGrid";
import CustomTextField from "./CustomTextField";

import { CustomCheckbox, headerStyle } from "./styles";
import { Snackbar } from "@mui/material";

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

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleGroupNameChange = useCallback((id, value) => {
    setEditingGroupNames((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  const handleGroupNameBlur = useCallback(
    (id) => {
      setData((prevState) =>
        prevState.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              groupName: editingGroupNames[id] || row.groupName,
            };
          }
          return row;
        })
      );
      setEditingGroupNames((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      handleSnackbarOpen();
    },
    [editingGroupNames, setData]
  );

  const handleDescriptionChange = useCallback((id, value) => {
    setEditingDescriptions((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  const handleDescriptionBlur = useCallback(
    (id) => {
      setData((prevState) =>
        prevState.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              description: editingDescriptions[id] || row.description,
            };
          }
          return row;
        })
      );
      setEditingDescriptions((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      handleSnackbarOpen();
    },
    [editingDescriptions, setData]
  );

  const handleDescriptionKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDescriptionBlur(id);
        setEditRowId(null);
      } else if (event.key === " ") {
        event.stopPropagation();
      }
    },
    [handleDescriptionBlur, setEditRowId]
  );

  const handleGroupNameKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleGroupNameBlur(id);
        setEditRowId(null);
      } else if (event.key === " ") {
        event.stopPropagation();
      }
    },
    [handleGroupNameBlur, setEditRowId]
  );

  const handleRowSelectionModelChange = useCallback(
    (rowIds) => {
      const isEditRow = rowIds[0] === editRowId;

      if (!isEditRow) {
        setSelectedRow(rowIds);
      }
    },
    [editRowId, setSelectedRow]
  );

  const handleRowDoubleClick = useCallback(
    (params) => {
      setEditRowId(params.row.id);
      setEditingDescriptions((prevState) => ({
        ...prevState,
        [params.row.id]: params.row.description || "",
      }));
      setEditingGroupNames((prevState) => ({
        ...prevState,
        [params.row.id]: params.row.groupName || "",
      }));
    },
    [setEditRowId]
  );

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
              onChange={(value) => handleGroupNameChange(params.id, value)}
              onKeyDown={(event) => handleGroupNameKeyPress(params.id, event)}
              onBlur={() => handleGroupNameBlur(params.id)}
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
              onChange={(value) => handleDescriptionChange(params.id, value)}
              onKeyDown={(event) => handleDescriptionKeyPress(params.id, event)}
              onBlur={() => handleDescriptionBlur(params.id)}
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
        onRowSelectionModelChange={handleRowSelectionModelChange}
        onRowDoubleClick={handleRowDoubleClick}
        components={{
          BaseCheckbox: CustomCheckbox,
        }}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="저장되었습니다."
      />
    </>
  );
};

export default ParameterGroupList;
