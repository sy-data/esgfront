import { useState, useEffect } from "react";
import { Table, TableRow, TableBody } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import { StyledTH, StyledTR, StyledTD } from "../../../components/TableWrapper";
import { esgFetch } from "../../../components/FetchWrapper";

const LeftArea = props => {
  const [workplaceList, setWorkplaceList] = useState({});
  
  useEffect(() => {
    esgFetch('/api/factories?filters[company][id][$eq]=1')
      .then(response => response.json())
      .then(response => {
        setWorkplaceList(response);
      });
  }, []);
  
  return (
    <ContentBody>
      <SubTitle title={"사업장 목록"} />
      <Table>
        <StyledTH>
          <TableRow>
            <StyledTD>No</StyledTD>
            <StyledTD>사업장명</StyledTD>
            <StyledTD>사업자번호</StyledTD>
          </TableRow>
        </StyledTH>
        <TableBody>
          {("data" in workplaceList && workplaceList.data.length > 0) ? workplaceList.data.map((wp, idx) => (
            <StyledTR key={idx + "tr"} onClick={() => props.setSelectedWorkplace(wp.attributes)}>
              <StyledTD>{idx + 1}</StyledTD>
              <StyledTD>{wp.attributes.name}</StyledTD>
              <StyledTD>{wp.id}</StyledTD>
            </StyledTR>
          )) :
            <StyledTR><StyledTD colSpan={3}>조회된 사업장 정보가 없습니다.</StyledTD></StyledTR>
          }
        </TableBody>
      </Table>
    </ContentBody>
  )
}

export default LeftArea;
