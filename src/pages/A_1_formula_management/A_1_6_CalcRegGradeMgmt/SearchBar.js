import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomArrowIcon, { CustomArrowRightIcon } from "./CustomArrowIcon";

const SearchBar = () => {
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

  const selectRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

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

  const commonStyles = {
    display: "flex",
    height: "40px",
    padding: "6px 10px",
    alignItems: "center",
    gap: "16px",
    flex: "1 0 0",
    // background: "var(--Gray-fff, #FFF)",
    boxSizing: "border-box",
  };

  const activeButtonStyles = {
    display: "flex",
    width: "114px",
    height: "40px",
    padding: "10px 16px",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: "8px",
    background: "var(--Primary-Primary, #00CD9B)",
    color: "var(--Gray-fff, #FFF)",
    textAlign: "center",
    fontFamily: '"Pretendard Variable"',
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%", // 21px
    letterSpacing: "-0.28px",
  };

  const inactiveButtonStyles = {
    display: "flex",
    width: "114px",
    height: "40px",
    padding: "10px 16px",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: "8px",
    background: "var(--Gray-eaeaea, #EAEAEA)",
    color: "var(--Gray-ccc, #CCC)",
    textAlign: "center",
    fontFamily: '"Pretendard Variable"',
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%", // 21px
    letterSpacing: "-0.28px",
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
        <Box sx={{ ...commonStyles }}>
          <FormControl fullWidth size="small">
            <Select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              displayEmpty
              IconComponent={() => (
                <CustomArrowIcon onClick={handleIconClick} />
              )}
              ref={selectRef}
              sx={{
                height: "40px",
                backgroundColor: "#FFF",
                color: "var(--Gray-aaa, #AAA)",
                fontFamily: "Pretendard Variable",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%" /* 19.5px */,
                letterSpacing: "-0.26px",
                padding: "2px 13px",
              }}
            >
              <MenuItem value="">
                <a>배출활동</a>
              </MenuItem>
              <MenuItem value="sample1">sample1</MenuItem>
              <MenuItem value="sample2">sample2</MenuItem>
              <MenuItem value="sample3">sample3</MenuItem>
              <MenuItem value="sample4">sample4</MenuItem>
              <MenuItem value="sample5">sample5</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                  cursor:
                    endDate && endDate > today ? "not-allowed" : "pointer",
                },
              },
            }}
            sx={{ flex: 1, marginLeft: -2, backgroundColor: "#FFF" }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            ...(isButtonActive ? activeButtonStyles : inactiveButtonStyles),
            marginRight: 40,
          }}
          disabled={!isButtonActive}
        >
          검색
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"잘못된 날짜 선택"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchBar;
