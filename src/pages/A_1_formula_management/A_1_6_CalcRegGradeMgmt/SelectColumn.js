import React from "react";
import { FormControl, MenuItem, Select, TableCell } from "@mui/material";

const SelectColumn = ({ row, handleSelectChange, field, options }) => {
  return (
    <TableCell>
      <FormControl fullWidth size="small">
        {/* 전체 너비와 작은 크기로 설정된 폼 컨트롤 */}
        <Select
          value={row[field]} // 셀렉트 박스의 값을 현재 행의 해당 필드 값으로 설정
          onChange={(event) => handleSelectChange(event, row.no, field)} // 값이 변경될 때 호출되는 핸들러 설정
        >
          {options.map(
            (
              option,
              index // 주어진 옵션 목록을 반복하여 MenuItem 생성
            ) => (
              <MenuItem key={index} value={option}>
                {/* 각 옵션에 대해 MenuItem 생성 */}
                {option} {/* 옵션 값을 표시 */}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </TableCell>
  );
};

export default SelectColumn; // SelectColumn 컴포넌트 export
