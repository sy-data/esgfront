import React, { useMemo, useState } from "react";
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
import { useRecoilState } from "recoil";
import { baseInformationFileAtom } from "../../../States/3_activtiy_data_states/3-1_activity_data_add_atom";

const InformationAddModal = ({ isModalOpen, onClose }) => {
  const apiRef = useGridApiRef();
  const [file, setFile] = useRecoilState(baseInformationFileAtom);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "No", flex: 1 },
      { field: "fileName", headerName: "파일명" },
      { field: "fileSize", headerName: "파일 크기" },
    ],
    []
  );

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      // 파일 정보를 상태에 추가
      const updatedFiles = [...file];
      for (let i = 0; i < selectedFiles.length; i++) {
        const newFile = {
          id: file.length + i + 1, // 고유 ID 생성
          fileName: selectedFiles[i].name,
          fileSize: `${(selectedFiles[i].size / 1024).toFixed(2)} KB`, // 파일 크기 KB 단위로 변환
        };
        updatedFiles.push(newFile);
      }

      setFile(updatedFiles);
    }
  };

  const handleDelete = () => {
    // 선택된 행을 상태에서 제거

    const newFiles = file.filter((f) => !selectionModel.includes(f.id));
    setFile(newFiles);
    setSelectionModel([]); // 선택 초기화
  };

  return (
    <Dialog open={Boolean(isModalOpen)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        파일 등록
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <input
            accept="*/*" // 필요에 따라 파일 타입 제한
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileSelect}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" sx={{ mr: 1 }}>
              추가
            </Button>
          </label>
          <Button variant="outlined" color="error" onClick={handleDelete}>
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
            checkboxSelection
            onSelectionModelChange={(newRowSelectionModel) => {
              setSelectionModel(newRowSelectionModel);
            }}
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
