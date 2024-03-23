import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    Divider,
    InputLabel,
    Typography,
    Autocomplete,
    TextField,
    Button,
} from "@mui/material";
import {
    FormContainer,
    FormHeader,
    ButtonSection,
    LabelSection,
    FirstFormSection,
    FirstFormRow,
} from "../Styles";
import { signupFormState, activeStep } from "../State";
import { esgFetch } from "../../FetchWrapper";
import countriesData from './country.json';

const countryNames = Object.values(countriesData).map((country) => country.CountryNameKR)

const FirstStepForm = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useRecoilState(signupFormState);
    const setActiveStep = useSetRecoilState(activeStep);

    useEffect(() => {
        setActiveStep(0);
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (field, value, error = false) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: { ...fields[field], value: value, error },
        }))
    }

    const formatBizNumber = (value) => {
        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 3) {
            return onlyNums;
        }
        if (onlyNums.length <= 5) {
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        }
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5, 10)}`;
    };

    const validateBizNumber = (number) => {
        const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
        return regex.test(number);
    }

    const handleSubmit = async () => {
        if (checkErrorFields()) return;
        if (await checkRegister()) return;
        navigate('/signup/step2');
    }

    const checkErrorFields = () => {
        const firstForms = ['country', 'companyCategory', 'bizNumber', 'companyName']
        for (let form of firstForms) {
            if (fields[form].error) {
                alert(fields[form].errorText);
                return true;
            }
        }
        return false;
    }

    const checkRegister = async () => {
        const url = `/api/companies?` + 
            `filters[country][$eq]=${convertToCountryCode(fields.country)}&` +
            `filters[brn][$eq]=${fields.bizNumber.value}&` +
            `filters[type][$eq]=${fields.companyCategory.value === "개인사업체" ? "personal" : "company"}&` +
            `filters[name][$eq]=${fields.companyName.value}`;
        const result = esgFetch(url, 'GET', {}, false).then((response) => {
            if (response.ok) return response.json();
            else throw new Error(`${response.status} ${response.statusText}`);
        }).then(({data: value}) => {
            if (value.length === 0) {
                return false;
            }
            alert('이미 등록된 회사입니다.');
            return true;
        }).catch((error) => {
            alert(error);
        });
        return result;
    }

    const convertToCountryCode = (countryName) => {
        const country = Object.values(countriesData).find((country) => country.CountryNameKR === countryName.value);
        return country.Country2digitCode.toLowerCase();
    }

    return (
        <FormContainer>
            <FormHeader>가입여부 확인</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }} />
            <FirstFormSection>
                <FirstFormRow>
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
                                const error = !validateBizNumber(fields.bizNumber.value);
                                handleChange('bizNumber', fields.bizNumber.value, error);
                            } else {
                                handleChange('bizNumber', fields.bizNumber.value, false);
                                handleChange('foreignerBizNumber', fields.foreignerBizNumber.value);
                            }
                        }}
                        sx={{ width: '60%' }}
                        renderInput={(params) => <TextField {...params} label="국가" />}
                    />
                </FirstFormRow>
                <FirstFormRow>
                    <LabelSection>
                        <InputLabel>회사구분</InputLabel>
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
                                handleChange('companyNumber', fields.companyNumber.value, false);
                            }
                        }}
                        sx={{ width: '60%' }}
                        renderInput={(params) => <TextField {...params} label="회사 구분" />}
                    />
                </FirstFormRow>
                {fields.country.value === '대한민국' && <FirstFormRow>
                    <LabelSection>
                        <InputLabel>사업자등록번호</InputLabel>
                        <Typography color={'red'}>*</Typography>
                    </LabelSection>
                    <TextField
                        required
                        type="text"
                        value={fields.bizNumber.value}
                        onChange={({ target: { value } }) => {
                            const formattedValue = formatBizNumber(value);
                            const error = !validateBizNumber(formattedValue);
                            handleChange('bizNumber', formattedValue, error);
                        }}
                        placeholder="사업자등록번호를 입력하세요"
                        sx={{ width: '60%' }}
                    />
                </FirstFormRow>}
                <FirstFormRow>
                    <LabelSection>
                        <InputLabel>회사명</InputLabel>
                        <Typography color={'red'}>*</Typography>
                    </LabelSection>
                    <TextField
                        required
                        value={fields.companyName.value}
                        onChange={({ target: { value } }) => {
                            const error = value === '';
                            handleChange('companyName', value, error);
                        }}
                        sx={{ width: '60%' }}
                    />
                </FirstFormRow>
            </FirstFormSection>
            <Divider sx={{ borderBottomWidth: 5 }} />
            <ButtonSection>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                >
                    가입여부 확인
                </Button>
                <Button 
                    variant='contained'
                    onClick={() => navigate('/')}
                >취소</Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default FirstStepForm;