import React, { useRef } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";
import { commonStyles } from "./styles";

const selectStyles = {
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
};

const CustomSelect = ({ activity, setActivity }) => {
  const selectRef = useRef(null);

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  const handleChange = (e) => {
    setActivity(e.target.value);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  return (
    <Box sx={commonStyles}>
      <FormControl fullWidth size="small">
        <Select
          value={activity}
          onChange={handleChange}
          displayEmpty
          IconComponent={() => <CustomArrowIcon onClick={handleIconClick} />}
          ref={selectRef}
          sx={selectStyles}
        >
          <MenuItem value="">
            <span>배출활동</span>
          </MenuItem>
          <MenuItem value="sample1">sample1</MenuItem>
          <MenuItem value="sample2">sample2</MenuItem>
          <MenuItem value="sample3">sample3</MenuItem>
          <MenuItem value="sample4">sample4</MenuItem>
          <MenuItem value="sample5">sample5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
