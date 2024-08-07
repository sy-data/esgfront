// CustomTextField.js
import React, { useState, useEffect, useRef, memo, useCallback } from "react";
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
      borderRadius: "4px",
    },
  },
}));

const CustomTextField = memo(
  ({
    id,
    value,
    onChange,
    onKeyDown,
    onBlur,
    placeholder,
    autoFocus,
    handleClickOutside,
  }) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef();
    const wrapperRef = useRef();
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
        const len = inputRef.current.value.length;
        inputRef.current.setSelectionRange(len, len);
        setHasFocus(true);
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

    const handleFocus = () => {
      setHasFocus(true);
    };

    const handleBlur = () => {
      setHasFocus(false);
      setTimeout(() => {
        if (!hasFocus) {
          onBlur();
        }
      }, 200);
    };

    const clickOutsideHandler = useCallback(
      (event) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target) &&
          !hasFocus
        ) {
          handleClickOutside();
        }
      },
      [handleClickOutside, hasFocus]
    );

    useEffect(() => {
      document.addEventListener("mousedown", clickOutsideHandler);
      return () => {
        document.removeEventListener("mousedown", clickOutsideHandler);
      };
    }, [clickOutsideHandler]);

    return (
      <div ref={wrapperRef}>
        <CustomTextFieldStyled
          inputRef={inputRef}
          type={"text"}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    );
  }
);

export default CustomTextField;
