import React, { useCallback, useState } from "react";
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";
import { Select, MenuItem } from "@mui/material";
// import TextField from "@mui/material/TextField";
import CustomTextField from "./CustomTextField";

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

  //   const [descriptionText, setDescriptionText] = useState("");
  const [editingDescriptions, setEditingDescriptions] = useState({}); // 편집 중인 비고 내용을 상태로 관리

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
  // const handleChangeText = (id, value) => {
  //     setDescriptionText(value);
  //     setData(prevState => prevState.map((row) => {
  //         if (row.id === id) {
  //             return { ...row, description: value };
  //         }
  //         return row;
  //     }));
  // }

  // 비고 내용 변경 핸들러
  const handleDescriptionChange = useCallback((id, value) => {
    setEditingDescriptions((prevState) => ({
      ...prevState,
      [id]: value,
    })); // 편집 중인 비고 내용을 상태로 업데이트
  }, []);

  // 비고 내용 블러 핸들러
  const handleDescriptionBlur = useCallback(
    (id) => {
      setData((prevState) =>
        prevState.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              description: editingDescriptions[id] || row.description,
            }; // 편집 내용을 데이터에 반영
          }
          return row; // 선택된 행이 아니면 그대로 반환
        })
      );
      setEditingDescriptions((prevState) => {
        const newState = { ...prevState };
        delete newState[id]; // 편집 중인 상태에서 해당 ID를 삭제
        return newState;
      });
    },
    [editingDescriptions, setData]
  );

  // 비고 내용 키 프레스 핸들러
  const handleDescriptionKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDescriptionBlur(id); // 엔터 키를 누르면 블러 핸들러를 호출
        setEditRowId(null); // 편집 모드를 종료
      } else if (event.key === " ") {
        event.stopPropagation(); // 스페이스 키 입력을 막음
      }
    },
    [handleDescriptionBlur, setEditRowId]
  );

  // row 클릭
  const handleRowSelectionModelChange = useCallback(
    (rowIds) => {
      const isEditRow = rowIds[0] === editRowId;
      // 현재 수정중이 아닌 행을 선택했을때만 체크박스 선택
      if (!isEditRow) {
        setSelectedRow(rowIds);
      }
    },
    [editRowId, setSelectedRow]
  );

  // 행 더블 클릭 핸들러
  const handleRowDoubleClick = useCallback(
    (params) => {
      setEditRowId(params.row.id); // 더블 클릭한 행을 편집 모드로 설정
      setEditingDescriptions((prevState) => ({
        ...prevState,
        [params.row.id]: params.row.description || "",
      })); // 편집 중인 비고 내용을 상태로 업데이트
    },
    [setEditRowId]
  );

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
          return (
            <CustomTextField
              type={"text"}
              value={
                editingDescriptions[params.id] !== undefined
                  ? editingDescriptions[params.id]
                  : params.value || ""
              } // 편집 중인 비고 내용을 설정
              onChange={(value) => handleDescriptionChange(params.id, value)} // 비고 내용 변경 핸들러
              onKeyDown={(event) => handleDescriptionKeyPress(params.id, event)} // 키 프레스 핸들러
              onBlur={() => handleDescriptionBlur(params.id)} // 블러 핸들러
              placeholder={"비고내용"}
              autoFocus={true}
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
