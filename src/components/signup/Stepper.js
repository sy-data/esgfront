import { useRecoilValue } from "recoil";
import { Stepper, Step, StepLabel } from "@mui/material";

import { activeStep } from "./State";


const SignUpStepper = () => {
    const activeStepValue = useRecoilValue(activeStep);
    
    const stepsName = [null, null, null]

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