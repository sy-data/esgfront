import React from "react";
import { Checkbox, TableCell } from "@mui/material";

const CheckboxColumn = ({ isItemSelected, handleCheckboxClick, row }) => {
  return (
    <TableCell>
      <Checkbox
        checked={isItemSelected} // 체크박스가 선택되었는지 여부를 설정
        onChange={(event) => handleCheckboxClick(event, row.no)} // 체크박스 상태가 변경될 때 호출될 함수 설정
      />
    </TableCell>
  );
};

export default CheckboxColumn;
