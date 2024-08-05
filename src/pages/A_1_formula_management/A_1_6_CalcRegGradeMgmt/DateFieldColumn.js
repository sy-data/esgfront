import React from "react";
import { TextField, TableCell } from "@mui/material";

const DateFieldColumn = ({ row, handleDateChange, handleDateKeyPress }) => {
  return (
    <TableCell>
      <TextField
        fullWidth // TextField가 테이블 셀의 전체 너비를 차지하도록 설정
        size="small" // TextField의 크기를 작게 설정
        type="date" // 입력 유형을 날짜로 설정
        value={row.calcDate} // 입력 필드의 값을 행의 calcDate 값으로 설정
        onChange={(event) => handleDateChange(event, row.no)} // 값이 변경될 때 호출되는 핸들러 설정
        onKeyPress={(event) => handleDateKeyPress(event)} // 키를 눌렀을 때 호출되는 핸들러 설정
        sx={{ width: 200 }} // 스타일 속성으로 필드의 너비를 200px로 설정
      />
    </TableCell>
  );
};

export default DateFieldColumn;
