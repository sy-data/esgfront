import { styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import SignUpMain from "../../components/signup/Main";
import SignUpStepper from "../../components/signup/Stepper";
import FirstStepForm from "../../components/signup/forms/FirstStepForm";
import SecondStepForm from "../../components/signup/forms/SecondStepForm";
import ThridStepForm from "../../components/signup/forms/ThirdStepForm";

const StyledSignUpPage = styled('div')(() => ({
    padding: '50px', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto', alignItems: 'center'
}))

const SignUpContent = styled('div')(() => ({
    width: '530px', display: 'flex', flexDirection: 'column', alignItems: 'center'
}))

const SignUpTitle = styled('div')(() => ({
    fontFamily: "Pretendard Variable", fontSize: "24px", fontWeight: 700, lineHeight: "36px",
    letterSpacing: "-0.02em",
}))

const SignUp = () => {
    return (
        <StyledSignUpPage>
            <SignUpContent>
                <SignUpTitle>회원가입</SignUpTitle>
                <SignUpMain>
                    <SignUpStepper/>
                    <Routes>
                        <Route path="/*" element={<FirstStepForm/>}/>
                        <Route path="/step2" element={<SecondStepForm/>}/>
                        <Route path="/step3" element={<ThridStepForm/>}/>
                    </Routes>
                </SignUpMain>
            </SignUpContent>
        </StyledSignUpPage>
    )
}

export default SignUp;
