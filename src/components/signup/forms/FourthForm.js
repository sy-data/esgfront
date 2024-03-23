import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
    Divider,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import {
    FormContainer,
    FormHeader,
    ButtonSection,
    FourthFormSection,
    FourthFormRow,
} from '../Styles';
import { 
    signupFormState, 
    activeStep,
    isFirstStepCompleted,
    isSecondStepCompleted,
    isThirdStepCompleted,
} from '../State';

const FourthStepForm = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useRecoilState(signupFormState);
    const isFirstStepCompletedValue = useRecoilValue(isFirstStepCompleted);
    const isSecondStepCompletedValue = useRecoilValue(isSecondStepCompleted);
    const isThirdStepCompletedValue = useRecoilValue(isThirdStepCompleted);
    const setActiveStep = useSetRecoilState(activeStep);

    useEffect(() => {
        if (!isFirstStepCompletedValue) {
            navigate('/signup');
        }
        if (!isSecondStepCompletedValue) {
            navigate('/signup/step2');
        }
        if (!isThirdStepCompletedValue) {
            navigate('/signup/step3');
        }
        setActiveStep(3);
        window.scrollTo(0, 0);
    }, []);

    const validEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return (
        <FormContainer>
            <FormHeader>이메일 인증</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <FourthFormSection>
                <Typography variant="h6">E-Scope+ 회원가입 완료를 위해서는 이메일 인증이 필요합니다.</Typography>
                <FourthFormRow>
                    <Typography variant="h6">E-mail</Typography>
                    <TextField
                        required
                        type='email'
                        value={fields.representiveEmail.value}
                        onChange={({target: {value}}) => {
                            const error = !validEmail(value);
                            setFields((prevFields) => ({
                                ...prevFields,
                                representiveEmail: {...prevFields.representiveEmail, value, error},
                            }))
                        }}
                        sx={{ width: '40%' }}
                    />
                </FourthFormRow>
            </FourthFormSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button variant="contained">인증하기</Button>
                <Button variant="contained">취소</Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default FourthStepForm;
