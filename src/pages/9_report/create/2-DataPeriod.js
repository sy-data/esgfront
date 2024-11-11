import {useState} from 'react';
import { MenuItem, Select, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const DataPeriod = props => {
  const [fy, setFy] = useState("");
  const [fm, setFm] = useState("");
  const [fd, setFd] = useState("");
  const handleFy = event => setFy(event.target.value);
  const handleFm = event => setFm(event.target.value);
  const handleFd = event => setFd(event.target.value);
  const [ty, setTy] = useState("");
  const [tm, setTm] = useState("");
  const [td, setTd] = useState("");
  const handleTy = event => setTy(event.target.value);
  const handleTm = event => setTm(event.target.value);
  const handleTd = event => setTd(event.target.value);
  
  const DateSelect = props => {
    return (
      <div style={{flex: 1}}>
        <div style={{marginBottom: "4px", padding: "0 4px", fontSize: "14px", fontWeight: 600, fontFamily: "Pretendard Variable"}}>
          {props.ft} {props.scale}
        </div>
        <Select
          size='small'
          value={props.value}
          displayEmpty
          onChange={props.onChange}
          sx={{width: "100%"}}
          IconComponent={ExpandMoreIcon}
          renderValue={selected => {
            if(selected.length === 0){
              return <Typography style={{fontSize: "13px", color: "#AAAAAA"}}>{props.scale}</Typography>
            }
            return <Typography style={{fontSize: "13px", color: "#111111", fontWeight: "bold"}}>{props.value}</Typography>;
          }}
        >
          <Box display={"none"}><MenuItem value=""></MenuItem></Box>
          {props.options.map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)}
        </Select>
      </div>
    )
  }
  
  const optionYear = Array.from({length: 3}, (_, i) => 2024-i).map(m => ({value: m, label: m}));
  const optionMonth = Array.from({length: 12}, (_, i) => i+1).map(m => ({value: m, label: m}));
  const dateLength = month => {
    if(month === "") return 0;
    else if(month === 2) return 29;
    else if([1,3,5,7,8,10,12].includes(month)) return 31;
    else return 30;
  }
  const optionFDate = Array.from({length: dateLength(fm)}, (_, i) => i+1).map(m => ({value: m, label: m}));
  const optionTDate = Array.from({length: dateLength(tm)}, (_, i) => i+1).map(m => ({value: m, label: m}));
  
  return(
    <div style={{width: "40%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", height: "27px", alignItems: "center", marginBottom: "16px", fontFamily: "Pretendard Variable"}}>
        <div style={{fontSize: "18px", fontWeight: "bold", marginLeft: "5px"}}>2. 데이터 기간 선택</div>
      </div>
      <div style={{
        flexGrow: 1, backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EEEEEE", overflow: "auto",
        width: "100%", boxSizing: "border-box", padding: "24px"
      }}>
        <div style={{fontSize: "16px", marginBottom: "24px"}}>
          보고서를 작성할 <span style={{fontWeight: "bold"}}>데이터의 기간(시작일시와 마감일시)</span>을 정해주세요.
        </div>
        <div style={{display: "flex", gap: "16px", marginBottom: "24px"}}>
          <DateSelect value={fy} onChange={handleFy} ft={"시작"} scale={"년도"} options={optionYear} />
          <DateSelect value={fm} onChange={handleFm} ft={"시작"} scale={"월"} options={optionMonth} />
          <DateSelect value={fd} onChange={handleFd} ft={"시작"} scale={"일"} options={optionFDate} />
          <div style={{display: "flex", alignItems: "center", height: "40px", alignSelf: "flex-end"}}>
            부터
          </div>
        </div>
        <div style={{display: "flex", gap: "16px", marginBottom: "24px"}}>
          <DateSelect value={ty} onChange={handleTy} ft={"종료"} scale={"년도"} options={optionYear} />
          <DateSelect value={tm} onChange={handleTm} ft={"종료"} scale={"월"} options={optionMonth} />
          <DateSelect value={td} onChange={handleTd} ft={"종료"} scale={"일"} options={optionTDate} />
          <div style={{display: "flex", alignItems: "center", height: "40px", alignSelf: "flex-end"}}>
            까지
          </div>
        </div>
      </div>
      <div style={{marginTop: "24px", height: "40px", display: "flex", gap: "8px"}}>
        <Button sx={{flex: 1}} variant="btnInit">취소</Button>
        <Button sx={{flex: 1}} variant={(fy&&fm&&fd&&ty&&tm&&td)?"btnActive":"btnDisabled"}>보고서 생성</Button>
      </div>
    </div>
  )
}

export default DataPeriod;
