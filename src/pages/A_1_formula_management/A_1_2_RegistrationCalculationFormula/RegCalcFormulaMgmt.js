import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/adminTree";
import NavigationTree from "./NavigationTree";
import MenuList from "../../../MenuItems";
import RegCalcFormulaMgmts from "./regCalcFormulaMgmts/RegCalcFormulaMgmts";

/**
 * A_1_2. 산정식 등록
 */
const Frame = () => {
  const [currentDepth, setCurrentDepth] = useState(1);

  const handleClickPlus = () => {
    if (currentDepth === 4) return;
    setCurrentDepth(prevState => prevState + 1);
  }

  const handleClickMinus = () => {
    if (currentDepth === 1) return;
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
          paddingTop: "15px",
          flex: "1",
          paddingLeft: 2,
          backgroundColor: "#F7F8F8",
        }}
      >
        {/* TODO 메뉴바 추가되면 제거하기 */}
        <Button onClick={handleClickPlus}>Depth +</Button>
        <Button onClick={handleClickMinus}>Depth -</Button>
        <span>현재 depth: {currentDepth}</span>
        {/* TODO 5depth 산정식 상세정보 return 하기 */}
        {currentDepth < 5 ? <RegCalcFormulaMgmts currentDepth={currentDepth} /> : null}
      </Box>
    </Box>
  );
};

export default Frame;
