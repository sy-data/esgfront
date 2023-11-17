import { useState } from "react";
import { styled } from "@mui/material";

import SignUpHeader from "../../components/signup/Header";
import SignUpMain from "../../components/signup/Main";
import SignUpStepper from "../../components/signup/Stepper";
import FirstStepForm from "../../components/signup/forms/FirstStepForm";
import SecondStepForm from "../../components/signup/forms/SecondStepForm";
import ThridStepForm from "../../components/signup/forms/ThirdStepForm";

const StyledSignUpPage = styled('div')(() => ({
    height: '100%'
}))

const formComponentGroups = [FirstStepForm, SecondStepForm, ThridStepForm];

const SignUp = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["가입여부 확인", "이용약관 동의", "사업자정보 입력"]
    
    const ActiveFormComponent = formComponentGroups[activeStep];
    
    return (
        <StyledSignUpPage>
            <SignUpHeader/>
            <SignUpMain>
                <SignUpStepper steps={steps} activeStep={activeStep}/>
                <ActiveFormComponent setActiveStep={setActiveStep}/>
            </SignUpMain>
        </StyledSignUpPage>
    )
}

export default SignUp;
