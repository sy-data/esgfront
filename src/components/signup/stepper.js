import { useState } from 'react';
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ['가입여부 확인', '이용약관 동의', '사업자정보 입력', '공동인증서 인증']

const SignUpStepper = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return (
        <Stepper>
            {steps.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )
            })}
        </Stepper>
    )
};

export default SignUpStepper;