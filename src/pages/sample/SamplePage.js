import { useState, useRef } from "react";
import MenuTitle from "../../components/MenuTitle";
import SplitArea from "../../components/SplitArea";
import SubTitle from "../../components/SubTitle";
import ContentBody from "../../components/ContentBody";
import { StyledTH, StyledTR, StyledTD } from "../../components/TableWrapper";
import { Table, TableRow, TableBody, MenuItem, Button } from "@mui/material";
import { ContentWithTitie, 
  FilterBlock, FilterLine, FilterContainer, FilterLabel, FilterSelect, 
  SearchButtonContainer } from "../../components/Styles";
import BaseYearSelect from "../../components/filters/BaseYearSelect";
import DefaultSelect from "../../components/filters/DefaultSelect";

const SamplePage = () => {
  const selection = [2021, 2022, 2023];
  const [selection1, setSelection1] = useState(selection[0]);
  const handleChange1 = event => setSelection1(event.target.value);
  
  const baseYearRef = useRef();
  const selectRef1 = useRef();
  const selectRef2 = useRef();
  
  return (
    <ContentWithTitie style={{ backgroundColor: "#AAAAAA"}}>
      
      <MenuTitle title={"타이틀입니다"} />
      
      <FilterBlock>
        <FilterLine>
          <BaseYearSelect ref={baseYearRef} />
          <DefaultSelect selectLabel="이름 입력1" selectOptions={selection} ref={selectRef1} />
        </FilterLine>
        
        <FilterLine>
          <DefaultSelect selectLabel="이름 입력2" selectOptions={selection} ref={selectRef2} />
          
          <FilterContainer>
            <FilterLabel>필터이름</FilterLabel>
            <FilterSelect
              value={selection1}
              onChange={handleChange1}
            >
              {selection.map(s => <MenuItem key={'3'+s} value={s}>{s}</MenuItem>)}
            </FilterSelect>
          </FilterContainer>
        </FilterLine>
      </FilterBlock>
      
      <SearchButtonContainer>
        <Button variant="outlined" size="small" color="btnSearch" onClick={() => console.log(baseYearRef.current.baseYear)}>연도확인</Button>
        <Button variant="outlined" size="small" color="btnSearch" onClick={() => console.log(selection[selectRef1.current.selected])}>옵션확인1</Button>
        <Button variant="outlined" size="small" color="btnSearch" onClick={() => console.log(selection[selectRef2.current.selected])}>옵션확인2</Button>
      </SearchButtonContainer>
      
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
