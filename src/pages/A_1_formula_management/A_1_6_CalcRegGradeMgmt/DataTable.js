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

const data = [
  {
    no: 1,
    activity: "고체연료연소",
    emissionFacility: "A그룹",
    regulatoryGrade: "A그룹",
    usageGrade: "Tier 1",
    netEmissionGrade: "Tier 1",
    emissionCalcGrade: "Tier 1",
    calcDate: "2024-02-03",
  },
  {
    no: 2,
    activity: "고체연료연소",
    emissionFacility: "A그룹",
    regulatoryGrade: "A그룹",
    usageGrade: "Tier 1",
    netEmissionGrade: "Tier 1",
    emissionCalcGrade: "Tier 1",
    calcDate: "2024-02-03",
  },
  {
    no: 3,
    activity: "고체연료연소",
    emissionFacility: "A그룹",
    regulatoryGrade: "A그룹",
    usageGrade: "Tier 1",
    netEmissionGrade: "Tier 1",
    emissionCalcGrade: "Tier 1",
    calcDate: "2024-02-03",
  },
  {
    no: 4,
    activity: "고체연료연소",
    emissionFacility: "A그룹",
    regulatoryGrade: "A그룹",
    usageGrade: "Tier 1",
    netEmissionGrade: "Tier 1",
    emissionCalcGrade: "Tier 1",
    calcDate: "2024-02-03",
  },
  {
    no: 5,
    activity: "고체연료연소",
    emissionFacility: "A그룹",
    regulatoryGrade: "A그룹",
    usageGrade: "Tier 1",
    netEmissionGrade: "Tier 1",
    emissionCalcGrade: "Tier 1",
    calcDate: "2024-02-03",
  },
];

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
