import { useState } from "react";
import { 
    styled,
    Divider,
    InputLabel,
    Autocomplete,
    TextField,
    Button,
    Typography,
    IconButton,
 } from "@mui/material";
 import { RecoilRoot } from 'recoil';
 import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import countriesData from './country.json';

 import { FormContainer, FormHeader, ButtonSection } from "../Styles";


const FormSection = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 5fr 1fr 5fr',
    alignItems: 'center',
    gap: '20px',
}))

const AddressRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
}))

const countryNames = Object.values(countriesData).map((country) => country.CountryNameKR)

const ThridStepForm = ({setActiveStep}) => {
    const [fields, setFields] = useState({
        companyName: {value: '', error: false},
        companyCategory: {value: '', error: false},
        country: {value: '', error: false},
        corporationRegNum: {value: '', error: false},
        representiveName: {value: '', error: false},
        managerName: {value: '', error: true},
        address: {value: '', error: false},
        addressDetail: {value: '', error: false},
        representivePhone: {value: '', error: false},
        fax: {value: '', error: true},
        representiveEmail: {value: '', error: false},
        homepage: {value: '', error: true},
        businessSector: {value: '', error: true},
        businessType: {value: '', error: true},
        mainItem: {value: '', error: false},
        companyScale: {value: '', error: true},
        id: {value: '', error: false},
        password: {value: '', error: false},
        passwordCheck: {value: '', error: false},
        managerPhone: {value: '', error: false},
    });

    const validPhoneNumber = (phoneNumber) => {
        const regex = /^\d{3}-\d{3,4}-\d{4}$/;
        return regex.test(phoneNumber);
    }

    const validEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validHomepage = (homepage) => {
        const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return regex.test(homepage);
    }

    const validPassword = (password) => {
        const regex = /\^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    }

    const handleChange = (field, value) => {
        const newFields = {...fields};
        newFields[field].value = value;
        setFields(newFields);
    }

    const handleSubmit = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return (
        <FormContainer>
            <FormHeader>사업자정보 입력</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <FormSection>
                <InputLabel>회사명</InputLabel>
                <TextField 
                    required
                    value={fields.companyName.value}
                    error={fields.companyName.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        newFields.companyName.error = fields.companyName.value === '';
                        setFields(newFields);
                    }}
                    onChange={({target: {value}}) => handleChange('companyName', value) }
                    placeholder="회사명을 입력하세요"
                />
                <InputLabel>회사 코드</InputLabel>
                <TextField 
                    disabled
                    placeholder="가입 완료 후 자동생성"
                >
                </TextField>
                <InputLabel>회사 구분</InputLabel>
                <Autocomplete
                    disableClearable
                    options={['개인사업체', '법인사업체']}
                    onChange={(_, value) => handleChange('companyCategory', value)}
                    renderInput={(params) => <TextField {...params} label="회사 구분"/>}
                />
                <InputLabel>국가</InputLabel>
                <Autocomplete
                    disableClearable
                    options={countryNames}
                    onChange={(_, value) => handleChange('country', value)}
                    renderInput={(params) => <TextField {...params} label="국가"/>}
                />
                <InputLabel>사업자등록번호</InputLabel>
                <TextField 
                    disabled
                />
                <InputLabel>법인등록번호</InputLabel>
                <TextField 
                    disabled={fields.companyCategory.value !== '법인사업체'}
                    value={fields.corporationRegNum.value}
                    error={fields.corporationRegNum.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        const regex = /^\d{6}-\d{7}$/;
                        newFields.corporationRegNum.error = !regex.test(fields.corporationRegNum.value);
                        setFields(newFields);
                    }}
                    onChange={({target: {value}}) => handleChange('corporationRegNum', value)}
                    placeholder="법인등록번호를 입력하세요"
                />
                <InputLabel>대표자명</InputLabel>
                <TextField 
                    required
                    value={fields.representiveName.value}
                    error={fields.representiveName.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        newFields.representiveName.error = fields.representiveName.value === '';
                        setFields(newFields);
                    }}
                    onChange={({target: {value}}) => handleChange('representiveName', value)}
                    placeholder="대표자명을 입력하세요"
                />
                <InputLabel>담당자명</InputLabel>
                <TextField
                    value={fields.managerName.value}
                    onChange={({target: {value}}) => handleChange('managerName', value)}
                    placeholder="담당자명을 입력하세요"
                />
                <InputLabel>주소</InputLabel>
                <AddressRow style={{gridColumn: 'span 3'}}>
                    <Button variant="contained">우편번호</Button>
                    <TextField disabled sx={{flex: '1'}} placeholder="주소"/>
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                </AddressRow>
                <InputLabel>상세주소</InputLabel>
                <AddressRow style={{gridColumn: 'span 3'}}>
                    <TextField 
                        required 
                        value={fields.addressDetail.value}
                        onChange={({target: {value}}) => handleChange('addressDetail', value)}
                        sx={{flex: '1'}}
                        placeholder="주소"
                    />
                </AddressRow>
                <InputLabel>대표전화번호</InputLabel>
                <TextField
                    required
                    value={fields.representivePhone.value}
                    error={fields.representivePhone.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        newFields.representivePhone.error = !validPhoneNumber(fields.representivePhone.value);
                        setFields(newFields);
                    }}
                    onChange={({target: {value}}) => handleChange('representivePhone', value)}
                    placeholder="대표전화번호를 입력하세요"
                />
                <InputLabel>Fax번호</InputLabel>
                <TextField 
                    value={fields.fax.value}
                    onChange={({target: {value}}) => handleChange('fax', value)}
                    placeholder="Fax번호를 입력하세요"
                />
                <InputLabel>대표E-mail</InputLabel>
                <TextField 
                    required
                    value={fields.representiveEmail.value}
                    error={fields.representiveEmail.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        newFields.representiveEmail.error = !validEmail(fields.representiveEmail.value);
                        setFields(newFields);
                    }}
                    onChange={({target: {value}}) => handleChange('representiveEmail', value)}
                    placeholder="대표E-mail을 입력하세요"
                />
                <InputLabel>홈페이지</InputLabel>
                <TextField 
                    value={fields.homepage.value}
                    error={fields.homepage.error}
                    onBlur={() => {
                        const newFields = {...fields};
                        if (fields.homepage.value !== '') {
                            newFields.homepage.error = !validHomepage(fields.homepage.value);
                            setFields(newFields);
                        }
                    }}
                    onChange={({target: {value}}) => handleChange('homepage', value)}
                    placeholder="홈페이지를 입력하세요"
                />
                <InputLabel>업종</InputLabel>
                <TextField 
                    value={fields.businessSector.value}
                    onChange={({target: {value}}) => handleChange('businessSector', value)}
                    placeholder="업종을 입력하세요"
                />
                <InputLabel>업태</InputLabel>
                <TextField 
                    value={fields.businessType.value}
                    onChange={({target: {value}}) => handleChange('businessType', value)}
                    placeholder="업태를 입력하세요"
                />
                <InputLabel>주거래품목</InputLabel>
                <TextField 
                    required
                    value={fields.mainItem.value}
                    onChange={({target: {value}}) => handleChange('mainItem', value)}
                    placeholder="주거래품목을 입력하세요"
                />
                <InputLabel>회사규모</InputLabel>
                <Autocomplete
                    disableClearable
                    options={['스타트업', '소기업', '중기업', '대기업']}
                    onChange={(_, value) => handleChange('companyCategory', value)}
                    renderInput={(params) => <TextField {...params} label="회사 구분"/>}
                    placeholder="회사규모를 선택하세요"
                />
                <InputLabel>아이디</InputLabel>
                <AddressRow>
                    <TextField 
                        required
                        value={fields.id.value}
                        onChange={({target: {value}}) => handleChange('id', value)}
                        placeholder="아이디를 입력하세요"
                    />
                    <Button variant="contained">중복확인</Button>
                </AddressRow>
                <InputLabel>비밀번호</InputLabel>
                <AddressRow>
                    <TextField 
                        required
                        value={fields.password.value}
                        onChange={({target: {value}}) => handleChange('password', value)}
                        placeholder="비밀번호"
                    />
                    <TextField 
                        required
                        value={fields.passwordCheck.value}
                        onChange={({target: {value}}) => handleChange('passwordCheck', value)}
                        placeholder="비밀번호 확인"
                    />
                </AddressRow>
                <InputLabel>담당자휴대폰</InputLabel>
                <TextField 
                    required
                    value={fields.managerPhone.value}
                    onChange={({target: {value}}) => handleChange('managerPhone', value)}
                    placeholder="담당자 휴대폰 번호를 입력하세요"
                />
                <Typography sx={{gridColumn: 'span 2'}}>* 비밀번호는 8자 이상의 영문, 숫자, 특수문자 조합으로 생성</Typography>
            </FormSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button 
                    variant='contained' 
                    disabled={Object.values(fields).some((field) => field.error)}
                    onClick={handleSubmit}
                >
                    정보 입력
                </Button>
                <Button variant='contained'>취소</Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default ThridStepForm;