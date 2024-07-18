import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/tree";
import NavigationTree from "./NavigationTree";
import MenuList from "../../../MenuItems";
import RegCalcFormulaMgmts from "./RegCalcFormulaMgmts";

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
        bgcolor: "#f5f5f5",
        padding: 2,
        // position: "relative",
      }}
    >
      <Box
        sx={{
          width: "20%",
          paddingRight: 2,
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6">산정식 목록</Typography>

        <NavigationTree
          items={MenuList}
          stateAtom={treeStateAtom}
          leafAtom={treeOpenedLeaf}
        />
      </Box>
      <Box
        sx={{
          flex: "1",
          paddingLeft: 2,
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
