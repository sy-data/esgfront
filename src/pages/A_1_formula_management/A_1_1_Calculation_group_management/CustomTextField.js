import React, { useState, useEffect, useRef, memo } from "react";
import { TextField } from "@mui/material";

// memo를 사용하여 불필요한 리렌더링을 방지
const CustomTextField = memo(({ id, value, onChange, onKeyDown, onBlur }) => {
  const [localValue, setLocalValue] = useState(value); // 로컬 상태로 value를 관리
  const inputRef = useRef(); // input element를 참조하기 위한 ref를 생성

  // prop으로 받은 value가 변경될 때마다 로컬 상태를 업데이트
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 컴포넌트가 마운트될 때 input에 포커스를 주고 커서를 끝으로 이동
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // input에 포커스를 줌
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len); // 커서를 텍스트 끝으로 이동
    }
  }, []);

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
    <TextField
      inputRef={inputRef} // input element에 ref를 설정
      type={"text"} // input 타입을 텍스트로 설정합니다.
      value={localValue} // 로컬 상태를 value로 사용합니다.
      onChange={handleChange} // input 변경 이벤트 핸들러
      placeholder={"비고내용"} // placeholder 텍스트 설정
      onKeyDown={handleKeyDown} // keyDown 이벤트 핸들러
      onBlur={onBlur} // blur 이벤트 핸들러
      onClick={(event) => event.stopPropagation()} // 클릭 이벤트 전파를 막음
    />
  );
});

export default CustomTextField;
