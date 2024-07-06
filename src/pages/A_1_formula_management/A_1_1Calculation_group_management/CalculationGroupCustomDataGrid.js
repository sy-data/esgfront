import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { styled } from "@mui/material";
import Pagination from "./CalculationGroupPagination";
import { DataGrid } from "@mui/x-data-grid";

// 페이지네이션이 없는 DataGrid 스타일 정의
const NoPaginationDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
});

// 테이블 컨테이너 스타일 정의
const TableContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
});

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
        props.apiRef.current.startRowEditMode({ id: row.id });
        props.apiRef.current.setCellFocus(row.id, "name");
      } else {
        // 포커스를 설정하기 위해 페이지를 변경해야 하는 경우
        paginationRef.current.changePage(Math.ceil(row.index / pageSize));
        setFocusRow(row);
      }
    },
    changeToFirstPage: () => {
      if (paginationRef.current) {
        console.log("Changing to first page");
        paginationRef.current.changePage(1); // 첫 번째 페이지로 변경
      }
    },
  }));

  // 포커스 행이 변경된 후 포커스를 설정하는 효과
  useEffect(() => {
    if (focusRow) {
      props.apiRef.current.startRowEditMode({ id: focusRow.id });
      props.apiRef.current.setCellFocus(focusRow.id, "name");
      setFocusRow(null);
    }
  }, [focusRow, props.apiRef]);

  // 데이터가 변경될 때마다 rows를 설정하는 useEffect 훅
  useEffect(() => {
    setRows(data.slice(0, pageSize));
  }, [data, pageSize]);

  return (
    <TableContainer>
      <NoPaginationDataGrid rows={rows} {...otherProps} />
      <Pagination
        ref={paginationRef}
        data={data}
        pageSize={pageSize}
        setRows={setRows}
      />
    </TableContainer>
  );
};

export default forwardRef(CustomDataGrid);
