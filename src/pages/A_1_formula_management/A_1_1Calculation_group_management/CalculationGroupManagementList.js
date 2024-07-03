import React, { useState } from "react";
import CustomDataGrid from "../../../components/datagrid/CalculationGroupCustomDataGrid";
import { Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

export const parameterGroupListDummy = [
  { groupId: "0001", groupName: "산정식그룹" },
  { groupId: "0002", groupName: "활동량" },
  { groupId: "0003", groupName: "배출량" },
  { groupId: "0004", groupName: "에너지사용량" },
  { groupId: "0005", groupName: "산화계수" },
  { groupId: "0006", groupName: "발열량계" },
  { groupId: "0007", groupName: "배출계수" },
  { groupId: "0008", groupName: "기타계수" },
  { groupId: "0009", groupName: "원단위" },
  { groupId: "0010", groupName: "입주율" },
  { groupId: "0011", groupName: "단위변환" },
  { groupId: "0012", groupName: "기타그룹" },
];

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

  const [activeDescription, setActiveDescription] = useState({});

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

  const handleDescriptionChange = (id, value) => {
    setActiveDescription((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDescriptionBlur = (id) => {
    setData((prevState) =>
      prevState.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            description: activeDescription[id] || row.description,
          };
        }
        return row;
      })
    );
    setActiveDescription((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  const handleDescriptionKeyPress = (id, event) => {
    if (event.key === "Enter") {
      handleDescriptionBlur(id);
      event.target.blur();
    }
  };

  const handleRowSelectionModelChange = (rowIds) => {
    const isEditRow = rowIds[0] === editRowId;

    if (!isEditRow) {
      setSelectedRow(rowIds);
    }
  };

  const handleRowDoubleClick = (params) => {
    setEditRowId(params.row.id);
  };

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <span
          style={{
            color: "var(--Gray-757575, #757575)",
            fontFamily: "Pretendard Variable",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%" /* 19.5px */,
            letterSpacing: "-0.26px",
          }}
        >
          No
        </span>
      ),
    },
    {
      field: "groupId",
      headerName: "산정식ID",
      flex: 3,
      sortable: false,
      renderHeader: () => (
        <span
          style={{
            color: "var(--Gray-757575, #757575)",
            fontFamily: "Pretendard Variable",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%" /* 19.5px */,
            letterSpacing: "-0.26px",
          }}
        >
          산정식 ID
        </span>
      ),
    },
    {
      field: "groupName",
      headerName: "산정식그룹명",
      flex: 4,
      renderHeader: () => (
        <span
          style={{
            color: "var(--Gray-757575, #757575)",
            fontFamily: "Pretendard Variable",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%" /* 19.5px */,
            letterSpacing: "-0.26px",
          }}
        >
          산정식그룹명
        </span>
      ),
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
      renderHeader: () => (
        <span
          style={{
            color: "var(--Gray-757575, #757575)",
            fontFamily: "Pretendard Variable",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%" /* 19.5px */,
            letterSpacing: "-0.26px",
          }}
        >
          비고
        </span>
      ),
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId;
        const isAddRow = editRowId === -1 && params.row.id === data[0].id;
        if (isEditRow || isAddRow) {
          return (
            <TextField
              type={"text"}
              value={activeDescription[params.id] || params.row.description}
              onChange={(event) =>
                handleDescriptionChange(params.id, event.target.value)
              }
              placeholder={"비고내용"}
              onKeyPress={(event) =>
                handleDescriptionKeyPress(params.id, event)
              }
              onBlur={() => handleDescriptionBlur(params.id)}
              onClick={(event) => event.stopPropagation()}
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
    />
  );
};

export default ParameterGroupList;
