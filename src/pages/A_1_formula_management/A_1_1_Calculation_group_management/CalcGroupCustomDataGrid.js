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

  useImperativeHandle(ref, () => ({
    focusRow: (row) => {
      if (rows.map((v) => v.id).includes(row.id)) {
        props.apiRef.current.startRowEditMode({ id: row.id });
        setTimeout(() => {
          props.apiRef.current.setCellFocus(row.id, "groupName"); // 'groupName' 셀에 포커스
        }, 0);
      } else {
        paginationRef.current.changePage(Math.ceil(row.index / pageSize));
        setFocusRow(row);
      }
    },
    changeToFirstPage: () => {
      if (paginationRef.current) {
        console.log("첫 페이지로 변경");
        paginationRef.current.changePage(1);
      }
    },
  }));

  useEffect(() => {
    if (focusRow) {
      props.apiRef.current.startRowEditMode({ id: focusRow.id });
      setTimeout(() => {
        props.apiRef.current.setCellFocus(focusRow.id, "groupName"); // 'groupName' 셀에 포커스
      }, 0);
      setFocusRow(null);
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
