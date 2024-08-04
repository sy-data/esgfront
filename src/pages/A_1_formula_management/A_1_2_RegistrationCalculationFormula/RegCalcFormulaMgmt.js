import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/adminTree";
import NavigationTree from "./NavigationTree";
import MenuList from "../../../MenuItems";
import RegCalcFormulaMgmts from "./regCalcFormulaMgmts/RegCalcFormulaMgmts";
import RegCalcFormulaDetail from "./regCalcFormulaDetail/RegCalcFormulaDetail";

/**
 * A_1_2. 산정식 등록
 */
const Frame = () => {
  const [currentDepth, setCurrentDepth] = useState(1);

  const handleClickPlus = () => {
    if (currentDepth >= 5) return;
    setCurrentDepth(prevState => prevState + 1);
  }

  const handleClickMinus = () => {
    if (currentDepth <= 1) return;
    setCurrentDepth(prevState => prevState - 1);
  }


  return (
    <Box
      className="frame"
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fff",
        padding: 2,
        border: "1px solid var(--Gray-eee, #EEE)",
        // position: "relative",
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
          산정식 목록
        </Typography>

        <NavigationTree
          items={MenuList}
          stateAtom={treeStateAtom}
          leafAtom={treeOpenedLeaf}
        />
      </Box>
      <Box
        sx={{
          marginTop: "-15px",
          marginRight: "-15px",
          marginBottom: "-15px",
          padding: "24px",
          flex: "1",
          backgroundColor: "#F7F8F8",
        }}
      >
        {/* TODO 메뉴바 추가되면 제거하기 */}
        <Button onClick={handleClickPlus}>Depth +</Button>
        <Button onClick={handleClickMinus}>Depth -</Button>
        <span>현재 depth: {currentDepth}</span>
        {/* 1~4 depth: 산정식 기본정보, 5depth: 산정식 상세정보 */}
        {currentDepth < 5 ?
          <RegCalcFormulaMgmts currentDepth={currentDepth} setCurrentDepth={setCurrentDepth}/> :
          <RegCalcFormulaDetail/>
        }
      </Box>
    </Box>
  );
};

export default Frame;
