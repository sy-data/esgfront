import { useState } from 'react';
import { Stepper, Step, StepLabel } from "@mui/material";


const SignUpStepper = ({steps, activeStep}) => {

    return (
        <Stepper activeStep={activeStep}>
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