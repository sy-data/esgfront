import { useState } from "react";
import MenuTitle from "../../components/MenuTitle";
import SplitArea from "../../components/SplitArea";
import SubTitle from "../../components/SubTitle";
import ContentBody from "../../components/ContentBody";
import { StyledTH, StyledTR, StyledTD } from "../../components/TableWrapper";
import { Table, TableRow, TableBody, MenuItem } from "@mui/material";
import { ContentWithTitie, FilterBlock, FilterContainer, FilterLabel, FilterSelect } from "../../components/Styles";

const SamplePage = () => {
  const selection = [2021, 2022, 2023];
  const [selection1, setSelection1] = useState(selection[0]);
  const [selection2, setSelection2] = useState(selection[1]);
  const [selection3, setSelection3] = useState(selection[2]);
  
  const handleChange1 = event => setSelection1(event.target.value);
  const handleChange2 = event => setSelection2(event.target.value);
  const handleChange3 = event => setSelection3(event.target.value);
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      <MenuTitle title={"타이틀입니다"} />
      <FilterBlock>
        <FilterContainer>
          <FilterLabel>필터이름</FilterLabel>
          <FilterSelect
            value={selection1}
            onChange={handleChange1}
          >
            {selection.map(s => <MenuItem key={'1'+s} value={s}>{s}</MenuItem>)}
          </FilterSelect>
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>필터이름</FilterLabel>
          <FilterSelect
            value={selection2}
            onChange={handleChange2}
          >
            {selection.map(s => <MenuItem key={'2'+s} value={s}>{s}</MenuItem>)}
          </FilterSelect>
        </FilterContainer>
        <FilterContainer>
          <FilterLabel>필터이름</FilterLabel>
          <FilterSelect
            value={selection3}
            onChange={handleChange3}
          >
            {selection.map(s => <MenuItem key={'3'+s} value={s}>{s}</MenuItem>)}
          </FilterSelect>
        </FilterContainer>
      </FilterBlock>
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
