import React, {useState, useCallback, useMemo} from "react";
import CustomDataGrid from "./RegCalcFormulaDataGrid";
import CustomTextField from "./CustomTextField";
import {CustomCheckbox, headerStyle} from "./styles";

const RegCalcFormulaList = (props) => {
  const {
    gridApiRef,
    data,
    setData,
    selectedRow,
    setSelectedRow,
    editRowId,
    setEditRowId,
    currentDepth,
    customDataGridRef,
  } = props;

  const [editingInput, setEditingInput] = useState({}); // 편집 중인 내용을 상태로 관리

  // 그룹 이름 선택 핸들러
  const handleChangeName = useCallback((id, value) => {
    setEditingInput((prevState) => ({
      ...prevState,
      [id]: {...prevState[id], formulaName: value},
    })); // 편집 중인 산정식명을 상태로 업데이트
  }, []);

  // 비고 내용 변경 핸들러
  const handleChangeDescription = useCallback((id, value) => {
    setEditingInput((prevState) => ({
      ...prevState,
      [id]: {...prevState[id], description: value},
    })); // 편집 중인 비고 내용을 상태로 업데이트
  }, []);

  // 인풋 블러 핸들러
  const handleBlur = useCallback(
    (id) => {
      // data 에 저장
      setData(prevState => prevState.map((row) => {
        if (row.id === id) {
          const hasEditingInput = editingInput[id] !== undefined;
          return {
            ...row,
            formulaName: hasEditingInput ? editingInput[id].formulaName : row.formulaName,
            description: hasEditingInput ? editingInput[id].description : row.description,
          };
        }
        return row;
      }));
      // 편집 중인 상태에서 해당 ID를 삭제
      setEditingInput((prevState) => {
        const newState = {...prevState};
        delete newState[id]; // 편집 중인 상태에서 해당 ID를 삭제
        return newState;
      });
      setEditRowId(null); // 편집 모드를 종료
    },
    [editingInput, setData, setEditRowId]
  );

  // 산정식명 키 프레스 핸들러
  const handleNameKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur(id); // 엔터 키를 누르면 블러 핸들러를 호출
      } else if (event.key === " ") {
        event.stopPropagation(); // 스페이스 키 입력을 막음
      }
    },
    [handleBlur]
  );

  // 비고 내용 키 프레스 핸들러
  const handleDescriptionKeyPress = useCallback(
    (id, event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur(id); // 엔터 키를 누르면 블러 핸들러를 호출
        setEditRowId(null); // 편집 모드를 종료
      } else if (event.key === " ") {
        event.stopPropagation(); // 스페이스 키 입력을 막음
      }
    },
    [handleBlur, setEditRowId]
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
      const {id, formulaName, description} = params.row;
      setEditRowId(id); // 더블 클릭한 행을 편집 모드로 설정
      setEditingInput((prevState) => ({
        ...prevState,
        [id]: {formulaName: formulaName || "", description: description || ""},
      })); // 편집 중인 산정식명을 상태로 업데이트

    },
    [setEditRowId]
  );

  const renderCell = useCallback((params) => {
    // 산정식명 cell 인가? 아니면 비고임.
    const isNameCell = params.field === 'formulaName';
    // 산정식명/비고 에 따른 커스텀 props 설정
    const customProps = isNameCell ? {
      value: editingInput[params.id] === undefined ? params.value : editingInput[params.id].formulaName,
      placeholder: '산정식명',
      onChange: (value) => handleChangeName(params.id, value),
      onKeyDown: (event) => handleNameKeyPress(params.id, event),
    } : {
      value: editingInput[params.id] === undefined ? params.value : editingInput[params.id].description,
      placeholder: '비고내용',
      onChange: (value) => handleChangeDescription(params.id, value),
      onKeyDown: (event) => handleDescriptionKeyPress(params.id, event),
    }

    const isEditRow = params.row.id === editRowId; // 현재 행이 편집 모드인지 확인
    const isAddRow = editRowId === -1 && params.row.id === data.at(-1).id; // 새로운 행인지 확인
    if (isEditRow || isAddRow) {
      return (
        <CustomTextField
          value={customProps.value}
          onChange={customProps.onChange} // 비고 내용 변경 핸들러
          onKeyDown={customProps.onKeyDown} // 키 프레스 핸들러
          onBlur={() => handleBlur(params.id)} // 블러 핸들러
          placeholder={customProps.placeholder}
        />
      );
    } else {
      return params.value;
    }
  }, [data, editRowId, editingInput, handleBlur, handleChangeDescription, handleChangeName, handleDescriptionKeyPress, handleNameKeyPress])


  const getColumns = useMemo(() => {
    // depth 1 과 234 가 컬럼이 다름
    switch (currentDepth) {
      case 1:
        return [
          {field: 'no', headerName: 'No', flex: 1, sortable: false, renderHeader: () => renderHeader('No')},
          {
            field: 'formulaId',
            headerName: '산정식ID',
            flex: 2,
            sortable: false,
            renderHeader: () => renderHeader('산정식ID')
          },
          {
            field: 'formulaName',
            headerName: '산정식명',
            flex: 10,
            sortable: false,
            renderHeader: () => renderHeader('산정식명'),
            renderCell
          },
          {
            field: 'description',
            headerName: '비고',
            flex: 3,
            sortable: false,
            renderHeader: () => renderHeader('비고'),
            renderCell
          },
        ]
      case 2:
      case 3:
      case 4:
        return [
          {field: 'no', headerName: 'No', flex: 1, sortable: false, renderHeader: () => renderHeader('No')},
          {
            field: 'formulaId',
            headerName: '산정식ID',
            flex: 3,
            sortable: false,
            renderHeader: () => renderHeader('산정식ID')
          },
          {
            field: 'formulaName',
            headerName: '산정식명',
            flex: 3,
            sortable: false,
            renderHeader: () => renderHeader('산정식명'),
            renderCell
          },
          {field: 'isActive', headerName: '사용여부', flex: 3, sortable: false, renderHeader: () => renderHeader('사용여부')},
          {
            field: 'formulaVersion',
            headerName: '산정식버전',
            flex: 2,
            sortable: false,
            renderHeader: () => renderHeader('산정식버전')
          },
          {
            field: 'description',
            headerName: '비고',
            flex: 2,
            sortable: false,
            renderHeader: () => renderHeader('비고'),
            renderCell
          },
        ]
      default:
        return []
    }
  },[currentDepth, renderCell])


  return (
    <CustomDataGrid
      ref={customDataGridRef}
      apiRef={gridApiRef}
      data={data}
      columns={getColumns}
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

export default RegCalcFormulaList;

const renderHeader = (headerName) => <span style={headerStyle}>{headerName}</span>;

