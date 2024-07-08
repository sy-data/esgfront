import React, { useState, useCallback } from "react";
import CustomDataGrid from "./CalcGroupCustomDataGrid";
import CustomTextField from "./CustomTextField";
import { Select, MenuItem } from "@mui/material";
import { parameterGroupListDummy } from "./constants";
import { CustomCheckbox, headerStyle } from "./styles";

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

  const handleSelectGroupName = (id, value) => {
    setData((prevState) =>
      prevState.map((row) => {
        if (row.id === id) {
          const selectedGroup = parameterGroupListDummy.find(
            ({ groupName }) => groupName === value
          );
          return {
            ...row,
            groupId: selectedGroup.groupId,
            groupName: selectedGroup.groupName,
          };
        }
        return row;
      })
    );
  };

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
            <Select
              value={params.value}
              onChange={(event) =>
                handleSelectGroupName(params.id, event.target.value)
              }
            >
              {parameterGroupListDummy.map(({ groupId, groupName }) => (
                <MenuItem key={groupId} value={groupName}>
                  {groupName}
                </MenuItem>
              ))}
            </Select>
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
              id={params.id}
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
  );
};

export default ParameterGroupList;
