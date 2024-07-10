import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import Pagination from "./Pagination.js";

import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const NoPaginationDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
});

const TableContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
});

const CustomDataGrid = (props, ref) => {
  const { data, pageSize, ...otherProps } = props;
  const [rows, setRows] = useState([]);
  const [focusRow, setFocusRow] = useState(null);
  const paginationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusRow: (row) => {
      if (rows.map((v) => v.id).includes(row.id)) {
        props.apiRef.current.startRowEditMode({ id: row.id });
        props.apiRef.current.setCellFocus(row.id, "name");
      } else {
        // 포커스를 맞추기 위해 페이지를 변경해야 하는 경우
        paginationRef.current.changePage(Math.ceil(row.index / pageSize));
        setFocusRow(row);
      }
    },
    changeToFirstPage: () => {
      if (paginationRef.current) {
        console.log("첫 페이지로 변경"); // 디버그용 메시지 출력
        paginationRef.current.changePage(1); // 첫 번째 페이지로 변경
      }
    },
  }));

  // 페이지 변경 후 포커스 설정
  useEffect(() => {
    if (focusRow) {
      props.apiRef.current.startRowEditMode({ id: focusRow.id });
      props.apiRef.current.setCellFocus(focusRow.id, "name");
      setFocusRow(null);
    }
  }, [focusRow, props.apiRef]);

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
