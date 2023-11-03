import { useRef, useState, useEffect } from "react";
import { FormControl, Button, TextField, styled, InputAdornment, Select, MenuItem } from "@mui/material";
import Search from "@mui/icons-material/Search";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";


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


const RightArea = props => {
  const txtWorkplaceName = useRef();
  const [selectUse, setSelectUse] = useState('');
  const txtRegNumber = useRef();
  const txtCompanyName = useRef();
  const txtPhone = useRef();
  const [selectCategory, setSelectCategory] = useState('');
  const txtEmployees = useRef();
  const txtThisSales = useRef();
  const txtGrossArea = useRef();
  const txtNetArea = useRef();
  
  useEffect(() => {
    if(Object.keys(props.selectedWorkplace).length == 0){
      txtWorkplaceName.current.value = '';
      setSelectUse('');
      txtRegNumber.current.value = '';
      txtCompanyName.current.value = '';
      txtPhone.current.value = '';
      setSelectCategory('');
      txtEmployees.current.value = '';
      txtThisSales.current.value = '';
      txtGrossArea.current.value = '';
      txtNetArea.current.value = '';
    }
    else{
      txtWorkplaceName.current.value = "name" in props.selectedWorkplace ? props.selectedWorkplace.name : ''
      
    }
  }, [props.selectedWorkplace]);
  
  const InputField = props => {
    return (
      <InputContainer>
        <InputLabel>{props.label}</InputLabel>
        <TextField sx={{ width: 200 }} variant="outlined" size="small" inputRef={props.inputRef} />
      </InputContainer>
    )
  }
  
  return (
    <ContentBody>
      <SubTitle title={"사업장 상세"} />
      <ButtonContainer>
        <ButtonNewSave variant="outlined" size="small" onClick={() => props.setSelectedWorkplace({})}>신규</ButtonNewSave>
        <ButtonNewSave variant="outlined" size="small" onClick={() => console.log("save")}>저장</ButtonNewSave>
      </ButtonContainer>
      
      <InputBlock>
        <InputField label="사업장명 *" inputRef={txtWorkplaceName} />
        <InputContainer>
          <InputLabel>사업장 사용 *</InputLabel>
          <Select value={selectUse} sx={{ width: 200 }} size="small">
            <MenuItem value={true}>사용</MenuItem>
            <MenuItem value={false}>미사용</MenuItem>
          </Select>
        </InputContainer>
      </InputBlock>
      
      <InputBlock>
        <InputField label="사업자 등록번호" inputRef={txtRegNumber} />
        <InputField label="사업자명" inputRef={txtCompanyName} />
      </InputBlock>
      
      <InputBlock>
        <InputField label="전화번호" inputRef={txtPhone} />
        <InputContainer>
          <InputLabel>산업군 *</InputLabel>
          <Select value={selectCategory} sx={{ width: 200 }} size="small">
            <MenuItem value={1}>산업군 1</MenuItem>
            <MenuItem value={2}>산업군 2</MenuItem>
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
        <InputField label="종업원수" inputRef={txtEmployees} />
        <InputField label={<>당해년도 매출<br />(원)</>} inputRef={txtThisSales} />
      </InputBlock>
      
      <InputBlock>
        <InputField label="전용면적" inputRef={txtGrossArea} />
        <InputField label="연면적" inputRef={txtNetArea} />
      </InputBlock>
      
      <InputBlock>
        <InputContainer>
          <InputLabel>이전일</InputLabel>
          <TextField sx={{ width: 200 }} variant="outlined" size="small"
            InputProps={{ endAdornment: <InputAdornment position="end"><CalendarMonth /></InputAdornment> }} />
        </InputContainer>
        <InputContainer>
          <InputLabel>폐쇄일</InputLabel>
          <TextField sx={{ width: 200 }} variant="outlined" size="small"
            InputProps={{ endAdornment: <InputAdornment position="end"><CalendarMonth /></InputAdornment> }} />
        </InputContainer>
      </InputBlock>
      <div style={{ margin: '10px', color: 'red' }}>
        * 필수 입력 항목
      </div>
    </ContentBody>
  )
}

export default RightArea;
