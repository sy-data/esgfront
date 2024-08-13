import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/adminTree";
import NavigationTree from "./NavigationTree";
import ChangeHistory from "./ChangeHistory";
import CalculationHistory from "./CalculationHistory";
import { esgFetch } from "./CFCHI_FetchWrapper";

const CalcFCHistoryInquiry = () => {
  const [menuList, setMenuList] = useState([]);
  const [changeHistory, setChangeHistory] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchMenuList = async () => {
      const data = await esgFetch("/v1/admin/calc/menu-tree");
      setMenuList(Array.isArray(data) ? data : []);
    };

    const fetchCategoryDetails = async (categoryId) => {
      const [changeHistoryData, calculationHistoryData] = await Promise.all([
        esgFetch(`/v1/admin/calc/change-history/${categoryId}`),
        esgFetch(`/v1/admin/calc/calculation-history/${categoryId}`),
      ]);
      setChangeHistory(changeHistoryData || []);
      setCalculationHistory(calculationHistoryData || []);
    };
    fetchMenuList();

    if (selectedCategory) {
      fetchCategoryDetails(selectedCategory);
    }
  }, [selectedCategory]);

  // 카테고리 클릭 시 호출되는 함수로, 선택된 카테고리 ID를 상태로 설정합니다.
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Box
      className="frame"
      sx={{
        display: "flex",
        width: "80%",
        backgroundColor: "#fff",
        padding: 2,
        border: "1px solid var(--Gray-eee, #EEE)",
      }}
    >
      <Box
        sx={{
          width: "20%",
          paddingRight: 2,
          borderRight: "1px solid var(--Gray-eee, #EEE)",
          backgroundColor: "#FFF",
          marginTop: "-15px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#FFF",
            color: "var(--Gray-111, #111)",
            fontFamily: "'Pretendard Variable'",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "150%", // 27px
            letterSpacing: "-0.36px",
            marginBottom: "25px",
            marginTop: "10px",
          }}
        >
          산정식 변경 이력 조회
        </Typography>

        <NavigationTree
          items={menuList}
          stateAtom={treeStateAtom}
          leafAtom={treeOpenedLeaf}
          onCategoryClick={handleCategoryClick}
        />
      </Box>
      <Box
        sx={{
          marginTop: "-15px",
          marginRight: "-15px",
          marginBottom: "-15px",
          paddingTop: "15px",
          flex: "1",
          paddingLeft: 2,
          backgroundColor: "#F7F8F8",
        }}
      >
        <ChangeHistory data={changeHistory} />
        <CalculationHistory data={calculationHistory} />
      </Box>
    </Box>
  );
};

export default CalcFCHistoryInquiry;
// /v1/admin/calc/
