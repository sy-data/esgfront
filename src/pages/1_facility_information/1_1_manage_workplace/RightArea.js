import { useState, forwardRef, useImperativeHandle } from "react";
import { FormControl, Button, TextField, styled, InputAdornment, Select, MenuItem } from "@mui/material";
import Search from "@mui/icons-material/Search";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { esgFetch } from "../../../components/FetchWrapper";


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
        // update datagrid values
        const updateListData = JSON.parse(JSON.stringify(props.workplaceList));
        const changeIndex = updateListData.find(w => w.id === props.selectedWorkplace).index;
        
        for(let k of Object.keys(updateData)){
          if(k in updateListData[changeIndex-1]){
            updateListData[changeIndex-1][k] = updateData[k];
          }
          if(k in updateListData[changeIndex-1]['attributes']){
            updateListData[changeIndex-1]['attributes'][k] = updateData[k];
          }
        }
        props.setWorkplaceList(updateListData);
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
  
  return (
    <ContentBody>
      <SubTitle title={"사업장 상세"} />
      <ButtonContainer>
        <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={() => clearFields()}>신규</ButtonNewSave>
        <ButtonNewSave color="btnSearch" variant="outlined" size="small" onClick={() => saveWorkspace()}>저장</ButtonNewSave>
      </ButtonContainer>
      
      <InputBlock>
        <InputField label="사업장명 *" value={workplaceName} change={e => setWorkplaceName(e.target.value)} />
        <InputContainer>
          <InputLabel>사업장 사용 *</InputLabel>
          <Select value={selectUse} sx={{ width: 200 }} size="small">
            <MenuItem value={true}>사용</MenuItem>
            <MenuItem value={false}>미사용</MenuItem>
          </Select>
        </InputContainer>
      </InputBlock>
      
      <InputBlock>
        <InputField label="사업자 등록번호" value={regNumber} change={e => {!props.selectedWorkplace && setRegNumber(e.target.value)}} />
        <InputField label="사업자명" value={companyName} />
      </InputBlock>
      
      <InputBlock>
        <InputField label="전화번호" value={phoneNumber} change={e => setPhoneNumber(e.target.value)} />
        <InputContainer>
          <InputLabel>산업군 *</InputLabel>
          <Select value={selectCategory} sx={{ width: 200 }} size="small" onChange={e => setSelectCategory(e.target.value)}>
            {/* TODO : category init */}
            <MenuItem value={1}>산업군 1</MenuItem>
            <MenuItem value={2}>산업군 2</MenuItem>
            <MenuItem value={3}>상업/공공</MenuItem>
          </Select>
        </InputContainer>
      </InputBlock>
      
      <>
        <InputContainer>
          <InputLabel></InputLabel>
          <TextField sx={{ width: 250 }} variant="outlined" size="small"
            InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment> }} />
        </InputContainer>
        <InputContainer>
          <InputLabel>주소</InputLabel>
          <TextField sx={{ width: 1, maxWidth: 540, bgcolor: '#CCCCCC' }} variant="outlined" size="small" disabled />
        </InputContainer>
        <InputContainer>
          <InputLabel></InputLabel>
          <TextField sx={{ width: 1, maxWidth: 540 }} variant="outlined" size="small" />
        </InputContainer>
      </>
      
      <InputBlock>
        <InputField label="종업원수" value={employees} change={e => setEmployees(e.target.value)} />
        <InputField label={<>당해년도 매출<br />(원)</>} value={thisSales} />
      </InputBlock>
      
      <InputBlock>
        <InputField label="전용면적" value={grossArea} change={e => setGrossArea(e.target.value)} />
        <InputField label="연면적" value={netArea} change={e => setNetArea(e.target.value)} />
      </InputBlock>
      
      <InputBlock>  
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
          <InputContainer>
            <InputLabel>이전일</InputLabel>
            <DatePicker label='' formatDensity="spacious" format="YYYY / MM / DD"
              slotProps={{ textField: {size: 'small', sx: {width: 200}}}} 
              value={dayjs(dateSince)} onChange={newDate => changeSince(newDate)} />
          </InputContainer>
          
          <InputContainer>
            <InputLabel>폐쇄일</InputLabel>
            <DatePicker label='' formatDensity="spacious" format="YYYY / MM / DD"
              slotProps={{ textField: { size: 'small', sx: { width: 200 } } }}
              value={dayjs(dateUntil)} onChange={newDate => changeUntil(newDate)} />
          </InputContainer>
        </LocalizationProvider>
      </InputBlock>
      <div style={{ margin: '10px', color: 'red' }}>
        * 필수 입력 항목
      </div>
    </ContentBody>
  )
});

export default RightArea;
