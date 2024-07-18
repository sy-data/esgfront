import React, { useState, useEffect, useRef, memo } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

// 커스텀 스타일이 적용된 TextField 정의
const CustomTextFieldStyled = styled(TextField)(({ theme }) => ({
  // display: "flex",
  // padding: "6px 10px",
  // alignItems: "center",
  // gap: "10px",
  // flex: "1 0 0",
  // borderRadius: "8px",
  // border: "1px solid var(--Gray-eee, #EEE)",
  // background: "var(--Gray-fff, #FFF)",

  "& .MuiInputBase-root": {
    // color: "bla",
    fontSize: "17px",
  },
  "& .MuiInputLabel-root": {
    color: "green", // 레이블 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "purple", // 기본 상태 테두리 색상
    },
    "&:hover fieldset": {
      borderColor: "orange", // 호버 상태 테두리 색상
    },
    "&.Mui-focused fieldset": {
      marginTop: "7px",
      height: "35px",
      width: "100%",
      display: "flex",
      padding: "6px 80px",
      alignItems: "center",
      gap: "10px",
      flex: "1 0 0",
      borderRadius: "20px",
      border: "1.5px solid var(--Gray-eee, #AAA)",
    },
    "&.Mui-focused": {},
  },
}));

// memo를 사용하여 불필요한 리렌더링을 방지
const CustomTextField = memo(({ value, onChange, onKeyDown, onBlur, placeholder, autoFocus }) => {
  const [localValue, setLocalValue] = useState(value); // 로컬 상태로 value를 관리
  const inputRef = useRef(); // input element를 참조하기 위한 ref를 생성

  // prop으로 받은 value가 변경될 때마다 로컬 상태를 업데이트
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 컴포넌트가 마운트될 때 input에 포커스를 주고 커서를 끝으로 이동
  useEffect(() => {
    if (inputRef.current) {
      // 한 row 에 두개 이상의 input 이 있을 경우 자동 blur 되는 문제가 있어서 autoFocus 가 true 인 경우에만 포커스.
      autoFocus && inputRef.current.focus(); // input에 포커스를 줌
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len); // 커서를 텍스트 끝으로 이동
    }
  }, [autoFocus]);

  // input 값이 변경될 때 로컬 상태와 부모 컴포넌트의 상태를 업데이트
  const handleChange = (event) => {
    setLocalValue(event.target.value); // 로컬 상태 업데이트
    onChange(event.target.value); // 부모 컴포넌트의 상태 업데이트
  };

  // 스페이스 키 입력을 막고, 부모 컴포넌트의 onKeyDown 이벤트를 호출
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.stopPropagation(); // 스페이스 키 입력 전파를 막음
    }
    onKeyDown(e); // 부모 컴포넌트의 onKeyDown 이벤트 호출
  };

  return (
    <CustomTextFieldStyled
      inputRef={inputRef} // input element에 ref를 설정
      type={"text"} // input 타입을 텍스트로 설정합니다.
      value={localValue} // 로컬 상태를 value로 사용합니다.
      onChange={handleChange} // input 변경 이벤트 핸들러
      placeholder={placeholder} // placeholder 텍스트 설정
      onKeyDown={handleKeyDown} // keyDown 이벤트 핸들러
      onBlur={onBlur} // blur 이벤트 핸들러
      onClick={(event) => event.stopPropagation()} // 클릭 이벤트 전파를 막음
    />
  );
});

export default CustomTextField;
