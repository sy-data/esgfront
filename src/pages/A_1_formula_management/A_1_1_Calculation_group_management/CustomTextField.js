import React, { useState, useEffect, useRef, memo } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextFieldStyled = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "17px",
  },
  "& .MuiInputLabel-root": {
    color: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "purple",
    },
    "&:hover fieldset": {
      borderColor: "orange",
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

const CustomTextField = memo(
  ({ id, value, onChange, onKeyDown, onBlur, placeholder, autoFocus }) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef();

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
      }
    }, [autoFocus]);

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
      <CustomTextFieldStyled
        inputRef={inputRef}
        type={"text"}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onClick={(event) => event.stopPropagation()}
      />
    );
  }
);

export default CustomTextField;
