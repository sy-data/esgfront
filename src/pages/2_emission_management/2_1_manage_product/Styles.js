import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const NoPaginationDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-footerContainer': {
        display: 'none'
    }
});