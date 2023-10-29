import MenuTitle from "../../components/MenuTitle";
import SplitArea from "../../components/SplitArea";
import SubTitle from "../../components/SubTitle";
import ContentBody from "../../components/ContentBody";
import { StyledTH, StyledTR, StyledTD } from "../../components/TableWrapper";
import { Table, TableRow, TableBody } from "@mui/material";
import { ContentWithTitie } from "../../components/Styles";

const SamplePage = () => {
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      <MenuTitle title={"타이틀입니다"} />
      <SplitArea>
        <ContentBody>
          <SubTitle title={"서브타이틀입니다"} />
          <Table sx={{width: "200px", margin: "20px"}}>
            <StyledTH>
              <TableRow>
                <StyledTD>1</StyledTD>
                <StyledTD>2</StyledTD>
              </TableRow>
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
        </ContentBody>
        <SplitArea direction={'h'} customWidth={0.7}>
          <ContentBody>up</ContentBody>
          <ContentBody>down</ContentBody>
        </SplitArea>
      </SplitArea>
    </ContentWithTitie>
  )
}

export default SamplePage;
