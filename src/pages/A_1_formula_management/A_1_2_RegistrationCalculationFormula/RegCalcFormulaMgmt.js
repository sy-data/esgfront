import React from "react";
import { Box, Typography } from "@mui/material";
import {
  treeStateAtom,
  treeOpenedLeaf,
} from "../../../States/leftNavigation/tree";
import NavigationTree from "../../../components/navigationTree/NavigationTree";
import MenuList from "../../../MenuItems";

const Frame = () => {
  return (
    <Box
      className="frame"
      sx={{ width: "100%", bgcolor: "#f5f5f5", padding: 2 }}
    >
      <Typography variant="h6">산정식 목록</Typography>
      <NavigationTree
        items={MenuList}
        stateAtom={treeStateAtom}
        leafAtom={treeOpenedLeaf}
      />
    </Box>
  );
};

export default Frame;
