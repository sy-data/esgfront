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
        paginationRef.current.changePage(Math.ceil(row.index / pageSize));
        setFocusRow(row);
      }
    },
    changeToFirstPage: () => {
      paginationRef.current.changePage(1);
    },
  }));

  useEffect(() => {
    if (focusRow) {
      props.apiRef.current.startRowEditMode({ id: focusRow.id });
      props.apiRef.current.setCellFocus(focusRow.id, "name");
      setFocusRow(null);
    }
  }, [focusRow, rows]);

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
