import React, { useState, useEffect, useRef, memo } from "react";
import { TextField } from "@mui/material";

const CustomTextField = memo(({ id, value, onChange, onKeyDown, onBlur }) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, []);

  const handleChange = (event) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.stopPropagation();
    }
    onKeyDown(e);
  };

  return (
    <TextField
      inputRef={inputRef}
      type={"text"}
      value={localValue}
      onChange={handleChange}
      placeholder={"비고내용"}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      onClick={(event) => event.stopPropagation()}
    />
  );
});

export default CustomTextField;
