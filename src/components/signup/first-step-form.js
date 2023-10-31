import { useState } from "react";
import { 
    styled,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
 } from "@mui/material";

const StyledFormContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    
    margin: '0 50px'
}))

const StyledFormHeader = styled('h3')(() => ({
    margin: '10px'
}));

const StyledFormSection = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    margin: '50px 0',
}))

const StyledFormRow = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
    width: '60%',
}))

const FirstStepForm = () => {
    const [nation, setNation] = useState('');
    

    const handleChange = (event) => {
        setNation(event.target.value);
    }

    return (
        <StyledFormContainer>
            <StyledFormHeader>가입여부 확인</StyledFormHeader>
            <Divider sx={{ borderBottomWidth: 5 }}/>
            <StyledFormSection>
                <StyledFormRow>
                    <InputLabel>국가</InputLabel>
                    <Select
                        value={nation}
                        label='국가'
                        onChange={handleChange}
                        sx={{width: '60%', height: '40px'}}
                    >
                        <MenuItem value={'대한민국'}>대한민국</MenuItem>
                        <MenuItem value={'중국'}>중국</MenuItem>
                        <MenuItem value={'일본'}>일본</MenuItem>
                    </Select>
                </StyledFormRow>
            </StyledFormSection>
            <Divider sx={{ borderBottomWidth: 5 }}/>
        </StyledFormContainer>
    )
}

export default FirstStepForm;
