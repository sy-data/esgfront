import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
