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
    // 메뉴 리스트를 가져오는 비동기 함수를 정의
    const fetchMenuList = async () => {
      try {
        // API 호출을 통해 메뉴 리스트 데이터를 가져옵니다.
        const res = await esgFetch("/v1/admin/calc/menu-tree");

        // 응답 데이터를 JSON 형식으로 변환합니다.
        const data = await res.json();

        // 가져온 데이터가 배열인지 확인한 후, 배열이면 상태를 업데이트합니다.
        // 배열이 아닌 경우 빈 배열로 설정합니다.
        setMenuList(Array.isArray(data) ? data : []); // 여기서 배열 확인
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    // 컴포넌트가 마운트될 때 메뉴 리스트를 가져오는 함수를 호출합니다.
    fetchMenuList();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // 선택된 카테고리가 있을 경우 변경 이력 데이터를 가져오는 비동기 함수를 정의합니다.
      const fetchChangeHistory = async () => {
        try {
          // API 호출을 통해 변경 이력 데이터를 가져옵니다.
          const res = await esgFetch(
            `/v1/admin/calc/change-history/${selectedCategory}`
          );
          // 응답 데이터를 JSON 형식으로 변환합니다.
          const data = await res.json();

          // 변경 이력 상태를 업데이트합니다.
          setChangeHistory(data);
        } catch (error) {
          console.error("Error fetching change history:", error);
        }
      };

      // 선택된 카테고리가 있을 경우 산정 이력 데이터를 가져오는 비동기 함수를 정의합니다.
      const fetchCalculationHistory = async () => {
        try {
          // API 호출을 통해 산정 이력 데이터를 가져옵니다.
          const res = await esgFetch(
            `/v1/admin/calc/calculation-history/${selectedCategory}`
          );
          // 응답 데이터를 JSON 형식으로 변환합니다.
          const data = await res.json();

          // 산정 이력 상태를 업데이트합니다.
          setCalculationHistory(data);
        } catch (error) {
          console.error("Error fetching calculation history:", error);
        }
      };

      // 변경 이력과 산정 이력 데이터를 각각 가져오는 함수를 호출합니다.
      fetchChangeHistory();
      fetchCalculationHistory();
    }
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 이 effect가 실행됩니다.

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
