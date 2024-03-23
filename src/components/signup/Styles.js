import { styled } from "@mui/material"; 

// Common styles
export const FormContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 50px',
    gap: '20px',
}));

export const FormHeader = styled('h3')(() => ({
    margin: '10px'
}));

export const ButtonSection = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
}));

export const LabelSection = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    width: '125px'
}));

// FirstStepForm styles
export const FirstFormSection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
}));

export const FirstFormRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
    width: '60%',
}));

// SecondStepForm styles
export const SecondFormSection = styled('div')(() => ({
    margin: '10px 0',
}));

export const SecondFormRow = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

export const TermsOfUseCheckBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
}));

export const TermsOfUseContent = styled('div')(() => ({
    width: '100%',
    height: '100px',
    background: 'white',
    overflowY: 'scroll',
    padding: '10px',
}));

export const AllCheckSection = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

// ThirdStepForm styles
export const ThirdFormSection = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 5fr 1fr 5fr',
    alignItems: 'center',
    gap: '20px',
}));

export const InputAndButtonRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
}));

export const EmailSection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
}));

// FourthStepForm styles
export const FourthFormSection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    margin: '0px 20px',
}));

export const FourthFormRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    justifyContent: 'center',
    width: '100%',
}));