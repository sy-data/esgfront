import React, { useRef, useCallback } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { CustomArrowRightIcon } from "./CustomArrowIcon";
import { commonStyles } from "./styles";

const DatePicker = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const handleStartDateClick = useCallback(() => {
    if (startDateRef.current) {
      startDateRef.current.showPicker();
    }
  }, []);

  const handleEndDateClick = useCallback(() => {
    if (endDateRef.current) {
      endDateRef.current.showPicker();
    }
  }, []);

  const textFieldProps = {
    variant: "outlined",
    size: "small",
    type: "date",
    InputLabelProps: { shrink: true },
    fullWidth: true,
    InputProps: {
      endAdornment: <InputAdornment position="end" />,
      inputProps: { max: today },
    },
    sx: { flex: 1, backgroundColor: "#FFF" },
  };

  const startDateInputProps = {
    ...textFieldProps,
    value: startDate,
    onChange: handleStartDateChange,
    inputRef: startDateRef,
    onClick: handleStartDateClick,
    InputProps: {
      ...textFieldProps.InputProps,
      inputProps: {
        ...textFieldProps.InputProps.inputProps,
        style: {
          color: startDate && startDate > today ? "gray" : "inherit",
          cursor: startDate && startDate > today ? "not-allowed" : "pointer",
        },
      },
    },
    sx: { ...textFieldProps.sx, marginRight: -2 },
  };

  const endDateInputProps = {
    ...textFieldProps,
    value: endDate,
    onChange: handleEndDateChange,
    inputRef: endDateRef,
    onClick: handleEndDateClick,
    InputProps: {
      ...textFieldProps.InputProps,
      inputProps: {
        ...textFieldProps.InputProps.inputProps,
        style: {
          color: endDate && endDate > today ? "gray" : "inherit",
          cursor: endDate && endDate > today ? "not-allowed" : "pointer",
        },
      },
    },
    sx: { ...textFieldProps.sx, marginLeft: -2 },
  };

  return (
    <Box display="flex" alignItems="center" sx={commonStyles}>
      <TextField {...startDateInputProps} label="시작일" />
      <CustomArrowRightIcon />
      <TextField {...endDateInputProps} label="종료일" />
    </Box>
  );
};

export default DatePicker;
