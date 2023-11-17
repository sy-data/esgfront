import { styled } from "@mui/material"; 

export const FormContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 50px'
}));

export const FormHeader = styled('h3')(() => ({
    margin: '10px'
}));

export const ButtonSection = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
}))
