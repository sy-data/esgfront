import { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { esgFetch } from "../../../components/FetchWrapper";
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRecoilState } from 'recoil';
import { workplaceDetailAtom } from "./states";
import { ReactComponent as CalendarIcon } from "../../../assets/images/IconCalendar.svg";
import { industry_type } from "./industryTypes";


const DetailField = ({ children, title, row = false, required = true }) => {
  return (
    <div style={{display:"flex", width:"100%", height:"40px"}}>
      <div style={{flex: 1, display: "flex", alignItems: "center", fontSize: "14px", fontWeight: 600, gap: "4px"}}>
        {title}
        {required && <div style={{width: "4px", height: "4px", backgroundColor: "red", borderRadius: "50%", marginBottom: "14px"}} />}
      </div>
      <div style={{width: "367px", ...(row && {display: "flex", flexDirection:"row", alignItems: "center"})}}>
        {children}
      </div>
    </div>
  )
}


const RightArea = props => {
  const [detail, setDetail] = useRecoilState(workplaceDetailAtom);
  const [valid, setValid] = useState(false);
  const required_fields = [
    "type",
    "company_branch",
    "company_name",
    "company_use",
    "company_number1",
    "company_number2",
    "company_number3",
    "industry_type",
    "company_size"
  ]
  
  const datePickerUtils = {
    format: "YYYY-MM-DD",
    parse: (value) => dayjs(value, "YYYY-MM-DD", true).toDate(),
  };
  
  const handleChange = (value, key) => {
    const newDetail = {
      ...detail,
      [key]: value
    }
    const isValid = k => {
      if(k === "company_branch"){
        return newDetail["type"] === "본사" || newDetail["company_branch"].length > 0;
      }
      return /^-?\d+$/.test(newDetail[k]) ? parseInt(newDetail[k]) >= 0 : newDetail[k].length > 0;
    }
    setDetail(newDetail);
    setValid(required_fields.every(field => isValid(field)));
  }
  
  const handleReset = () => {
    props.handleSelectRow(detail.id)
  }
  // const handleReset = async () => {
  //   const orgValue = await esgFetch().then(res=>res.json());
    
  //   setDetail({
  //     open: true,
  //     // id: selectedRow.id || "",
  //     type: orgValue.type || "",
  //     company_branch: orgValue.company_branch || "",
  //     company_name: orgValue.company_name || "",
  //     company_use: orgValue.company_use || "",
  //     company_number1: orgValue.company_number.split('-')[0] || "",
  //     company_number2: orgValue.company_number.split('-')[1] || "",
  //     company_number3: orgValue.company_number.split('-')[2] || "",
  //     workplace_name: orgValue.workplace_name || "",
  //     phone_number1: orgValue.phone_number1 || "",
  //     phone_number2: orgValue.phone_number2 || "",
  //     phone_number3: orgValue.phone_number3 || "",
  //     industry_type: orgValue.industry_type || "",
  //     company_size: orgValue.company_size || "",
  //     employee_number: orgValue.employee_number || "",
  //     address1: orgValue.address1 || "",
  //     address2: orgValue.address2 || "",
  //     address3: orgValue.address3 || "",
  //     sales_last: orgValue.sales_last || "",
  //     sales_now: orgValue.sales_now || "",
  //     area_j: orgValue.area_j || "",
  //     area_y: orgValue.area_y || "",
  //     register_date: orgValue.register_date || null,
  //     close_date: orgValue.close_date || null,
  //     product_yn: orgValue.product_yn || ""
  //   })
  // }
  
  const saveDetail = async () => {
    console.log(detail);
    
    const result = await esgFetch("", "POST", {
      id: detail.id || "",
      지점: detail.type,
      지점선택: detail.company_branch,
      title: detail.company_name,
      사용: detail.company_use,
      bn: [detail.company_number1,detail.company_number2,detail.company_number3].join(''),
      사업장명: detail.workplace_name,
      rep_tel_destination_code: detail.phone_number1,
      rep_tel_number: [detail.phone_number2, detail.phone_number3].join(''),
      산업군: detail.industry_type,
      company_type: detail.company_size,
      종업원수: detail.employee_number,
      zip_code: detail.address1,
      addr: detail.address2,
      addr_detail: detail.address3,
      전년도매출: detail.sales_last,
      당해년도매출: detail.sales_now,
      전용면적: detail.area_j,
      연면적: detail.area_y,
      등록일: detail.register_date,
      폐쇄일: detail.close_date,
      생산품: detail.product_yn
    }).then(res=>res.json());
    
    props.refreshList();
  }
  
  return (
    <ContentBody width={props.width} padding="24px" gap="32px">
      <SubTitle title={"사업장 상세"}>
        <CloseIcon onClick={()=>setDetail({...detail, open: !detail["open"]})} sx={{cursor: "pointer"}} />
      </SubTitle>
      <div style={{width: "100%", height: "auto", overflow: "scroll", display: "flex", flexDirection: "column", gap: "24px"}}>
        <DetailField title="회사구분" row={true}>
          <RadioGroup row name="company_type" sx={{flex: 1}}>
            <FormControlLabel checked={detail["type"] === '본사'} onChange={e=>handleChange(e.target.value, "type")} value='본사' control={<Radio />} label="본사" />
            <FormControlLabel checked={detail["type"] === '지사'} onChange={e=>handleChange(e.target.value, "type")} value='지사' control={<Radio />} label="지사(지점)" />
          </RadioGroup>
          <Select
            value={detail["company_branch"]}
            size="small"
            IconComponent={ExpandMoreIcon}
            sx={{flex: 0.9}}
            disabled={detail["type"] !== '지사'}
            onChange={e=>handleChange(e.target.value, "company_branch")}
            displayEmpty
            renderValue={selected => {
              const s = selected || detail["company_branch"];
              if(detail["type"] !== '지사' || s.length === 0){
                return <Typography style={{fontSize: "15px", color: "#AAAAAA", fontWeight: 600}}>지사(지점) 선택</Typography>
              }
              return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{s}</Typography>
            }}
          >
            <MenuItem value="지점1">지점1</MenuItem>
            <MenuItem value="지점2">지점2</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="사업자명">
          <TextField error={false} placeholder="사업자명을 입력하세요" value={detail["company_name"]} size="small" onChange={e=>handleChange(e.target.value, "company_name")} fullWidth />
        </DetailField>
        
        <DetailField title="사업장사용">
          <Select
            value={detail["company_use"]}
            size="small"
            IconComponent={ExpandMoreIcon}
            fullWidth
            onChange={e=>handleChange(e.target.value, "company_use")}
            displayEmpty
            renderValue={selected => {
              if(selected < 0){
                return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>사용 여부를 선택해주세요</Typography>
              }
              return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
            }}
          >
            <MenuItem value="사용">사용</MenuItem>
            <MenuItem value="미사용">미사용</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="사업장 등록번호" row={true}>
          <TextField placeholder="000" value={detail["company_number1"]} size="small" sx={{flex: 1}} onChange={e=>handleChange(e.target.value, "company_number1")} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="00" value={detail["company_number2"]} size="small" sx={{flex: 1}} onChange={e=>handleChange(e.target.value, "company_number2")} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="00000" value={detail["company_number3"]} size="small" sx={{flex: 2}} onChange={e=>handleChange(e.target.value, "company_number3")} />
        </DetailField>
        
        <DetailField title="사업장명" required={false}>
          <TextField placeholder="사업장명을 입력해주세요" value={detail["workplace_name"]} size="small" onChange={e=>handleChange(e.target.value, "workplace_name")} fullWidth />
        </DetailField>
        
        <DetailField title="전화번호" row={true} required={false}>
          <TextField placeholder="000" value={detail["phone_number1"]} size="small" onChange={e=>handleChange(e.target.value, "phone_number1")} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="0000" value={detail["phone_number2"]} size="small" onChange={e=>handleChange(e.target.value, "phone_number2")} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="0000" value={detail["phone_number3"]} size="small" onChange={e=>handleChange(e.target.value, "phone_number3")} />
        </DetailField>
        
        <DetailField title="산업군">
          <Select
            value={detail["industry_type"]}
            size="small"
            IconComponent={ExpandMoreIcon}
            fullWidth
            onChange={e=>handleChange(e.target.value, "industry_type")}
            displayEmpty
            MenuProps={{
              PaperProps: {sx: {maxHeight: "240px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
            }}
            renderValue={selected => {
              if(selected && selected.length === 0){
                return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>산업군을 선택해주세요</Typography>
              }
              return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
            }}
          >
            {industry_type.map(type => <MenuItem sx={{height: "40px", fontSize: "13px", padding: "10px"}} value={type}>{type}</MenuItem>)}
          </Select>
        </DetailField>
        
        <DetailField title="회사규모">
          <Select
            value={detail["company_size"]}
            size="small"
            IconComponent={ExpandMoreIcon}
            fullWidth
            onChange={e=>handleChange(e.target.value, "company_size")}
            displayEmpty
            renderValue={selected => {
              if(selected && selected.length === 0){
                return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>회사규모를 선택해주세요</Typography>
              }
              return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
            }}
          >
            {["대기업","중견기업","중소기업","중기업","소기업"].map(v=><MenuItem sx={{height: "40px", fontSize: "13px", padding: "10px"}} value={v}>{v}</MenuItem>)}
          </Select>
        </DetailField>
        
        <DetailField title="종업원 수(명)" required={false}>
          <TextField placeholder="종업원 수(명)을 입력해주세요" value={detail["employee_number"]} size="small" onChange={e=>handleChange(e.target.value, "employee_number")} fullWidth />
        </DetailField>
        
        <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
          <DetailField title="주소" required={false}>
            <TextField placeholder="우편번호 검색" value="" size="small" />
          </DetailField>
          <DetailField title="" required={false}>
            <TextField placeholder="" value="" size="small" disabled fullWidth />
          </DetailField>
          <DetailField title="" required={false}>
            <TextField placeholder="상세 주소를 입력해주세요" value="" size="small" fullWidth />
          </DetailField>
        </div>
        
        <DetailField title="전년도 매출(원)" required={false}>
          <TextField placeholder="전년도 매출액을 입력해주세요" value={detail["sales_last"]} onChange={e=>handleChange(e.target.value, "sales_last")} size="small" fullWidth />
        </DetailField>
        
        <DetailField title="당해년도 매출(원)" required={false}>
          <TextField placeholder="당해년도 매출액을 입력해주세요" value={detail["sales_now"]} onChange={e=>handleChange(e.target.value, "sales_now")} size="small" fullWidth />
        </DetailField>
        
        <DetailField title="전용면적 (㎡)" required={false}>
          <TextField placeholder="전용면적 (㎡)을 입력해주세요" value={detail["area_j"]} onChange={e=>handleChange(e.target.value, "area_j")} size="small" fullWidth />
        </DetailField>
        
        <DetailField title="연면적 (㎡)" required={false}>
          <TextField placeholder="연면적 (㎡)을 입력해주세요" value={detail["area_y"]} onChange={e=>handleChange(e.target.value, "area_y")} size="small" fullWidth />
        </DetailField>
        
        <DetailField title="사업장 등록일" required={false}>
          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
            <DatePicker
              format="YYYY-MM-DD"
              slots={{openPickerIcon: CalendarIcon}}
              slotProps={{
                textField: {size: 'small', sx: {width: "100%"}, placeholder: "yyyy-mm-dd"},
              }}
              value={detail["register_date"] ? dayjs(detail["register_date"]) : null}
              onChange={e => handleChange(e.format('YYYY-MM-DD'), "register_date")}
            />
          </LocalizationProvider>
        </DetailField>
        
        <DetailField title="사업장 폐쇄일" required={false}>
          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
            <DatePicker
              format="YYYY-MM-DD"
              slots={{openPickerIcon: CalendarIcon}}
              slotProps={{
                textField: {size: 'small', sx: {width: "100%"}, placeholder: "yyyy-mm-dd"},
              }}
              value={detail["close_date"] ? dayjs(detail["close_date"]) : null}
              onChange={e => handleChange(e.format('YYYY-MM-DD'), "close_date")}
            />
          </LocalizationProvider>
        </DetailField>
        
        <DetailField title="생산품" required={false}>
          <RadioGroup row name="product_yn" sx={{flex: 1}}>
            <FormControlLabel checked={detail["product_yn"] === 'y'} onChange={e=>handleChange(e.target.value, "product_yn")} value='y' control={<Radio />} label="유" />
            <FormControlLabel checked={detail["product_yn"] === 'n'} onChange={e=>handleChange(e.target.value, "product_yn")} value='n' control={<Radio />} label="무" />
          </RadioGroup>
        </DetailField>
      </div>
      <div style={{display:"flex", gap: "8px"}}>
        <Button variant="btnInit" sx={{flex:1}} onClick={handleReset}>초기화</Button>
        <Button variant={valid ? "btnActive":"btnDisabled"} disabled={!valid} sx={{flex:1}} onClick={saveDetail}>저장</Button>
      </div>
    </ContentBody>
  )
};

export default RightArea;
