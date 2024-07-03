import React, { useState } from "react";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
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

  const [descriptionText, setDescriptionText] = useState("");

  // 그룹명 선택
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

  // 비고 입력
  const handleChangeText = (id, value) => {
    setDescriptionText(value);
    setData((prevState) =>
      prevState.map((row) => {
        if (row.id === id) {
          return { ...row, description: value };
        }
        return row;
      })
    );
  };

  // row 클릭
  const handleRowSelectionModelChange = (rowIds) => {
    const isEditRow = rowIds[0] === editRowId;
    // 현재 수정중이 아닌 행을 선택했을때만 체크박스 선택
    if (!isEditRow) {
      setSelectedRow(rowIds);
    }
  };

  // row 더블 클릭
  const handleRowDoubleClick = (params) => {
    setEditRowId(params.row.id);
    setDescriptionText(params.row.description);
  };

  const columns = [
    { field: "no", headerName: "No", flex: 1, sortable: false },
    { field: "groupId", headerName: "그룹ID", flex: 2, sortable: false },
    {
      field: "groupName",
      headerName: "그룹명",
      flex: 10,
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
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId;
        const isAddRow = editRowId === -1 && params.row.id === data[0].id;
        if (isEditRow || isAddRow) {
          if (isAddRow) {
            setDescriptionText("");
          }
          return (
            <TextField
              type={"text"}
              value={descriptionText}
              onChange={(event) =>
                handleChangeText(params.id, event.target.value)
              }
              placeholder={"비고내용"}
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
