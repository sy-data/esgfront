import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import CustomSelect from "./CustomSelect";
import DatePicker from "./DatePicker";
import DialogAlert from "./DialogAlert";
import { activeButtonStyles, inactiveButtonStyles } from "./styles";

const SearchBar = ({ onSearch }) => {
  const [activity, setActivity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isButtonActive, setIseButtonActive] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (endDate && selectedDate > endDate) {
      setDialogMessage("종료일 날짜보다 늦습니다.");
      setOpenDialog(true);
    } else {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    if (startDate && selectedDate < startDate) {
      setDialogMessage("시작일 앞으로 지정할 수 없습니다.");
      setOpenDialog(true);
    } else {
      setEndDate(selectedDate);
    }
  };

  useEffect(() => {
    if (activity && startDate && endDate) {
      setIseButtonActive(true);
    } else {
      setIseButtonActive(false);
    }
  }, [activity, startDate, endDate]);

  const handleSearchClick = () => {
    onSearch({ activity, startDate, endDate });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={2}
      gap={2}
      sx={{ marginTop: 3 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <CustomSelect activity={activity} setActivity={setActivity} />
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <Button
          variant="contained"
          sx={{
            ...(isButtonActive ? activeButtonStyles : inactiveButtonStyles),
            marginRight: 40,
          }}
          disabled={!isButtonActive}
          onClick={handleSearchClick}
        >
          검색
        </Button>
      </Box>
      <DialogAlert
        open={openDialog}
        handleClose={handleDialogClose}
        message={dialogMessage}
      />
    </Box>
  );
};

export default SearchBar;
