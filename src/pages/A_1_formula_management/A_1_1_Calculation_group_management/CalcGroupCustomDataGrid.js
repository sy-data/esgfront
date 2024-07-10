import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import Pagination from "./CalcGroupPagination";

import { NoPaginationDataGrid, TableContainer } from "./styles";

const CustomDataGrid = (props, ref) => {
  const { data = [], pageSize, ...otherProps } = props; // props에서 data와 pageSize를 추출하며, data의 기본값을 빈 배열로 설정
  const [rows, setRows] = useState([]); // 현재 페이지에 표시될 행 상태
  const [focusRow, setFocusRow] = useState(null); // 포커스가 설정될 행 상태
  const paginationRef = useRef(null); // 페이지네이션 참조 생성

  // 부모 컴포넌트에서 호출할 수 있는 함수들 정의
  useImperativeHandle(ref, () => ({
    focusRow: (row) => {
      // 만약 현재 페이지에 포커스할 행이 존재하면 포커스 설정
      if (rows.map((v) => v.id).includes(row.id)) {
        props.apiRef.current.startRowEditMode({ id: row.id }); // 행 편집 모드 시작
        props.apiRef.current.setCellFocus(row.id, "name"); // 특정 셀에 포커스 설정
      } else {
        // 포커스를 설정하기 위해 페이지를 변경해야 하는 경우
        paginationRef.current.changePage(Math.ceil(row.index / pageSize)); // 페이지 변경
        setFocusRow(row); // 포커스 행 설정
      }
    },
    changeToFirstPage: () => {
      if (paginationRef.current) {
        console.log("첫 페이지로 변경"); // 디버그용 메시지 출력
        paginationRef.current.changePage(1); // 첫 번째 페이지로 변경
      }
    },
  }));

  // 포커스 행이 변경된 후 포커스를 설정하는 효과
  useEffect(() => {
    if (focusRow) {
      props.apiRef.current.startRowEditMode({ id: focusRow.id }); // 행 편집 모드 시작
      props.apiRef.current.setCellFocus(focusRow.id, "name"); // 특정 셀에 포커스 설정
      setFocusRow(null); // 포커스 행 초기화
    }
  }, [focusRow, props.apiRef]);

  // 데이터가 변경될 때마다 rows를 설정하는 useEffect 훅
  useEffect(() => {
    setRows(data.slice(0, pageSize)); // 현재 페이지에 맞는 데이터 설정
  }, [data, pageSize]);

  return (
    <TableContainer>
      {/* 페이지네이션 없는 DataGrid 렌더링 */}
      <NoPaginationDataGrid rows={rows} {...otherProps} />
      <Pagination
        ref={paginationRef} // 페이지네이션 참조 설정
        data={data} // 전체 데이터 전달
        pageSize={pageSize} // 페이지 크기 전달
        setRows={setRows} // rows 설정 함수 전달
      />
    </TableContainer>
  );
};

export default forwardRef(CustomDataGrid);
