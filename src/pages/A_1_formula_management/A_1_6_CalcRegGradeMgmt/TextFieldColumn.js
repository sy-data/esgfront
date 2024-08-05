import React, { useCallback, useState, useEffect, memo } from "react";
import { TextField, TableCell } from "@mui/material";
import _ from "lodash";

const TextFieldColumn = ({
  row, // 현재 행의 데이터 객체
  handleActivityChange, // 텍스트 필드 값이 변경될 때 호출되는 함수
  handleActivityBlur, // 텍스트 필드가 포커스를 잃을 때 호출되는 함수
  handleActivityKeyPress, // 텍스트 필드에서 키를 눌렀을 때 호출되는 함수
  textFieldRef, // 텍스트 필드에 대한 참조
}) => {
  const [value, setValue] = useState(row.activity); // 텍스트 필드의 값을 상태로 관리

  useEffect(() => {
    setValue(row.activity); // 행의 activity 값이 변경되면 텍스트 필드의 값도 업데이트
  }, [row.activity]);

  const debouncedChangeHandler = useCallback(
    _.debounce((event) => {
      handleActivityChange(event, row.no); // 디바운스를 통해 변경 핸들러 호출
    }, 300),
    [handleActivityChange, row.no] // 의존성 배열에 handleActivityChange와 row.no 추가
  );

  const onChange = (event) => {
    setValue(event.target.value); // 입력 값 업데이트
    debouncedChangeHandler(event); // 디바운스된 변경 핸들러 호출
  };

  const onBlur = useCallback(
    (event) => {
      handleActivityBlur(event, row.no); // 블러 핸들러 호출
      event.target.blur(); // 포커스 잃게 하기
    },
    [handleActivityBlur, row.no] // 의존성 배열에 handleActivityBlur와 row.no 추가
  );

  const onKeyPress = useCallback(
    (event) => {
      handleActivityKeyPress(event, row.no); // 키 입력 핸들러 호출
      if (event.key === "Enter") {
        event.target.blur(); // Enter 키를 누르면 포커스 잃게 하기
      }
    },
    [handleActivityKeyPress, row.no] // 의존성 배열에 handleActivityKeyPress와 row.no 추가
  );

  return (
    <TableCell>
      <TextField
        fullWidth // 텍스트 필드가 테이블 셀의 전체 너비를 차지하도록 설정
        size="small" // 텍스트 필드의 크기를 작게 설정
        value={value} // 텍스트 필드의 값을 상태 값으로 설정
        onChange={onChange} // 값이 변경될 때 호출되는 핸들러 설정
        onBlur={onBlur} // 포커스를 잃을 때 호출되는 핸들러 설정
        onKeyPress={onKeyPress} // 키를 눌렀을 때 호출되는 핸들러 설정
        sx={{ width: 200 }} // 스타일 속성으로 필드의 너비를 200px로 설정
        inputRef={textFieldRef} // 텍스트 필드에 대한 참조 설정
      />
    </TableCell>
  );
};

export default memo(TextFieldColumn);
