import { useEffect } from "react";
import { Button, styled } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { activeStep } from "../../components/signup/State";
import SignUpMain from "../../components/signup/Main";
import SignUpStepper from "../../components/signup/Stepper";
import { useLocation } from "react-router-dom";

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

const SignUpFinished = () => {
    const setActiveStep = useSetRecoilState(activeStep);
    const location = useLocation();
    const {user_id} = location.state || {};
    
    useEffect(() => {
        setActiveStep(3);
    }, []);
    return (
        <StyledSignUpPage>
            <SignUpContent>
                <SignUpTitle>회원가입 완료</SignUpTitle>
                <SignUpMain>
                    <SignUpStepper/>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "16px", color: "#757575", lineHeight: "25px", textAlign: "center"}}>
                      <div>아래 아이디로 회원가입이 완료되었습니다.</div>
                      <div>로그인후 사용자 정보 수정이 가능합니다.</div>
                    </div>
                    <div style={{backgroundColor: '#F9F9F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', fontWeight: 'bold', color: "#111111", height: "68px", boxSizing: "border-box"
                    }}>
                      {user_id}
                    </div>
                    <div style={{display:'flex', gap: '10px'}}>
                      <Button variant="btnInit" fullWidth>메인으로 가기</Button>
                      <Button variant="btnActive" fullWidth>로그인</Button>
                    </div>
                </SignUpMain>
            </SignUpContent>
        </StyledSignUpPage>
    )
}

export default SignUpFinished;
