import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/adminTree";
import NavigationTree from "./NavigationTree";
import MenuList from "../../../MenuItems";
import ChangeHistory from "./ChangeHistory";
import CalculationHistory from "./CalculationHistory";
import { esgFetch } from "../../../components/FetchWrapper";

const Frame = () => {
  const [changeHistory, setChangeHistory] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const fetchChangeHistory = async () => {
        try {
          const res = await esgFetch(`/api/change-history/${selectedCategory}`);
          const data = await res.json();
          setChangeHistory(data);
        } catch (error) {
          console.error("Error fetching change history:", error);
          // 예제 데이터 설정
          const exampleChangeHistory = [
            {
              id: 1, // No와 연결됨
              create_at: "2023-05-31 06:09:36", // 변경일과 연결됨
              action_type: "산정식등록", // 변경 유형
              admin_id: "이현정", // changer와 연결됨
              table_name: "calculation", // 테이블 이름
              old_data: {}, // 변경 전 값
              new_data: {
                calculationId: "00010",
                calculationName: "이동연소(도로)",
                version: 1,
              }, // 변경 후 값
            },
            {
              id: 2, // No와 연결됨
              create_at: "2023-06-01 10:11:33", // 변경일과 연결됨
              action_type: "산정식/파라미터수정", // 변경 유형
              admin_id: "이현정", // changer와 연결됨
              table_name: "calculation", // 테이블 이름
              old_data: {
                calculationId: "00010",
                calculationName: "이동연소(도로)",
                version: 1,
              }, // 변경 전 값
              new_data: {
                calculationId: "00011",
                calculationName: "이동연소(도로)",
                version: 2,
              }, // 변경 후 값
            },
          ];
          setChangeHistory(exampleChangeHistory);
        }
      };

      const fetchCalculationHistory = async () => {
        try {
          const res = await esgFetch(
            `/api/calculation-history/${selectedCategory}`
          );
          const data = await res.json();
          setCalculationHistory(data);
        } catch (error) {
          console.error("Error fetching calculation history:", error);
          // 예제 데이터 설정
          const exampleCalculationHistory = [
            {
              tier: "Tier 2",
              calculation: `CO2배출량 =활동량 *순발열량계수 / 1000000 * CO2배출계수`,
              version: 1,
              change_date: "2023-05-31 06:09:36",
            },
            {
              tier: "Tier 1",
              calculation: `CO2배출량 =활동량 *순발열량계수 / 1000000 * CO2배출계수`,
              version: 2,
              change_date: "2023-06-01 10:11:33",
            },
          ];
          setCalculationHistory(exampleCalculationHistory);
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
          items={MenuList}
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

export default Frame;
