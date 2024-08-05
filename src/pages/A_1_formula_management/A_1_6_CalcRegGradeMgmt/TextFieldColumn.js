import React, { useCallback, useState, useEffect, memo } from "react";
import { TextField, TableCell } from "@mui/material";
import _ from "lodash";

const TextFieldColumn = ({
  row,
  handleActivityChange,
  handleActivityBlur,
  handleActivityKeyPress,
  textFieldRef,
}) => {
  const [value, setValue] = useState(row.activity);

  useEffect(() => {
    setValue(row.activity);
  }, [row.activity]);

  const debouncedChangeHandler = useCallback(
    _.debounce((event) => {
      handleActivityChange(event, row.no);
    }, 300),
    [handleActivityChange, row.no]
  );

  const onChange = (event) => {
    setValue(event.target.value);
    debouncedChangeHandler(event);
  };

  const onBlur = useCallback(
    (event) => {
      handleActivityBlur(event, row.no);
      event.target.blur(); // 포커스 잃게 하기
    },
    [handleActivityBlur, row.no]
  );

  const onKeyPress = useCallback(
    (event) => {
      handleActivityKeyPress(event, row.no);
      if (event.key === "Enter") {
        event.target.blur(); // 포커스 잃게 하기
      }
    },
    [handleActivityKeyPress, row.no]
  );

  return (
    <TableCell>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        sx={{ width: 200 }}
        inputRef={textFieldRef}
      />
    </TableCell>
  );
};

export default memo(TextFieldColumn);
