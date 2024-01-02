import { useState } from 'react';

import Pagination from "./Pagination.js";

import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const NoPaginationDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-footerContainer': {
        display: 'none'
    }
});

const TableContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
});

const CustomDataGrid = (props) => {
    const { data, pageSize, ...rest } = props;
    const [rows, setRows] = useState([]);

    return (
        <TableContainer>
            <NoPaginationDataGrid
                rows={rows}
                {...rest}
            />
            <Pagination
                data={data}
                pageSize={pageSize}
                setRows={setRows}
            />
        </TableContainer>
    )
}

export default CustomDataGrid;
