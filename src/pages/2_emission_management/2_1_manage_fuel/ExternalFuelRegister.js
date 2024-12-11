import { useState, useMemo, useEffect } from "react";
import { Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CloseIcon from '@mui/icons-material/Close';
import { esgFetch } from "../../../components/FetchWrapper";

const BlockGroup =  styled("div")(() => ({
  display: "flex", flexDirection: "column", gap: "16px"
}));
const BlockNumber = styled("div")(() => ({
  width: "30px", height: "30px", borderRadius: "15px",
  display: "flex", alignItems: "center", justifyContent: "center",
  backgroundColor: "#DCF2EF", color: "#00CD98"
}));
const BlockTitle = styled("div")(() => ({
  fontFamily: "Pretendard Variable",
  fontSize: "16px", fontWeight: "bold",
  height: "100%", display: "flex", alignItems: "center"
}));
const BlockField = styled("div")(() => ({
  display: "flex", gap: "24px", height: "40px"
}));
const BlockFieldGroup = styled("div")(() => ({
  paddingLeft: "46px", display: "flex", gap: "16px", flexDirection: "column"
}));
const BlockFieldTitle = styled("div")(() => ({
  fontFamily: "Pretendard Variable", fontSize: "14px", fontWeight: 600,
  width: "100px", height: "100%", color: "#111111",
  display: "flex", alignItems: "center"
}));
const BlockFieldContent = styled("div")(() => ({
  fontFamily: "Pretendard Variable", fontSize: "14px", fontWeight: 600,
  width: "100px", height: "100%", flex: 1
}));


const ExternalFuelRegister = props => {
  const [valid, setValid] = useState(false);
  const [workplace, setWorkplace] = useState("");
  const [facility, setFacility] = useState("");
  const [company, setCompany] = useState("");
  const [workplace_facility, setWorkplace_facility] = useState("");
  const [fuel, setFuel] = useState("");
  const [unit, setUnit] = useState("");
  const [gs, setGs] = useState("");
  useEffect(()=>{
    setValid(workplace.length>0&&facility.length>0&&company.length>0&&workplace_facility.length>0&&fuel.length>0&&unit.length>0&&gs.length>0);
  }, [workplace, facility, company, workplace_facility, fuel, unit, gs]);
  
  const handleRegister = async () => {
    // 사용 데이터 ->
    // workplace
    // facility
    // company
    // workplace_facility
    // fuel
    // unit
    // gs
    const payload = {
      "title": "원자력에너지",
      "unit" : "MW",
      "cat_id": "CAT1051",
      "emission_factor_co2" : "0.00", //이산화탄소 배출계수 
      "emission_factor_ch4" : "0.00", //메탄 배출계수 
      "emission_factor_n2o" : "0.00" //아산화질소 배출계수 
  }
    const response = await esgFetch("/emission/info/fuel", "POST", {}).then(res=>res.json());
  }
  
  return (
    <ContentBody width={props.width} padding="24px" gap="32px" flex={1}>
      <SubTitle title={"신규 등록"}>
        <CloseIcon onClick={()=>props.closeRegister()} sx={{cursor: "pointer"}} />
      </SubTitle>
      <div style={{width: "100%", height: "auto", overflow: "scroll", display: "flex", flex: 1, flexDirection: "column", gap: "32px"}}>
        <BlockGroup>
          <div style={{display: "flex", gap: "16px",alignItems: "center"}}>
            <BlockNumber>1</BlockNumber>
            <BlockTitle>사업장 시설</BlockTitle>
          </div>
          <BlockFieldGroup>
            <BlockField>
              <BlockFieldTitle>사업장명</BlockFieldTitle>
              <BlockFieldContent>
                <Select
                  value={workplace}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  fullWidth
                  onChange={e=>setWorkplace(e.target.value)}
                  displayEmpty
                  renderValue={selected => {
                    if(selected.length === 0){
                      return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>선택</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                  }}
                >
                  <MenuItem value="사업장1">사업장1</MenuItem>
                  <MenuItem value="사업장2">사업장2</MenuItem>
                </Select>
              </BlockFieldContent>
            </BlockField>
            <BlockField>
              <BlockFieldTitle>시설명</BlockFieldTitle>
              <BlockFieldContent>
                <Select
                  value={facility}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  fullWidth
                  onChange={e=>setFacility(e.target.value)}
                  displayEmpty
                  renderValue={selected => {
                    if(selected.length === 0){
                      return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>선택</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                  }}
                >
                  <MenuItem value="시설1">시설1</MenuItem>
                  <MenuItem value="시설2">시설2</MenuItem>
                </Select>
              </BlockFieldContent>
            </BlockField>
          </BlockFieldGroup>
        </BlockGroup>
        <BlockGroup>
          <div style={{display: "flex", gap: "16px",alignItems: "center"}}>
            <BlockNumber>2</BlockNumber>
            <BlockTitle>시설 정보</BlockTitle>
          </div>
          <BlockFieldGroup>
            <BlockField>
              <BlockFieldTitle>법인명</BlockFieldTitle>
              <BlockFieldContent>
                <TextField value={company} onChange={e=>setCompany(e.target.value)} placeholder="법인명을 입력해주세요" size="small" fullWidth />
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>사업장명</BlockFieldTitle>
              <BlockFieldContent>
                <TextField value={workplace_facility} onChange={e=>setWorkplace_facility(e.target.value)} placeholder="사업장명을 입력해주세요" size="small" fullWidth />
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>사용연료</BlockFieldTitle>
              <BlockFieldContent>
                <TextField value={fuel} onChange={e=>setFuel(e.target.value)} placeholder="사용연료를 입력해주세요" size="small" fullWidth />
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>단위</BlockFieldTitle>
              <BlockFieldContent>
                <TextField value={unit} onChange={e=>setUnit(e.target.value)} placeholder="단위를 입력해주세요" size="small" fullWidth />
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>배출계수</BlockFieldTitle>
              <BlockFieldContent>
                <TextField value={gs} onChange={e=>setGs(e.target.value)} placeholder="숫자만 입력해주세요" size="small" fullWidth />
              </BlockFieldContent>
            </BlockField>
          </BlockFieldGroup>
        </BlockGroup>
      </div>
      <Button variant={valid ? "btnActive":"btnDisabled"} size="small" disabled={!valid} sx={{height:"40px"}} fullWidth onClick={handleRegister}>등록</Button>
    </ContentBody>
  )
}

export default ExternalFuelRegister;
