import React, { useRef } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import CustomArrowIcon from "./CustomArrowIcon";
import { commonStyles } from "./styles";

const CustomSelect = ({ activity, setActivity }) => {
  const selectRef = useRef(null); // 셀렉트 요소에 대한 참조 생성

  const handleIconClick = () => {
    // 아이콘 클릭 시 셀렉트 박스를 여는 함수 정의
    if (selectRef.current) {
      // 참조된 셀렉트 요소가 존재하는 경우
      selectRef.current.focus(); // 셀렉트 박스에 포커스 설정
      selectRef.current.click(); // 셀렉트 박스 클릭하여 옵션 열기
    }
  };

  const handleChange = (e) => {
    // 셀렉트 박스 값이 변경될 때 호출되는 함수 정의
    setActivity(e.target.value); // 선택된 값을 activity 상태로 설정
    if (selectRef.current) {
      // 참조된 셀렉트 요소가 존재하는 경우
      selectRef.current.blur(); // 셀렉트 박스의 포커스를 잃게 함
    }
  };

  return (
    <Box sx={{ ...commonStyles }}>
      {/* 스타일이 적용된 박스 컴포넌트 */}
      <FormControl fullWidth size="small">
        {/* 전체 너비와 작은 크기로 설정된 폼 컨트롤 */}
        <Select
          value={activity} // 현재 선택된 값을 설정
          onChange={handleChange} // 값이 변경될 때 호출되는 핸들러 설정
          displayEmpty // 선택되지 않은 항목을 표시
          IconComponent={() => <CustomArrowIcon onClick={handleIconClick} />} // 커스텀 아이콘 컴포넌트 설정
          ref={selectRef} // 셀렉트 요소에 대한 참조 설정
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
  );
};

export default CustomSelect;
