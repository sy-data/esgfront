import { useState, useMemo, useEffect } from "react";
import { Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as CalendarIcon } from "../../../assets/images/IconCalendar.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
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


const FacilityRegister = props => {
  // const [valid, setValid] = useState(false);
  const [group, setGroup] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [emission, setEmission] = useState("");
  const [facility, setFacility] = useState("");
  const [description_gjType, setDescription_gjType] = useState("");
  const [fuel_sebu, setFuel_sebu] = useState("");
  const [date, setDate] = useState(null);
  const [govReport, setGovReport] = useState("");
  
  const emisstion_types = useMemo(() => (["고정연소", "이동연소", "폐기물/소각","공정배출","전력","열/스팀"]),[]);
  const fuel_types = useMemo(() => ({
    "고정연소": [
      "도시가스(LNG)","도시가스(LPG)","경유","휘발유","등유","B-C유","B-A유","B-B유","천연가스(LNG)","프로판(LPG1호)",
      "부탄(LPG3호)","국내무연탄","연료용 수입무연탄","원료용 수입무연탄","연료용 수입무연탄(역청탄)","원료용 수입무연탄(역청탄)",
      "아역청탄","코크스","나프타","용제","항공유","아스팔트","윤활유","석유코크스","부생연료유1호","부생연료유2호"
    ],
    "이동연소": ["휘발유","경유","LPG","등유","윤활유","CNG","LNG"],
    "폐기물/소각": ["생활폐기물","사업장폐기물","하수슬러지"],
    "열/스팀": ["스팀(열전용)","스팀(열병합)","스팀(일반)"],
  }), []);
  const gongjong_types = useMemo(() => (["석회_생산량","공정상_탄산염_사용량","유리_생산량","카바이드_생산량","소다회_생산량","합금철_생산량","아연_생산량","납_생산량"]),[]);
  const sebu_types = useMemo(() => ([
    "생석회","고토석회(경소백운석)","석회석(CaCO₃)","마그네사이트(MgCO₃)","백운석(CaMg·(CO₃)₂)","능철광(FeCO₃)","철백운석(Ca(Fe,Mg,Mn)(CaMg·(CO₃)₂)",
    "망간광(MnCO₃)","소다회(Na2CO₃)","판유리","유리용기(납유리)","유리용기(착색유리)","유리장섬유","브라운관용유리(Panel)","브라운관용유리(Funnel)","가정용 유리제품",
    "실험용기, 약병","전등용유리","칼슘카바이드(CaC₂)","소다회(Na₂CO₃)","합급철(Si 함량 45%)","합급철(Si 함량 65%)","합급철(Si 함량 75%)","합급철(Si 함량 90%)",
    "망간철(C함량 7%)","망간철(C함량 1%)","실리콘망간","실리콘메탈","제련 공정 구분 불가","Waelz Kiln 제련 공정","전기 열 공정","건식야금법 공정","납"
  ]), []);
  
  useEffect(() => {
    setDescription_gjType("");
    setFuel_sebu("");
  }, [emission]);
  
  const datePickerUtils = {
    format: "YYYY-MM-DD",
    parse: (value) => dayjs(value, "YYYY-MM-DD", true).toDate(),
  };
  
  const [processing, setProcessing] = useState(false);
  const handleRegister = async () => {
    setProcessing(true)
    const result = await esgFetch().then(res=>{
      setProcessing(false);
      return res.json();
    });
  }
  
  return (
    <ContentBody width={props.width} padding="24px" gap="32px" flex={1}>
      <SubTitle title={"신규 등록"}>
        <CloseIcon onClick={()=>props.closeRegister()} />
      </SubTitle>
      <div style={{width: "100%", height: "auto", overflow: "scroll", display: "flex", flex: 1, flexDirection: "column", gap: "32px"}}>
        <BlockGroup>
          <div style={{display: "flex", gap: "16px",alignItems: "center"}}>
            <BlockNumber>1</BlockNumber>
            <BlockTitle>조직정보 선택</BlockTitle>
          </div>
          <BlockFieldGroup>
            <BlockField>
              <BlockFieldTitle>조직 선택</BlockFieldTitle>
              <BlockFieldContent>
                <Select
                  value={group}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  fullWidth
                  onChange={event=>setGroup(event.target.value)}
                  displayEmpty
                  renderValue={selected => {
                    if(selected.length === 0){
                      return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>선택</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                  }}
                >
                  <MenuItem value={1}>사용</MenuItem>
                  <MenuItem value={0}>미사용</MenuItem>
                </Select>
              </BlockFieldContent>
            </BlockField>
            <BlockField>
              <BlockFieldTitle>사업장 선택</BlockFieldTitle>
              <BlockFieldContent>
                <Select
                  value={workplace}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  fullWidth
                  onChange={event=>setWorkplace(event.target.value)}
                  displayEmpty
                  renderValue={selected => {
                    if(selected.length === 0){
                      return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>선택</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                  }}
                >
                  <MenuItem value={1}>사용</MenuItem>
                  <MenuItem value={0}>미사용</MenuItem>
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
              <BlockFieldTitle>배출유형</BlockFieldTitle>
              <BlockFieldContent>
                <Select
                  value={emission}
                  size="small"
                  IconComponent={ExpandMoreIcon}
                  fullWidth
                  onChange={event=>setEmission(event.target.value)}
                  displayEmpty
                  renderValue={selected => {
                    if(selected.length === 0){
                      return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>유형 선택</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                  }}
                  MenuProps={{
                    PaperProps: {sx: {maxHeight: "220px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
                  }}
                >
                  {emisstion_types.map(type=><MenuItem value={type}>{type}</MenuItem>)}
                </Select>
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>시설명</BlockFieldTitle>
              <BlockFieldContent>
                <TextField placeholder="예) 발전기, 소각기, 차량 등 배출시설명 입력" value={facility} size="small" onChange={e=>setFacility(e.target.value)} fullWidth />
              </BlockFieldContent>
            </BlockField>
            
            
            {
              emission === "공정배출" ?
              <div style={{display: "flex", gap: "16px", flexDirection: "column"}}>
                <BlockField>
                  <BlockFieldTitle>공정구분</BlockFieldTitle>
                  <BlockFieldContent>
                    <Select
                      value={description_gjType}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      fullWidth
                      onChange={event=>setDescription_gjType(event.target.value)}
                      displayEmpty
                      renderValue={selected => {
                        if(selected.length === 0){
                          return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>공정 선택</Typography>
                        }
                        return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                      }}
                      MenuProps={{
                        PaperProps: {sx: {maxHeight: "150px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
                      }}
                    >
                      {gongjong_types.map(m=><MenuItem value={m}>{m}</MenuItem>)}
                    </Select>
                  </BlockFieldContent>
                </BlockField>
                
                <BlockField>
                  <BlockFieldTitle>세부구분</BlockFieldTitle>
                  <BlockFieldContent>
                    <Select
                      value={fuel_sebu}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      fullWidth
                      onChange={event=>setFuel_sebu(event.target.value)}
                      displayEmpty
                      renderValue={selected => {
                        if(selected.length === 0){
                          return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>세부항목 선택</Typography>
                        }
                        return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                      }}
                      MenuProps={{
                        PaperProps: {sx: {maxHeight: "150px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
                      }}
                    >
                      {sebu_types.map(m=><MenuItem value={m}>{m}</MenuItem>)}
                    </Select>
                  </BlockFieldContent>
                </BlockField>
              </div>
              :
              <div style={{display: "flex", gap: "16px", flexDirection: "column"}}>
                <BlockField>
                  <BlockFieldTitle>비고</BlockFieldTitle>
                  <BlockFieldContent>
                    <TextField placeholder="시설 및 차량에 대한 부연설명 입력" value={description_gjType} size="small" onChange={e=>setDescription_gjType(e.target.value)} fullWidth />
                  </BlockFieldContent>
                </BlockField>
                
                <BlockField>
                  <BlockFieldTitle>연료</BlockFieldTitle>
                  <BlockFieldContent>
                    <Select
                      value={fuel_sebu}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      disabled={emission === "전력"}
                      fullWidth
                      onChange={event=>setFuel_sebu(event.target.value)}
                      displayEmpty
                      renderValue={selected => {
                        if(selected.length === 0){
                          return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>연료 선택</Typography>
                        }
                        return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                      }}
                      MenuProps={{
                        PaperProps: {sx: {maxHeight: "150px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
                      }}
                    >
                      {Object.keys(fuel_types).includes(emission) ? fuel_types[emission].map(m=><MenuItem value={m}>{m}</MenuItem>):""}
                    </Select>
                  </BlockFieldContent>
                </BlockField>
              </div>
            }
            
            
            <BlockField>
              <BlockFieldTitle>시설 증설일</BlockFieldTitle>
              <BlockFieldContent>
                <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    slots={{openPickerIcon: CalendarIcon}}
                    slotProps={{
                      textField: {size: 'small', sx: {width: "100%"}, placeholder: "yyyy-mm-dd"},
                    }}
                    value={date}
                    onChange={e=>setDate(e.format('YYYY-MM-DD'))}
                  />
                </LocalizationProvider>
              </BlockFieldContent>
            </BlockField>
            
            <BlockField>
              <BlockFieldTitle>정부보고대상 여부</BlockFieldTitle>
              <BlockFieldContent>
                <RadioGroup row name="company_type" sx={{flex: 1}}>
                  <FormControlLabel checked={govReport===true} onChange={e=>setGovReport(true)} value='유' control={<Radio />} label="유" />
                  <FormControlLabel checked={govReport===false} onChange={e=>setGovReport(false)} value='무' control={<Radio />} label="무" />
                </RadioGroup>
              </BlockFieldContent>
            </BlockField>
          </BlockFieldGroup>
        </BlockGroup>
      </div>
      <Button variant={processing ? "btnDisabled" : "btnActive"} size="small" sx={{height:"40px"}} disabled={processing} fullWidth onClick={handleRegister}>등록</Button>
    </ContentBody>
  )
}

export default FacilityRegister;
