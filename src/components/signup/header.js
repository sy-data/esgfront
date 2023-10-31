import { styled } from "@mui/material";

const SignUpHeaderContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

const SignUpHeader = (props) => {
    return (
        <SignUpHeaderContainer>
            <h1>
                회원가입
            </h1>
        </SignUpHeaderContainer>
    )
}

export default SignUpHeader;