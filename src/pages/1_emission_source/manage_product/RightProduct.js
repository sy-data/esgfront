import { useState, useEffect } from "react";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { Table, TableRow, TableBody, Checkbox } from "@mui/material";
import { StyledTH, StyledTD, StyledTR } from "../../../components/TableWrapper";
import { esgFetch } from "../../../components/FetchWrapper";


const RightProduct = props => {
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    if (Object.keys(props.selectedWorkplace).length > 0 && "name" in props.selectedWorkplace){
      esgFetch('/api/products?populate=unit')
        .then(response => response.json())
        .then(response => {
          setProductList(response.data);
        });
    }
  }, [props.selectedWorkplace]);
  
  return (
    <ContentBody>
      <SubTitle title={"사업장별 생산품관리"} />
      
      <Table>
        <StyledTH>
          <TableRow>
            <StyledTD width={10}>v</StyledTD>
            <StyledTD>생산품명</StyledTD>
            <StyledTD width={50}>단위</StyledTD>
            <StyledTD width={50}>비율</StyledTD>
            <StyledTD>비고</StyledTD>
          </TableRow>
        </StyledTH>
        <TableBody>
          {productList.length > 0 ? productList.map((product, idx) => (
            <StyledTR key={idx + "tr"}>
              <StyledTD><Checkbox color="default" size="small" /></StyledTD>
              <StyledTD>{product.attributes.name}</StyledTD>
              <StyledTD>{product.attributes.unit.data.attributes.name}</StyledTD>
              <StyledTD>{product.attributes.rate}</StyledTD>
              <StyledTD>{product.attributes.description}</StyledTD>
            </StyledTR>
          )) :
            <StyledTR><StyledTD colSpan={5}>조회된 생산품 정보가 없습니다.</StyledTD></StyledTR>
          }
        </TableBody>
      </Table>
    </ContentBody>
  );
}

export default RightProduct;
