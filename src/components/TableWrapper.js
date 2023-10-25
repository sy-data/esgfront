import { TableHead, TableRow, TableCell, styled } from "@mui/material";


export const StyledTH = styled(TableHead)(() => ({
  borderTop: '4px solid black',
  borderBottom: '4px solid black'
}));

export const StyledTR = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#808080",
  }
}));


export const StyledTD = styled(TableCell)(() => ({
  padding: "5px"
}));
