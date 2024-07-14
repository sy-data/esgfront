import React, { useState, useCallback } from "react";
import CustomDataGrid from "./RegCalcFormulaDataGrid";
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

  const [editingDescriptions, setEditingDescriptions] = useState({}); // 편집 중인 비고 내용을 상태로 관리

  // 그룹 이름 선택 핸들러
  const handleSelectGroupName = (id, value) => {
    setData((prevState) =>
      prevState.map((row) => {
        if (row.id === id) {
          const selectedGroup = parameterGroupListDummy.find(
            ({ groupName }) => groupName === value
          ); // 선택된 그룹을 찾음
          return {
            ...row,
            groupId: selectedGroup.groupId,
            groupName: selectedGroup.groupName,
          }; // 선택된 그룹의 ID와 이름을 업데이트
        }
        return row; // 선택된 행이 아니면 그대로 반환
      })
    );
  };

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

  // 행 선택 모델 변경 핸들러
  const handleRowSelectionModelChange = useCallback(
    (rowIds) => {
      const isEditRow = rowIds[0] === editRowId;

      if (!isEditRow) {
        setSelectedRow(rowIds); // 선택된 행을 업데이트합니다.
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

  // 그리드 컬럼 정의
  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={headerStyle}>No</span>, // 헤더 스타일 적용
    },
    {
      field: "groupId",
      headerName: "산정식ID",
      flex: 3,
      sortable: false,
      renderHeader: () => <span style={headerStyle}>산정식 ID</span>, // 헤더 스타일 적용
    },
    {
      field: "groupName",
      headerName: "산정식그룹명",
      flex: 4,
      renderHeader: () => <span style={headerStyle}>산정식그룹명</span>, // 헤더 스타일 적용
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId; // 현재 행이 편집 모드인지 확인
        const isAddRow = editRowId === -1 && params.row.id === data[0].id; // 새로운 행인지 확인
        if (isEditRow || isAddRow) {
          return (
            <Select
              value={params.value}
              onChange={(event) =>
                handleSelectGroupName(params.id, event.target.value)
              } // 그룹 이름을 선택할 때의 핸들러
            >
              {parameterGroupListDummy.map(({ groupId, groupName }) => (
                <MenuItem key={groupId} value={groupName}>
                  {groupName}
                </MenuItem> // 드롭다운 메뉴 아이템을 렌더링
              ))}
            </Select>
          );
        } else {
          return params.value; // 편집 모드가 아니면 그룹 이름을 그대로 보여줌
        }
      },
      sortable: false,
    },
    {
      field: "description",
      headerName: "비고",
      flex: 3,
      renderHeader: () => <span style={headerStyle}>비고</span>, // 헤더 스타일 적용
      renderCell: (params) => {
        const isEditRow = params.row.id === editRowId; // 현재 행이 편집 모드인지 확인
        const isAddRow = editRowId === -1 && params.row.id === data[0].id; // 새로운 행인지 확인
        if (isEditRow || isAddRow) {
          return (
            <CustomTextField
              id={params.id}
              value={
                editingDescriptions[params.id] !== undefined
                  ? editingDescriptions[params.id]
                  : params.value || ""
              } // 편집 중인 비고 내용을 설정
              onChange={(value) => handleDescriptionChange(params.id, value)} // 비고 내용 변경 핸들러
              onKeyDown={(event) => handleDescriptionKeyPress(params.id, event)} // 키 프레스 핸들러
              onBlur={() => handleDescriptionBlur(params.id)} // 블러 핸들러
            />
          );
        } else {
          return params.value; // 편집 모드가 아니면 비고 내용을 그대로 보여줌
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
      onRowSelectionModelChange={handleRowSelectionModelChange} // 행 선택 모델 변경 핸들러
      onRowDoubleClick={handleRowDoubleClick} // 행 더블 클릭 핸들러
      components={{
        BaseCheckbox: CustomCheckbox, // 커스텀 체크박스 컴포넌트
      }}
    />
  );
};

export default ParameterGroupList;
