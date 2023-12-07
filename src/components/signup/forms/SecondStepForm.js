import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { 
    Divider,
    Button,
    Typography,
    Checkbox,
} from "@mui/material";
import { 
    FormContainer, 
    FormHeader, 
    ButtonSection,
    SecondFormSection,
    SecondFormRow,
    TermsOfUseCheckBox,
    TermsOfUseContent,
    AllCheckSection,
} from "../Styles";
import { signupSecondFormState, isFirstStepCompleted, activeStep } from "../State";


const SecondStepForm = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useRecoilState(signupSecondFormState);
    const isFirstStepCompletedValue = useRecoilValue(isFirstStepCompleted);
    const setActiveStep = useSetRecoilState(activeStep);

    useEffect(() => {
        if (!isFirstStepCompletedValue) {
            navigate('/signup');
        }
        setActiveStep(1);
        window.scrollTo(0, 0);
    }, []);

    const handleCheck = (field, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        if (!Object.values(fields).every((field) => field)) {
            alert('모든 약관에 동의하세요');
            return;
        }
        navigate('/signup/step3');
    }

    return (
        <FormContainer>
            <FormHeader>이용약관 동의</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <SecondFormSection>
                <SecondFormRow>
                    <Typography variant="subtitle2">E-Scope+ 이용약관</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox 
                            checked={fields.firstCheck} 
                            onChange={({target: {checked}}) => handleCheck('firstCheck', checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </SecondFormRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </SecondFormSection>
            <SecondFormSection>
                <SecondFormRow>
                    <Typography variant="subtitle2">개인정보 수집 및 이용</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox 
                            checked={fields.secondCheck} 
                            onChange={({target: {checked}}) => handleCheck('secondCheck', checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </SecondFormRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </SecondFormSection>
            <SecondFormSection>
                <SecondFormRow>
                    <Typography variant="subtitle2">제3자 정보제공</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox 
                            checked={fields.thirdCheck} 
                            onChange={({target: {checked}}) => handleCheck('thirdCheck', checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </SecondFormRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </SecondFormSection>
            <AllCheckSection>
                <Checkbox
                    checked={Object.values(fields).every((field) => field)}
                    onChange={({target: {checked}}) => {
                        const newFields = Object.keys(fields).reduce((newObj, key) => {
                            return { ...newObj, [key]: checked };
                          }, {});
                        setFields(newFields);
                    }}
                />
                <Typography variant="body2">E-Scope+의 전체 약관에 동의합니다.</Typography>
            </AllCheckSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                >
                    약관동의
                </Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default SecondStepForm;