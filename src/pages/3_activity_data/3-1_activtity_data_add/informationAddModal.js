import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid"; // 데이터 그리드를 사용하기 위해
import CustomDataGrid from "../../../components/datagrid/CustomDataGrid";

const InformationAddModal = ({ file, onClose, dataGridRows, dataGridColumns }) => {
  const apiRef = useGridApiRef();

  const columns = useMemo(
    () => [
      { field: "id", headerName: "No", flex: 1 },
      { field: "fileName", headerName: "파일명" },
      { field: "fileSize", headerName: "파일 크기" },
    ],
    []
  );

  return (
    <Dialog open={Boolean(file)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        파일 등록
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>
            추가
          </Button>
          <Button variant="outlined" color="error">
            삭제
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <CustomDataGrid
            apiRef={apiRef}
            data={file}
            columns={columns}
            rowHeight={30}
            autoHeight
            disableColumnMenu={true}
            columnHeaderHeight={40}
            pageSize={5}
          />
        </div>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          최대 100개 / 파일당 최대 20MB, 총 100MB까지 업로드 가능합니다.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} fullWidth variant="contained" color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformationAddModal;
