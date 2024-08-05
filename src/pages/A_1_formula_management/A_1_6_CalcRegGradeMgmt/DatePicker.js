import React, { useRef } from "react";
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

  const handleStartDateClick = () => {
    if (startDateRef.current) {
      startDateRef.current.showPicker();
    }
  };

  const handleEndDateClick = () => {
    if (endDateRef.current) {
      endDateRef.current.showPicker();
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ ...commonStyles }}>
      <TextField
        label="시작일"
        variant="outlined"
        size="small"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        inputRef={startDateRef}
        onClick={handleStartDateClick}
        InputProps={{
          endAdornment: <InputAdornment position="end" />,
          inputProps: {
            max: today,
            style: {
              color: startDate && startDate > today ? "gray" : "inherit",
              cursor:
                startDate && startDate > today ? "not-allowed" : "pointer",
            },
          },
        }}
        sx={{ flex: 1, marginRight: -2, backgroundColor: "#FFF" }}
      />
      <CustomArrowRightIcon />
      <TextField
        label="종료일"
        variant="outlined"
        size="small"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        inputRef={endDateRef}
        onClick={handleEndDateClick}
        InputProps={{
          endAdornment: <InputAdornment position="end" />,
          inputProps: {
            max: today,
            style: {
              color: endDate && endDate > today ? "gray" : "inherit",
              cursor: endDate && endDate > today ? "not-allowed" : "pointer",
            },
          },
        }}
        sx={{ flex: 1, marginLeft: -2, backgroundColor: "#FFF" }}
      />
    </Box>
  );
};

export default DatePicker;
