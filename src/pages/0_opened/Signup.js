import { styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import SignUpHeader from "../../components/signup/Header";
import SignUpMain from "../../components/signup/Main";
import SignUpStepper from "../../components/signup/Stepper";
import FirstStepForm from "../../components/signup/forms/FirstStepForm";
import SecondStepForm from "../../components/signup/forms/SecondStepForm";
import ThridStepForm from "../../components/signup/forms/ThirdStepForm";
// import FourthStepForm from "../../components/signup/forms/FourthForm";

const StyledSignUpPage = styled('div')(() => ({
    height: '100%'
}))

const SignUp = () => {
    return (
        <StyledSignUpPage>
            <SignUpHeader/>
            <SignUpMain>
                <SignUpStepper/>
                <Routes>
                    <Route path="/*" element={<FirstStepForm/>}/>
                    <Route path="/step2" element={<SecondStepForm/>}/>
                    <Route path="/step3" element={<ThridStepForm/>}/>
                    {/* <Route path="/step4" element={<FourthStepForm/>}/> */}
                </Routes>
            </SignUpMain>
        </StyledSignUpPage>
    )
}

export default SignUp;
