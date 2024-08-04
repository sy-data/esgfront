import { IconButton } from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const CustomCalendarIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} style={{ cursor: "pointer" }}>
      <CalendarTodayIcon />
    </IconButton>
  );
};

export default CustomCalendarIcon;
