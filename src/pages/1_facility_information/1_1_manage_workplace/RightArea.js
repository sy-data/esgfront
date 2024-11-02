import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { FormControl, Button, TextField, styled, InputAdornment, Select, MenuItem } from "@mui/material";
import Search from "@mui/icons-material/Search";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '10px 0',
  maxWidth: '680px'
}));
const ButtonNewSave = styled(Button)(() => ({
  marginLeft: '5px'
}));
const InputBlock = styled('div')(() => ({
  display: 'flex',
}));
const InputContainer = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'row',
  height: '44px',
  alignItems: 'center'
}));
const InputLabel = styled('div')(() => ({
  padding: '0px 10px',
  margin: '0px 10px',
  height: '100%',
  minWidth: '100px',
  fontSize: '0.9em',
  backgroundColor: '#999999',
  display: 'flex',
  alignItems: 'center'
}));

const InputField = props => {
  return (
    <InputContainer>
      <InputLabel>{props.label}</InputLabel>
      <TextField sx={{ width: 200 }} variant="outlined" size="small" value={props.value} onChange={props.change} />
    </InputContainer>
  )
}

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


const RightArea = forwardRef((props, ref) => {
  const [workplaceName, setWorkplaceName] = useState('');
  const [selectUse, setSelectUse] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [employees, setEmployees] = useState('');
  const [thisSales, setThisSales] = useState('');
  const [grossArea, setGrossArea] = useState('');
  const [netArea, setNetArea] = useState('');
  const [dateSince, setDateSince] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [industryType, setIndustryType] = useState([]);
  
  
  const datePickerFormat = "YYYY-MM-DD";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };
  const changeUntil = (date) => {
    // formattedDate : 2023-11-11
    const formattedDate = dayjs(date).format(datePickerFormat);
    setDateUntil(formattedDate);
  }
  const changeSince = (date) => {
    // formattedDate : 2023-11-11
    const formattedDate = dayjs(date).format(datePickerFormat);
    setDateSince(formattedDate);
  }

  useImperativeHandle(ref, () => ({
    updateFields(values) {
      setWorkplaceName(values.name ? values.name : '');
      setSelectUse(true);
      
      setRegNumber(values.brn ? values.brn : '');
      // TODO : catch
      setCompanyName(values.company.data.attributes.name);
      
      setPhoneNumber(values.phone ? values.phone : '');
      setSelectCategory(values.company.data.attributes.industry.data.id);
      
      // TODO : address
      
      setEmployees(values.number_of_employees ? values.number_of_employees : '');
      setThisSales(values.sales ? values.sales : '');
      
      setGrossArea(values.gross_area ? values.gross_area : '');
      setNetArea(values.net_area ? values.net_area : '');

      setDateSince(values.since ? dayjs(values.since).format(datePickerFormat) : '');
      setDateSince(values.until ? dayjs(values.until).format(datePickerFormat) : '');
    }
  }));
  
  function clearFields(){
    props.setSelectedWorkplace(null)
    setWorkplaceName('');
    setSelectUse('');
    setRegNumber('');
    setCompanyName('');
    setPhoneNumber('');
    setSelectCategory('');
    setEmployees('');
    setThisSales('');
    setGrossArea('');
    setNetArea('');
    setDateSince('');
    setDateUntil('');
  }
  
  function saveWorkspace(){
    if(props.selectedWorkplace){
      const updateData = {
        updatedAt: new Date(),
        ...(workplaceName && {name: workplaceName}),
        // TODO : update with address input
        ...(false && {address: null}),
        ...(employees && {number_of_employees: employees}),
        ...(thisSales && {sales: thisSales}),
        ...(grossArea && {gross_area: grossArea}),
        ...(netArea && {net_area: netArea}),
        ...(dateUntil && {until: dateUntil}),
        ...(phoneNumber && {phone: phoneNumber})
      }
      esgFetch(`/api/factories/${props.selectedWorkplace}`, 'PUT', {
        data: updateData
      }).then(() => {
        // // update datagrid values
        // const updateListData = JSON.parse(JSON.stringify(props.workplaceList));
        // const changeIndex = updateListData.find(w => w.id === props.selectedWorkplace).index;
        
        // for(let k of Object.keys(updateData)){
        //   if(k in updateListData[changeIndex-1]){
        //     updateListData[changeIndex-1][k] = updateData[k];
        //   }
        //   if(k in updateListData[changeIndex-1]['attributes']){
        //     updateListData[changeIndex-1]['attributes'][k] = updateData[k];
        //   }
        // }
        // props.setWorkplaceList(updateListData);
        props.setWorkplaceList([]);
      });
    }
    else{
      const fetchCompany = Promise.resolve(esgFetch('/api/users/me?populate[0]=company', 'GET').then(res => res.json()).then(r=>r.company.id));
      
      fetchCompany.then(companyId => {
        esgFetch('/api/factories', 'POST', {
          data: {
            name: workplaceName,
            createdAt: new Date(),
            updatedAt: new Date(),
            // TODO : update with address input
            address: null,
            number_of_employees: employees,
            sales: thisSales ? thisSales : null,
            gross_area: grossArea,
            net_area: netArea,
            since: dateSince ? dateSince : null,
            until: dateUntil ? dateUntil : null,
            phone: phoneNumber,
            brn: regNumber,
            company: {
              id: companyId
            }
          }
        })
      });
    }
  }
  
  useEffect(() => {
    // esgFetch('/api/type-industries', 'GET')
    //   .then(res => res.json())
    //   .then(result => {
    //     setIndustryType(result.data);
    //   })
  },[]);
  
  return (
    <ContentBody width={props.width} padding="24px" gap="32px">
      <SubTitle title={"사업장 상세"}>
        <CloseIcon />
      </SubTitle>
      <div style={{width: "100%", height: "auto", overflow: "scroll", display: "flex", flexDirection: "column", gap: "24px"}}>
        <DetailField title="회사구분" row={true}>
          <RadioGroup row name="company_type" sx={{flex: 1}}>
            <FormControlLabel value="bs" control={<Radio />} label="본사" />
            <FormControlLabel value="js" control={<Radio />} label="지사(지점)" />
          </RadioGroup>
          <Select label="지사(지점) 선택" value="" size="small" IconComponent={ExpandMoreIcon} sx={{flex: 0.9}} disabled >
            <MenuItem value={1}>사용</MenuItem>
            <MenuItem value={0}>미사용</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="사업장명">
          <TextField placeholder="사업장명을 입력하세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="사업장사용">
          <Select label="사용 여부를 선택해주세요" value="" size="small" fullWidth IconComponent={ExpandMoreIcon} >
            <MenuItem value={1}>사용</MenuItem>
            <MenuItem value={0}>미사용</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="사업장 등록번호" row={true}>
          <TextField placeholder="000" value="" size="small" sx={{width: "110px"}} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="00" value="" size="small" sx={{width: "110px"}} />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="00000" value="" size="small" />
        </DetailField>
        
        <DetailField title="사업장명" required={false}>
          <TextField placeholder="사업장명을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="전화번호" row={true} required={false}>
          <TextField placeholder="000" value="" size="small" />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="0000" value="" size="small" />
          <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
          <TextField placeholder="0000" value="" size="small" />
        </DetailField>
        
        <DetailField title="산업군">
          <Select value="" size="small" fullWidth IconComponent={ExpandMoreIcon}>
            <MenuItem value={1}>산업군1</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="회사규모">
          <Select value="" size="small" fullWidth IconComponent={ExpandMoreIcon}>
            <MenuItem value={1}>회사규모1</MenuItem>
          </Select>
        </DetailField>
        
        <DetailField title="종업원 수(명)" required={false}>
          <TextField placeholder="종업원 수(명)을 입력해주세요" value="" size="small" fullWidth />
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
          <TextField placeholder="전년도 매출액을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="당해년도 매출(원)" required={false}>
          <TextField placeholder="당해년도 매출액을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="전용면적 (㎡)" required={false}>
          <TextField placeholder="전용면적 (㎡)을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="연면적 (㎡)" required={false}>
          <TextField placeholder="연면적 (㎡)을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="사업장 등록일" required={false}>
          <TextField placeholder="을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
        
        <DetailField title="사업장 폐쇄일" required={false}>
          <TextField placeholder="을 입력해주세요" value="" size="small" fullWidth />
        </DetailField>
      </div>
      <div style={{display:"flex", gap: "8px"}}>
        <Button variant="btnInit" sx={{flex:1}}>초기화</Button>
        <Button variant="btnDisabled" sx={{flex:1}}>저장</Button>
      </div>
    </ContentBody>
  )
});

export default RightArea;
