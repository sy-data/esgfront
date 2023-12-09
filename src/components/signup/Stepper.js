import { useRecoilValue } from "recoil";
import { Stepper, Step, StepLabel } from "@mui/material";

import { activeStep } from "./State";


const SignUpStepper = () => {
    const activeStepValue = useRecoilValue(activeStep);
    
    const stepsName = ["가입여부 확인", "이용약관 동의", "사업자정보 입력"]

    return (
        <Stepper activeStep={activeStepValue}>
            {stepsName.map((label, index) => {
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