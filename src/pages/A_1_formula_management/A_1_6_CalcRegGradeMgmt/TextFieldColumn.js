import React, { useCallback, useState, useEffect, useRef, memo } from "react";
import { TextField, TableCell } from "@mui/material";
import _ from "lodash";

const textFieldStyles = { width: 200 };

const TextFieldColumn = ({
  row,
  handleActivityChange,
  handleActivityBlur,
  handleActivityKeyPress,
  textFieldRef,
}) => {
  const [value, setValue] = useState(row.activity);

  const debouncedChangeHandler = useRef(
    _.debounce((event) => {
      handleActivityChange(event, row.no);
    }, 300)
  ).current;

  // row.activity가 변경될 때마다 value를 업데이트
  useEffect(() => {
    setValue(row.activity);
  }, [row.activity]);

  // onChange 핸들러 함수
  const onChange = useCallback(
    (event) => {
      setValue(event.target.value); // 입력 값 업데이트
      debouncedChangeHandler(event); // 디바운스된 변경 핸들러 호출
    },
    [debouncedChangeHandler]
  );

  // onBlur 핸들러 함수
  const onBlur = useCallback(
    (event) => {
      handleActivityBlur(event, row.no); // 블러 핸들러 호출
      event.target.blur(); // 포커스 잃게 하기
    },
    [handleActivityBlur, row.no]
  );

  // onKeyPress 핸들러 함수
  const onKeyPress = useCallback(
    (event) => {
      handleActivityKeyPress(event, row.no); // 키 입력 핸들러 호출
      if (event.key === "Enter") {
        event.target.blur(); // Enter 키를 누르면 포커스 잃게 하기
      }
    },
    [handleActivityKeyPress, row.no]
  );

  return (
    <TableCell>
      <TextField
        fullWidth // TextField가 테이블 셀의 전체 너비를 차지하도록 설정
        size="small" // TextField의 크기를 작게 설정
        value={value} // TextField의 값을 상태 값으로 설정
        onChange={onChange} // 값이 변경될 때 호출되는 핸들러 설정
        onBlur={onBlur} // 포커스를 잃을 때 호출되는 핸들러 설정
        onKeyPress={onKeyPress} // 키를 눌렀을 때 호출되는 핸들러 설정
        sx={textFieldStyles} // 스타일 속성으로 필드의 너비를 200px로 설정
        inputRef={textFieldRef} // 텍스트 필드에 대한 참조 설정
      />
    </TableCell>
  );
};

export default memo(TextFieldColumn);
