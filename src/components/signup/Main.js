import { styled } from "@mui/material";

const StyledSignUpMain = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    padding: '20px 40px',
    backgroundColor: '#D3D3D3',
    height: '100%',
}));

const SignUpMain = ({children}) => {
    return (
        <StyledSignUpMain>
            {children}
        </StyledSignUpMain>
    )
}

export default SignUpMain;