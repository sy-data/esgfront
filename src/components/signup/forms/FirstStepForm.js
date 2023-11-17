import { useState } from "react";
import { 
    styled,
    Divider,
    InputLabel,
    Autocomplete,
    TextField,
    Button,
} from "@mui/material";
import countriesData from './country.json';

import { FormContainer, FormHeader, ButtonSection } from "../Styles";
 
const FormSection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}))

const FormRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
    width: '60%',
}))

// TODO: ThirdStepForm에도 정의되어 있음. 합칠 필요 있음
const countryNames = Object.values(countriesData).map((country) => country.CountryNameKR)

const FirstStepForm = ({setActiveStep}) => {
    const [fields, setFields] = useState({
        country: {value: '', error: false},
        company: {value: '', error: false},
        email: {value: '', error: false},
        companyName: {value: '', error: false},
    })

    const handleChange = (field, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: {value, error: false},
        }))
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    return (
        <FormContainer>
            <FormHeader>가입여부 확인</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <FormSection>
                <FormRow>
                    <InputLabel>국가</InputLabel>
                    <Autocomplete
                        disableClearable
                        onChange={(_, value) => handleChange('country', value)}
                        options={countryNames}
                        sx={{width: '60%'}}
                        renderInput={(params) => <TextField {...params} label="국가"/>}
                    />
                </FormRow>
                <FormRow>
                    <InputLabel>회사구분</InputLabel>
                    <Autocomplete
                        disableClearable
                        onChange={(_, value) => handleChange('company', value)}
                        options={['개인사업체', '법인사업체']}
                        sx={{width: '60%'}}
                        renderInput={(params) => <TextField {...params} label="회사 구분"/>}
                    />
                </FormRow>
                <FormRow>
                    <InputLabel>이메일</InputLabel>
                    <TextField 
                        required
                        error={fields.email.error}
                        type="email"
                        value={fields.email.value}
                        onBlur={() => {
                            const error = !validateEmail(fields.email.value);
                            setFields((prevFields) => ({
                                ...prevFields,
                                ['email']: { ...fields['email'], error: error},
                            }))
                        }}
                        onChange={({target: {value}}) => handleChange('email', value)}
                        placeholder="example@escope.com"
                        sx={{width: '60%'}}
                    />
                </FormRow>
                <FormRow>
                    <InputLabel>회사명</InputLabel>
                    <TextField 
                        required 
                        error={fields.companyName.error}
                        value={fields.companyName.value}
                        onBlur={() => {
                            const error = fields.companyName.value === '';
                            setFields((prevFields) => ({
                                ...prevFields,
                                ['companyName']: { ...fields['companyName'], error: error},
                            }))
                        }}
                        onChange={({target: {value}}) => handleChange('companyName', value)}
                        sx={{width: '60%'}}
                    />
                </FormRow>
            </FormSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button 
                    variant='contained' 
                    disabled={Object.values(fields).some((field) => field.error)}
                    onClick={handleSubmit}
                >
                    가입여부 확인
                </Button>
                <Button variant='contained'>취소</Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default FirstStepForm;