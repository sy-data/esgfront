import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/adminTree";
import NavigationTree from "./NavigationTree";
import ChangeHistory from "./ChangeHistory";
import CalculationHistory from "./CalculationHistory";
import { esgFetch } from "../../../components/FetchWrapper";

const CalcFCHistoryInquiry = () => {
  const [menuList, setMenuList] = useState([]);
  const [changeHistory, setChangeHistory] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const res = await esgFetch("/v1/admin/calc/menu-tree");
        const data = await res.json();
        setMenuList(Array.isArray(data) ? data : []); // 여기서 배열 확인
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    fetchMenuList();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchChangeHistory = async () => {
        try {
          const res = await esgFetch(
            `/v1/admin/calc/change-history/${selectedCategory}`
          );
          const data = await res.json();
          setChangeHistory(data);
        } catch (error) {
          console.error("Error fetching change history:", error);
        }
      };

      const fetchCalculationHistory = async () => {
        try {
          const res = await esgFetch(
            `/v1/admin/calc/calculation-history/${selectedCategory}`
          );
          const data = await res.json();
          setCalculationHistory(data);
        } catch (error) {
          console.error("Error fetching calculation history:", error);
        }
      };

      fetchChangeHistory();
      fetchCalculationHistory();
    }
  }, [selectedCategory]);

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
