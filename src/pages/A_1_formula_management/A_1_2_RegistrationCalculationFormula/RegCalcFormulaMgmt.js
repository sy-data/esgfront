import React from "react";
import { Box, Typography } from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/tree";
import NavigationTree from "./NavigationTree";
import MenuList from "../../../MenuItems";
import RegCalcFormulaMgmts from "./RegCalcFormulaMgmts";

const Frame = () => {
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
        <RegCalcFormulaMgmts />
      </Box>
    </Box>
  );
};

export default Frame;
