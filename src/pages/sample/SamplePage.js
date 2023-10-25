import MenuTitle from "../../components/MenuTitle";
import SplitArea from "../../components/SplitArea";
import SubTitle from "../../components/SubTitle";
import { StyledTH, StyledTR, StyledTD } from "../../components/TableWrapper";
import { Table, TableBody } from "@mui/material";

const SamplePage = () => {
  return (
    <>
      <MenuTitle title={"타이틀입니다"} />
      <SplitArea>
        <>
          <SubTitle title={"서브타이틀입니다"} />
          <Table sx={{width: "200px", margin: "20px"}}>
            <StyledTH>
              <StyledTD>1</StyledTD>
              <StyledTD>2</StyledTD>
            </StyledTH>
            <TableBody>
              <StyledTR>
                <StyledTD>1</StyledTD>
                <StyledTD>2</StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>1</StyledTD>
                <StyledTD>2</StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>1</StyledTD>
                <StyledTD>2</StyledTD>
              </StyledTR>
            </TableBody>
          </Table>
        </>
        <SplitArea direction={'h'} customWidth={0.7}>
          <div>up</div>
          <div>down</div>
        </SplitArea>
      </SplitArea>
    </>
  )
}

export default SamplePage;
