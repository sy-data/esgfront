import { useState } from "react";
import { 
    styled,
    Divider,
    Button,
    Typography,
    Checkbox,
 } from "@mui/material";

import { FormContainer, FormHeader, ButtonSection } from "../Styles";

 const TermsOfUseSection = styled('div')(() => ({
    margin: '10px 0'
}))

const TermsOfUseRow = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}))

const TermsOfUseCheckBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
}))

const TermsOfUseContent = styled('div')(() => ({
    width: '100%',
    height: '100px',
    background: 'white',
    overflowY: 'scroll'
}))

const AllCheckSection = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const SecondStepForm = ({setActiveStep}) => {
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [thirdCheck, setThirdCheck] = useState(false);

    const handleSubmit = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return (
        <FormContainer>
            <FormHeader>이용약관 동의</FormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <TermsOfUseSection>
                <TermsOfUseRow>
                    <Typography variant="subtitle2">E-Scope+ 이용약관</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox checked={firstCheck} onChange={(event) => setFirstCheck(event.target.checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </TermsOfUseRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </TermsOfUseSection>
            <TermsOfUseSection>
                <TermsOfUseRow>
                    <Typography variant="subtitle2">개인정보 수집 및 이용</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox checked={secondCheck} onChange={(event) => setSecondCheck(event.target.checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </TermsOfUseRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </TermsOfUseSection>
            <TermsOfUseSection>
                <TermsOfUseRow>
                    <Typography variant="subtitle2">제3자 정보제공</Typography>
                    <TermsOfUseCheckBox>
                        <Checkbox checked={thirdCheck} onChange={(event) => setThirdCheck(event.target.checked)}/>
                        <Typography variant="body2">약관동의</Typography>
                    </TermsOfUseCheckBox>
                </TermsOfUseRow>
                    <TermsOfUseContent>
                        약관내용이 들어갑니다.
                    </TermsOfUseContent>
            </TermsOfUseSection>
            <AllCheckSection>
                <Checkbox
                    checked={firstCheck && secondCheck && thirdCheck}
                    onChange={(event) => {
                        const checked = event.target.checked
                        setFirstCheck(checked);
                        setSecondCheck(checked);
                        setThirdCheck(checked);
                    }}
                />
                <Typography variant="body2">E-Scope+의 전체 약관에 동의합니다.</Typography>
            </AllCheckSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <ButtonSection>
                <Button 
                    disabled={!(firstCheck && secondCheck && thirdCheck)}
                    variant="contained" 
                    onClick={handleSubmit}
                >
                    약관동의
                </Button>
            </ButtonSection>
        </FormContainer>
    )
}

export default SecondStepForm;