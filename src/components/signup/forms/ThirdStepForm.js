import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import { 
    Divider,
    InputLabel,
    Autocomplete,
    TextField,
    Button,
    Typography,
    IconButton,
    Dialog,
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { 
    FormContainer, 
    FormHeader, 
    ButtonSection,
    LabelSection,
    ThirdFormSection,
    AddressRow,
} from "../Styles";
import { 
   signupFormState,
   isFirstStepCompleted,
   isSecondStepCompleted,
   activeStep
} from "../State";
import countriesData from './country.json';


const countryNames = Object.values(countriesData).map((country) => country.CountryNameKR)

const ThridStepForm = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useRecoilState(signupFormState);
    const isFirstStepCompletedValue = useRecoilValue(isFirstStepCompleted);
    const isSecondStepCompletedValue = useRecoilValue(isSecondStepCompleted);
    const setActiveStep = useSetRecoilState(activeStep);

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    useEffect(() => {
        if (!isFirstStepCompletedValue) {
            navigate('/signup');
        }
        if (!isSecondStepCompletedValue) {
            navigate('/signup/step2');
        }
        setActiveStep(2);
        window.scrollTo(0, 0);
    }, []);

    const validateBusinessNumber = (number) => {
        const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
        return regex.test(number);
    }

    const validateCompanyNumber = (number) => {
        const regex = /^[0-9]{6}-[0-9]{7}$/;
        return regex.test(number);
    }

    const validPhoneNumber = (phoneNumber) => {
        const regex = /^\d{3}-\d{3,4}-\d{4}$/;
        return regex.test(phoneNumber);
    }

    const validEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    }

    const checkIdAvailability = () => {
        // TODO: API 연결 필요
        alert("사용 가능한 아이디 입니다.")
        setIsIdAvailable(true);
    }

    const handleChange = (field, value, error=false) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: {...fields[field], value: value, error: error},
        }));
    }

    const handleSubmit = () => {
        const errorfields = Object.values(fields).filter((field) => field.error);
        for (let field of errorfields) {
            alert(field.errorText);
            return;
        }

        if (!isIdAvailable) {
            alert('아이디 중복확인을 진행해 주세요');
            return;
        }
        navigate('/signup/step4');
    }

    return (
        <FormContainer>
            <FormHeader>사업자정보 입력</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ThirdFormSection>
                <LabelSection>
                    <InputLabel>회사명</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField 
                    required
                    value={fields.companyName.value}
                    onChange={({target: {value}}) => {
                        const error = value === '';
                        handleChange('companyName', value, error);
                    }}
                    placeholder="회사명을 입력하세요"
                />
                <InputLabel>회사 코드</InputLabel>
                <TextField 
                    disabled
                    placeholder="가입 완료 후 자동생성"
                >
                </TextField>
                <LabelSection>
                    <InputLabel>회사 구분</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <Autocomplete
                    disableClearable
                    value={fields.companyCategory.value}
                    options={['개인사업체', '법인사업체']}
                    onChange={(_, value) => {
                        const error = value === null;
                        handleChange('companyCategory', value, error);
                        if (value === '법인사업체') {
                            handleChange('companyNumber', fields.companyNumber.value, true);
                        } else {
                            handleChange('companyNumber', '', false);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="회사 구분"/>}
                />
                <LabelSection>   
                    <InputLabel>국가</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <Autocomplete
                    disableClearable
                    value={fields.country.value}
                    options={countryNames}
                    onChange={(_, value) => {
                        const error = value === null
                        handleChange('country', value, error);
                        if (value === '대한민국') {
                            const error = !validateBusinessNumber(fields.bizNumber.value);
                            handleChange('bizNumber', fields.bizNumber.value, error);
                        } else {
                            handleChange('bizNumber', fields.bizNumber.value, false);
                            handleChange('foreignerBizNumber', fields.foreignerBizNumber.value);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="국가"/>}
                />
                <LabelSection>
                    <InputLabel>사업자등록번호</InputLabel>
                    {fields.country.value === '대한민국' && <Typography color={'red'}>*</Typography>}
                </LabelSection>
                <TextField 
                    required
                    disabled={fields.country.value === '대한민국'}
                    type="text"
                    value={fields.country.value === '대한민국' ? 
                            fields.bizNumber.value : fields.foreignerBizNumber.value}
                    onChange={({target: {value}}) => {
                        if (fields.country.value === '대한민국') {
                            const error = !validateBusinessNumber(value);
                            handleChange('bizNumber', value, error);
                        } else {
                            handleChange('foreignerBizNumber', value);
                        }
                    }}
                    placeholder="사업자등록번호를 입력하세요"
                />
                <LabelSection>
                    <InputLabel>법인등록번호</InputLabel>
                    {fields.companyCategory.value === '법인사업체' && <Typography color={'red'}>*</Typography>}
                </LabelSection>
                <TextField 
                    required
                    disabled={fields.companyCategory.value !== '법인사업체'}
                    type="text"
                    value={fields.companyNumber.value}
                    onChange={({target: {value}}) => {
                        const error = !validateCompanyNumber(value);
                        handleChange('companyNumber', value, error);
                    }}
                    placeholder="법인등록번호를 입력하세요"
                />
                <LabelSection>
                    <InputLabel>대표자명</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField 
                    required
                    value={fields.representiveName.value}
                    onChange={({target: {value}}) => {
                        const error = value === '';
                        handleChange('representiveName', value, error);
                    }}
                    placeholder="대표자명을 입력하세요"
                />
                <InputLabel>담당자명</InputLabel>
                <TextField
                    value={fields.managerName.value}
                    onChange={({target: {value}}) => handleChange('managerName', value)}
                    placeholder="담당자명을 입력하세요"
                />
                <LabelSection>
                    <InputLabel>주소</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <AddressRow style={{gridColumn: 'span 3'}}>
                    <TextField 
                        disabled 
                        value={fields.zoneCode.value}
                        placeholder="우편번호"/>
                    <TextField 
                        disabled 
                        value={fields.address.value}
                        sx={{flex: '1'}} 
                        placeholder="주소"/>
                    <IconButton 
                        onClick={() => setIsPostcodeOpen(true)}
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.38)',
                            borderRadius: '4px',
                        }}
                    >
                        <SearchOutlinedIcon />
                    </IconButton>
                </AddressRow>
                <LabelSection>
                    <InputLabel>상세주소</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <AddressRow style={{gridColumn: 'span 3'}}>
                    <TextField 
                        required 
                        value={fields.addressDetail.value}
                        onChange={({target: {value}}) => {
                            const error = value === '';
                            handleChange('addressDetail', value, error);
                        }}
                        sx={{flex: '1'}}
                        placeholder="주소"
                    />
                </AddressRow>
                <Dialog
                    open={isPostcodeOpen}
                    onClose={() => setIsPostcodeOpen(false)}
                    fullWidth
                >
                    <DaumPostcode 
                        onComplete={(data) => {
                            handleChange('zoneCode', data.zonecode);
                            handleChange('address', data.address);
                            setIsPostcodeOpen(false);
                        }}
                        style={{minHeight: '450px'}}
                    />
                </Dialog>
                <LabelSection>
                    <InputLabel>대표전화번호</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField
                    required
                    type="tel"
                    value={fields.representivePhone.value}
                    onChange={({target: {value}}) => {
                        const error = !validPhoneNumber(value);
                        handleChange('representivePhone', value, error);
                    }}
                    placeholder="대표전화번호를 입력하세요"
                />
                <InputLabel>Fax번호</InputLabel>
                <TextField 
                    value={fields.fax.value}
                    onChange={({target: {value}}) => handleChange('fax', value)}
                    placeholder="Fax번호를 입력하세요"
                />
                <LabelSection>
                    <InputLabel>대표E-mail</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField 
                    required
                    type="email"
                    value={fields.representiveEmail.value}
                    onChange={({target: {value}}) => {
                        const error = !validEmail(value);
                        handleChange('representiveEmail', value, error);
                    }}
                    placeholder="대표E-mail을 입력하세요"
                />
                <InputLabel>홈페이지</InputLabel>
                <TextField 
                    value={fields.homepage.value}
                    onChange={({target: {value}}) => handleChange('homepage', value)}
                    placeholder="홈페이지를 입력하세요"
                />
                <InputLabel>업종</InputLabel>
                <TextField 
                    value={fields.bizSector.value}
                    onChange={({target: {value}}) => handleChange('bizSector', value)}
                    placeholder="업종을 입력하세요"
                />
                <InputLabel>업태</InputLabel>
                <TextField 
                    value={fields.bizType.value}
                    onChange={({target: {value}}) => handleChange('BizType', value)}
                    placeholder="업태를 입력하세요"
                />
                <LabelSection>
                    <InputLabel>주거래품목</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField 
                    required
                    value={fields.mainItem.value}
                    onChange={({target: {value}}) => {
                        const error = value === '';
                        handleChange('mainItem', value, error);
                    }}
                    placeholder="주거래품목을 입력하세요"
                />
                <InputLabel>회사규모</InputLabel>
                <Autocomplete
                    disableClearable
                    value={fields.companyScale.value}
                    options={['스타트업', '소기업', '중기업', '대기업']}
                    onChange={(_, value) => handleChange('companyScale', value)}
                    renderInput={(params) => <TextField {...params} label="회사 구분"/>}
                    placeholder="회사규모를 선택하세요"
                />
                <LabelSection>
                    <InputLabel>아이디</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <AddressRow>
                    <TextField 
                        required
                        value={fields.id.value}
                        onChange={({target: {value}}) => {
                            const error = value === '';
                            handleChange('id', value, error);
                            setIsIdAvailable(false);
                        }}
                        placeholder="아이디를 입력하세요"
                    />
                    <Button 
                        variant="contained"
                        onClick={checkIdAvailability}
                    >
                        중복확인
                    </Button>
                </AddressRow>
                <LabelSection>
                    <InputLabel>비밀번호</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <AddressRow>
                    <TextField 
                        required
                        type="password"
                        value={fields.password.value}
                        onChange={({target: {value}}) => {
                            const error = !validPassword(value);
                            handleChange('password', value, error);
                        }}
                        placeholder="비밀번호"
                    />
                    <TextField 
                        required
                        type="password"
                        value={fields.passwordCheck.value}
                        onChange={({target: {value}}) => {
                            const error = fields.password.value !== value;
                            handleChange('passwordCheck', value, error);
                        }}
                        placeholder="비밀번호 확인"
                    />
                </AddressRow>
                <LabelSection>
                    <InputLabel>담당자휴대폰</InputLabel>
                    <Typography color={'red'}>*</Typography>
                </LabelSection>
                <TextField 
                    required
                    type="tel"
                    value={fields.managerPhone.value}
                    onChange={({target: {value}}) => {
                        const error = !validPhoneNumber(value);
                        handleChange('managerPhone', value, error);
                    }}
                    placeholder="담당자 휴대폰 번호를 입력하세요"
                />
                <Typography sx={{gridColumn: 'span 2'}}>* 비밀번호는 8자 이상의 영문, 숫자, 특수문자 조합으로 생성</Typography>
            </ThirdFormSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button 
                    variant='contained' 
                    onClick={handleSubmit}
                >
                    정보 입력
                </Button>
                <Button 
                    variant='contained'
                    onClick={() => navigate('/')}
                >취소</Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default ThridStepForm;