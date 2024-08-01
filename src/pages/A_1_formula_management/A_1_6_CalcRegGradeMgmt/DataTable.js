import React from "react";
import {
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { data } from "./data";

const DataTable = () => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>배출활동</TableCell>
            <TableCell>배출시설규모</TableCell>
            <TableCell>규정산정등급</TableCell>
            <TableCell>사용량등급</TableCell>
            <TableCell>순발령등급</TableCell>
            <TableCell>배출계수등급</TableCell>
            <TableCell>산정계수등급</TableCell>
            <TableCell>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.no}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{row.activity}</TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">{row.emissionFacility}</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">{row.regulatoryGrade}</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">{row.usageGrade}</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">{row.netEmissionGrade}</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">{row.emissionCalcGrade}</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{row.calcDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
