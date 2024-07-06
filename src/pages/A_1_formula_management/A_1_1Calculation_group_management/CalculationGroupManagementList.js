import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import CustomDataGrid from "./CalculationGroupCustomDataGrid";
import { Select, MenuItem, Checkbox, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

// 더미 데이터 정의
export const parameterGroupListDummy = [
  { id: 1, groupId: "0001", groupName: "산정식그룹" },
  { id: 2, groupId: "0002", groupName: "활동량" },
  { id: 3, groupId: "0003", groupName: "배출량" },
  { id: 4, groupId: "0004", groupName: "에너지사용량" },
  { id: 5, groupId: "0005", groupName: "산화계수" },
  { id: 6, groupId: "0006", groupName: "발열량계" },
  { id: 7, groupId: "0007", groupName: "배출계수" },
  { id: 8, groupId: "0008", groupName: "기타계수" },
  { id: 9, groupId: "0009", groupName: "원단위" },
  { id: 10, groupId: "0010", groupName: "입주율" },
  { id: 11, groupId: "0011", groupName: "단위변환" },
  { id: 12, groupId: "0012", groupName: "기타그룹" },
];

// 별도로 관리하는 TextField 컴포넌트
const CustomTextField = memo(({ id, value, onChange, onKeyDown, onBlur }) => {
  const [localValue, setLocalValue] = useState(value); // 로컬 상태로 TextField 값 관리
  const inputRef = useRef(); // input 참조

  useEffect(() => {
    setLocalValue(value); // value가 변경될 때마다 로컬 상태 업데이트
  }, [value]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // input에 포커스 설정
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len); // 커서를 텍스트 끝으로 이동
    }
  }, []);

  const handleChange = (event) => {
    setLocalValue(event.target.value); // 로컬 상태 업데이트
    onChange(event.target.value); // 부모 컴포넌트로 변경된 값 전달
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.stopPropagation(); //스페이스바 입력 무시
    }
    onKeyDown(e);
  };

  return (
    <TextField
      inputRef={inputRef}
      type={"text"}
      value={localValue}
      onChange={handleChange}
      placeholder={"비고내용"}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClick={(event) => event.stopPropagation()}
    />
  );
});

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

  const [editingDescriptions, setEditingDescriptions] = useState({}); // 비고(description) 필드의 편집 상태 관리

  // 그룹명을 선택하는 함수
  const handleSelectGroupName = (id, value) => {
    setData((prevState) =>
      prevState.map((row) => {
        if (row.id === id) {
          // 선택한 그룹명을 찾아서 그룹 ID와 그룹명을 업데이트
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

  // 비고(description) 필드의 변경을 처리하는 함수
  const handleDescriptionChange = useCallback((id, value) => {
    setEditingDescriptions((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  // 비고(description) 필드가 블러될 때 호출되는 함수
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

  // 엔터 키를 눌렀을 때 호출되는 함수
  const handleDescriptionKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDescriptionBlur(id); // 블러 이벤트 처리
        setEditRowId(null); // 편집 모드 해제
      } else if (event.key === " ") {
        event.stopPropagation(); // 스페이스바 입력 무시
      }
    },
    [handleDescriptionBlur, setEditRowId]
  );

  // 행 선택 모델이 변경될 때 호출되는 함수
  const handleRowSelectionModelChange = useCallback(
    (rowIds) => {
      const isEditRow = rowIds[0] === editRowId;

      if (!isEditRow) {
        setSelectedRow(rowIds);
      }
    },
    [editRowId, setSelectedRow]
  );

  // 행을 더블 클릭했을 때 호출되는 함수
  const handleRowDoubleClick = useCallback(
    (params) => {
      setEditRowId(params.row.id); // 해당 행을 편집 모드로 설정
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
        const isEditRow = params.row.id === editRowId; // 현재 행이 편집 모드인지 확인
        const isAddRow = editRowId === -1 && params.row.id === data[0].id; // 현재 행이 새로 추가된 행인지 확인
        if (isEditRow || isAddRow) {
          // 편집 모드이거나 새로 추가된 행인 경우
          return (
            <Select
              value={params.value} // 현재 셀의 값을 선택된 값으로 설정
              onChange={
                (event) => handleSelectGroupName(params.id, event.target.value) // 그룹명이 변경될 때 호출되는 함수
              }
            >
              {parameterGroupListDummy.map(({ groupId, groupName }) => (
                <MenuItem key={groupId} value={groupName}>
                  {groupName} {/* 각 그룹명을 선택 옵션으로 제공 */}
                </MenuItem>
              ))}
            </Select>
          );
        } else {
          // 편집 모드가 아닌 경우  셀의 값을 그대로 표시
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

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    width: 20,
    height: 20,
    "& svg": {
      width: 20,
      height: 20,
      "& rect": {
        fill: "white",
        stroke: "#E5E5E5",
      },
    },
  }));

  return (
    <CustomDataGrid
      apiRef={gridApiRef} // DataGrid의 API를 참조할 수 있도록 설정
      data={data} // 표시할 데이터 설정
      columns={columns} // 정의된 컬럼 설정
      checkboxSelection // 행 선택을 위한 체크박스 표시
      pageSize={15} // 페이지당 행의 수 설정
      rowSelectionModel={selectedRow} // 선택된 행 모델 설정
      onRowSelectionModelChange={handleRowSelectionModelChange} // 행 선택 모델이 변경될 때 호출되는 함수
      onRowDoubleClick={handleRowDoubleClick} // 행을 더블 클릭했을 때 호출되는 함수
      components={{
        BaseCheckbox: CustomCheckbox, // 기본 체크박스 컴포넌트를 커스텀 체크박스로 대체
      }}
    />
  );
};

export default ParameterGroupList;
