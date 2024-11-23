import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Typography, TextField, Button, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { activeStep, signupForm1 } from "../State";
import { esgFetch } from "../../FetchWrapper";
import countriesData from './country.json';
import "./forms.css";
import FormTitle from "./FormTitle";


const FirstStepForm = () => {
    const countryNames = useMemo(()=>Object.values(countriesData).map((country) => country.CountryNameKR),[]);
    const navigate = useNavigate();
    const [fields, setFields] = useRecoilState(signupForm1);
    const setActiveStep = useSetRecoilState(activeStep);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setActiveStep(0);
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (field, value) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const validateBizNumber = (number) => {
        const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
        return regex.test(number);
    }

    const checkRegister = async () => {
        if(fields.bizNumber.length > 0){
            setProcessing(true);
            const result = await esgFetch(`/registration/company/${fields.bizNumber.split('-').join('')}`).then(res => res.json());
            setProcessing(false);
            if("data" in result) {
                if(result.data.count === 0) {
                    if(fields.bizNumber.length === 0
                        || fields.type.length === 0
                        || fields.country.length === 0
                        || fields.name.length === 0) {
                        alert("모든 항목을 기입해주세요");
                        return;
                    }
                    if(validateBizNumber(fields.bizNumber))
                        navigate('/signup/step2');
                    else
                        alert("잘못된 사업자등록번호입니다.");
                }
                else {
                    alert("이미 가입된 사업자입니다.")
                }
            }
        }
        else{
            alert("사업자등록번호를 입력해주세요.")
        }
    }
    
    const handleBizNumber = event => {
        const input = event.target.value.replace(/[^0-9]/g, "")
        if(input.length >= 11) return;
        
        let result = input.slice(0,3);
        if(input.length > 3){
            result = result + "-" + input.slice(3,5);
        }
        if(input.length > 5){
            result = result + "-" + input.slice(5)
        }
        setFields({
            ...fields,
            "bizNumber": result
        })
    }

    return (
        <div className="form-content">
            <div className="form-label">가입여부 확인</div>
            <FormTitle title="국가" required />
            <Select
                value={fields.country}
                size="small"
                IconComponent={ExpandMoreIcon}
                sx={{marginBottom: '10px'}}
                onChange={event => handleChange('country', event.target.value)}
                MenuProps={{
                    PaperProps: {sx: {maxHeight: "240px", borderRadius: "8px", border: "1px solid #DADFDF", '& ul': {padding: 0}}}
                }}
                displayEmpty
                renderValue={selected => {
                    if(!selected || selected.length === 0){
                        return <Typography style={{fontSize: "15px", color: "#AAAAAA", fontWeight: 600}}>국가를 선택하세요</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                }}
                fullWidth
            >
                {countryNames.map((option, idx) => <MenuItem key={`c-val${idx}`} value={option}>{option}</MenuItem>)}
            </Select>
            <FormTitle title="회사구분" required />
            <Select
                value={fields.type}
                size="small"
                IconComponent={ExpandMoreIcon}
                sx={{marginBottom: '10px'}}
                onChange={event => handleChange('type', event.target.value)}
                displayEmpty
                renderValue={selected => {
                    if(!selected || selected.length === 0){
                        return <Typography style={{fontSize: "15px", color: "#AAAAAA", fontWeight: 600}}>회사구분을 선택하세요</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                }}
                fullWidth
            >
                <MenuItem value="법인사업체">법인사업체</MenuItem>
            </Select>
            <FormTitle title="사업자등록번호" required />
            <TextField error={false} placeholder="사업자등록번호를 입력하세요" value={fields.bizNumber} size="small" onChange={handleBizNumber} fullWidth sx={{marginBottom: '10px'}}/>
                
            <FormTitle title="회사명" required />
            <TextField error={false} placeholder="회사명을 입력하세요" value={fields.name} size="small" onChange={event=>handleChange('name', event.target.value)} fullWidth/>
                
            <div style={{display:"flex", gap: "10px", marginTop: "30px"}}>
                <Button variant={processing?"btnDisabled":"btnActive"} disabled={processing} sx={{flex:1}} onClick={checkRegister}>
                    {processing?"확인 중":"가입여부 확인"}
                </Button>
                <Button variant="btnInit" sx={{flex:1}} >취소</Button>
            </div>
        </div>
    )
}

export default FirstStepForm;