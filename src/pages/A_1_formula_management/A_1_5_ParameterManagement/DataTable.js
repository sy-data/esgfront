import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Checkbox,
  TableCell,
} from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowData from "./TableRowData";
import { fetchParameterGroups, fetchParameterGroupDetails } from "./api";

const DataTable = ({
  data,
  selectedRows,
  allSelected,
  handleSelectAllRows,
  handleSelectRow,
  page,
  rowsPerPage,
  handleKeyDown,
  fetchParameterDetails,
}) => {
  const [parameterData, setParameterData] = useState({});

  useEffect(() => {
    const fetchParameterData = async () => {
      const groups = await fetchParameterGroups();
      if (groups.length > 0) {
        const groupDetails = await fetchParameterGroupDetails(groups[0].id);
        const parameterData = groupDetails.reduce((acc, item) => {
          acc[item.id] = item.parameter_id;
          return acc;
        }, {});
        setParameterData(parameterData);
      }
    };
    fetchParameterData();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 900, overflowX: "auto", maxWidth: 1200 }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                size="small"
                checked={allSelected}
                onChange={handleSelectAllRows}
                sx={{
                  display: "flex",
                  height: "50px",
                  borderBottom: "1px solid var(--Gray-e5e5e5, #E5E5E5)",
                  background: "var(--Gray-fff, #FFF)",
                }}
              />
            </TableCell>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRowData
              key={row.id}
              row={row}
              index={index}
              page={page}
              rowsPerPage={rowsPerPage}
              selectedRows={selectedRows}
              handleSelectRow={handleSelectRow}
              handleKeyDown={handleKeyDown}
              fetchParameterDetails={fetchParameterDetails} // 각 행에 함수 전달
              parameterData={parameterData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
