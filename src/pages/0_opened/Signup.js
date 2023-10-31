import { styled } from "@mui/material";
import SignUpHeader from "../../components/signup/header";
import SignUpMain from "../../components/signup/main";
import SignUpStepper from "../../components/signup/stepper";
import FirstStepForm from "../../components/signup/first-step-form";

const StyledSignUpPage = styled('div')(() => ({
    height: '100%'
}))

const SignUp = (props) => {
    return (
        <StyledSignUpPage>
            <SignUpHeader/>
            <SignUpMain>
                <SignUpStepper/>
                <FirstStepForm/>
            </SignUpMain>
        </StyledSignUpPage>
    )
}

export default SignUp;