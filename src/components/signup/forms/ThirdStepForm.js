import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {  TextField, Button, Typography, IconButton, Select, MenuItem, InputAdornment, OutlinedInput } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {  activeStep, signupForm1, signupForm3 } from "../State";
import countriesData from './country.json';
import { esgFetch } from "../../FetchWrapper";
import { setCookie } from "../../../States/storage/Cookie";
import "./forms.css";
import FormTitle from "./FormTitle";


const countryNames = Object.values(countriesData).map((country) => country.CountryNameKR)

const ThridStepForm = () => {
    const navigate = useNavigate();
    const form1Value = useRecoilValue(signupForm1);
    const [fields, setFields] = useRecoilState(signupForm3);
    const setActiveStep = useSetRecoilState(activeStep);

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    useEffect(() => {
        setActiveStep(2);
        window.scrollTo(0, 0);
        
        handleChange("name", form1Value.name);
        setFields({
            ...fields,
            "name": form1Value.name,
            "type": form1Value.type,
            "country": form1Value.country,
            "bizNumber1": form1Value.bizNumber.split('-')[0],
            "bizNumber2": form1Value.bizNumber.split('-')[1],
            "bizNumber3": form1Value.bizNumber.split('-')[2],
        })
    }, []);

    const validEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    }

    // const sendEmailVerificationCode = () => {
    //     if (validEmail(fields.representiveEmail.value)) {
    //         // TODO: API 연결 필요
    //         alert('인증번호가 발송되었습니다.(asdf)');
    //         const tempVerificationCode = 'asdf';
    //         setEmailVerificationCode(tempVerificationCode);
    //     } else {
    //         alert('이메일을 정확히 입력해 주세요');
    //     }
    // }

    const handleChange = (field, value) => {
        if(["phone1", "fax1", "managerPhone1"].includes(field)){
            value = value.replace(/[^0-9]/g, "")
            if(value.length > 3) return;
        }
        if(["phone2", "phone3", "fax2", "fax3", "managerPhone2", "managerPhone3"].includes(field)){
            value = value.replace(/[^0-9]/g, "")
            if(value.length > 4) return;
        }
        if(field === "companyNumber"){
            const input = value.replace(/[^0-9]/g, "")
            if(input.length >= 14) return;
            
            let result = input.slice(0,6);
            if(input.length > 6){
                result = result + "-" + input.slice(6,13);
            }
            setFields({
                ...fields,
                "companyNumber": result
            });
            return;
        }
        setFields({
            ...fields,
            [field]: value
        })
    }

    const checkErrorFields = () => {
        const errorfields = Object.values(fields).filter((field) => field.error);
        for (let field of errorfields) {
            alert(field.errorText);
            return true;
        }
        if (!isEmailVerified) {
            alert('이메일 인증을 진행해 주세요');
            return true;
        }
        if (!isIdAvailable) {
            alert('아이디 중복확인을 진행해 주세요');
            return true;
        }
        return false;
    }

    const checkIDuplicate = async () => {
        const result = await esgFetch(`/registration/account/${fields.manager_id}`).then(res => res.json());
        if("data" in result) {
            if(result.data.count === 0) {
                handleChange("id_confirmed", true);
            }
            else {
                alert("사용할 수 없는 아이디입니다");
            }
        }
    }
    const [showPassword, setShowPassword] = useState(false);
 
    // err
    // {
    //     "url": "/api/v1/registration/company",
    //     "statusCode": 500,
    //     "statusMessage": "",
    //     "message": "internal server error",
    //     "stack": ""
    // }
    const [processing, setProcessing] = useState(false);
    const submitRegister = async () => {
        setProcessing(true);
        const userResult = await esgFetch(
            `/account/signup-id`,
            "POST",
            {provideruserid : fields.manager_id, password: fields.password}
        ).then(res=>res.json());
        /// userResult =>>
        // {
        //     "id": "4mchmtq7tp5pv3wws4jbe3vacdyqerqz",
        //     "user_id": "ID6",
        //     "expires_at": "2024-11-22T20:52:24.877Z",
        //     "userplatform": "E-SCOPE"
        // }
        if("user_id" in userResult) {
            localStorage.setItem("__session", userResult.id);
            setCookie("__session", userResult.id);
            
            const companyResult = await esgFetch(
                "/registration/company",
                "POST",
                {
                    title: fields.name,
                    company_type: fields.type,
                    bn: [fields.bizNumber1, fields.bizNumber2, fields.bizNumber3].join(''),
                    cn: fields.companyNumber.split('-').join(''),
                    owner_nm: fields.ceo,
                    manager_nm: fields.manager,
                    manager_id: userResult.user_id,
                    zip_code: fields.address1,
                    addr: fields.address2,
                    addr_detail: fields.address3,
                    rep_tel_destination_code: fields.phone1,
                    rep_tel_number: [fields.phone2, fields.phone3].join(''),
                    fax_destination_code: fields.fax1,
                    fax_number: [fields.fax2, fields.fax3].join(''),
                    emailverified: true,//fields.emailConfirm,
                    business_type: fields.business_type,
                    business_item: fields.business_item,
                    main_item: fields.main_item,
                    company_size: fields.company_size
                }
            ).then(res=>res.json());
            //companyResult===>>>
            // {
            //     "data": {
            //         "seq": "5",
            //         "id": "COM5",
            //         "title": "test",
            //         "company_type": "대기업",
            //         "country_nm": null,
            //         "bn": "1231231231",
            //         "cn": "1111112222222",
            //         "owner_nm": "대표",
            //         "manager_nm": "담당",
            //         "manager_id": "ID6",
            //         "zip_code": "12345",
            //         "addr": "서울시 한국길 82",
            //         "addr_detail": "1층 101호",
            //         "rep_tel_country_code": "82",
            //         "rep_tel_destination_code": "010",
            //         "rep_tel_number": "12123434",
            //         "rep_tel_full": "+8201012123434",
            //         "fax_country_code": "82",
            //         "fax_destination_code": "02",
            //         "fax_number": "56567878",
            //         "fax_full": "+820256567878",
            //         "rep_email": null,
            //         "emailverified": true,
            //         "business_type": "업태",
            //         "business_item": "업종",
            //         "main_item": "주거래품목",
            //         "company_size": "회사규모",
            //         "created_at": "2024-11-28T10:01:20.846Z",
            //         "created_by": "apiuser",
            //         "updated_at": null,
            //         "updated_by": null,
            //         "deleted_at": null,
            //         "deleted_by": null,
            //         "remark": null
            //     }
            // }
            if("data" in companyResult && "rep_tel_country_code" in companyResult.data) {
                const managerPhone = await esgFetch(
                    "/account/user-info",
                    "PATCH",
                    {
                        displayname: fields.manager,
                        hp_country_code: companyResult.data.rep_tel_country_code,
                        hp_destination_code: fields.managerPhone1,
                        hp_number: [fields.managerPhone2, fields.managerPhone2].join('')
                    }
                ).then(res=>res.json());
                //managerPhone ==>>
                // {
                //     "data": {
                //         "seq": "6",
                //         "user_id": "ID6",
                //         "uid": "e56bfca0487b46a",
                //         "providerid": "id",
                //         "email": null,
                //         "emailverified": null,
                //         "displayname": "담당",
                //         "photourl": null,
                //         "disabled": null,
                //         "isadmin": null,
                //         "platform": "E-SCOPE",
                //         "privacypolicies": null,
                //         "gender": null,
                //         "birth_dt": null,
                //         "country_code": null,제
                //         "hp_country_code": "82",
                //         "hp_destination_code": "010",
                //         "hp_number": "12123434",
                //         "hp_full": "+8201012123434",
                //         "hpverified": false,
                //         "alarmallow": true,
                //         "acceptmarketing": true,
                //         "created_at": "2024-11-23T01:52:24.783Z",
                //         "created_by": "adminuser",
                //         "updated_at": "2024-11-28T10:18:37.075Z",
                //         "updated_by": "ID6",
                //         "deleted_at": null,
                //         "deleted_by": null,
                //         "remark": null,
                //         "metadata": null
                //     }
                // }
                if("data" in managerPhone && "user_id" in managerPhone.data){
                    navigate("/signup/finished", {state: {user_id: fields.manager_id}});
                }
                else{
                    setProcessing(false);
                    alert("담당자정보 업데이트에 실패했습니다");
                    return;
                }
            }
            else{
                setProcessing(false);
                alert("회사 등록에 실패했습니다");
                return;
            }
        }
        setProcessing(false);
        alert("유저 등록에 실패했습니다");
        return;
    }

    return (
        <div className="form-content">
            <div className="form-label">사업자정보 입력</div>
            <FormTitle title="회사명" required />
            <TextField error={false} placeholder="회사명을 입력하세요" value={fields.name} size="small" onChange={event=>handleChange('name', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
            <FormTitle title="회사코드" />
            <TextField disabled placeholder="가입 완료 후 자동생성" size="small" fullWidth sx={{marginBottom: '10px'}}/>
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
                <MenuItem value="개인사업체">개인사업체</MenuItem>
                <MenuItem value="법인사업체">법인사업체</MenuItem>
            </Select>
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
            <FormTitle title="사업자등록번호" required />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TextField value={fields.bizNumber1} size="small" sx={{flex: 1}} disabled />
                <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                <TextField value={fields.bizNumber2} size="small" sx={{flex: 1}} disabled />
                <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                <TextField value={fields.bizNumber3} size="small" sx={{flex: 2}} disabled />
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginTop: '10px', gap: '16px'}}>
                <div>
                    <FormTitle title="법인등록번호" />
                    <TextField error={false} placeholder="법인등록번호를 입력하세요" value={fields.companyNumber} size="small" onChange={event=>handleChange('companyNumber', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
                </div>
                <div>
                    <FormTitle title="대표자명" required />
                    <TextField error={false} placeholder="대표자명을 입력하세요" value={fields.ceo} size="small" onChange={event=>handleChange('ceo', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
                </div>
                <div>
                    <FormTitle title="담당자명" />
                    <TextField error={false} placeholder="담당자명을 입력하세요" value={fields.manager} size="small" onChange={event=>handleChange('manager', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
                </div>
            </div>
            <FormTitle title="주소" required />
            <div style={{display: 'flex', alignItems: 'center', margin: '4px 0', gap: '4px'}}>
                <TextField error={false} placeholder="우편번호" value={fields.address1} size="small" onChange={event=>handleChange('address1', event.target.value)} sx={{flex: 1}}/>
                <TextField error={false} placeholder="주소" value={fields.address2} size="small" onChange={event=>handleChange('address2', event.target.value)} sx={{flex: 4}}/>
            </div>
            <TextField error={false} placeholder="상세 주소를 입력해주세요" value={fields.address3} size="small" onChange={event=>handleChange('address3', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '16px'}}>
                <div>
                    <FormTitle title="대표자 전화번호" required />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <TextField placeholder="010" value={fields.phone1} size="small" sx={{flex: 1}} onChange={event=>handleChange('phone1', event.target.value)} />
                        <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                        <TextField placeholder="0000" value={fields.phone2} size="small" sx={{flex: 1}} onChange={event=>handleChange('phone2', event.target.value)} />
                        <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                        <TextField placeholder="0000" value={fields.phone3} size="small" sx={{flex: 1}} onChange={event=>handleChange('phone3', event.target.value)} />
                    </div>
                </div>
                <div>
                    <FormTitle title="Fax 번호" />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <TextField placeholder="010" value={fields.fax1} size="small" sx={{flex: 1}} onChange={event=>handleChange('fax1', event.target.value)} />
                        <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                        <TextField placeholder="0000" value={fields.fax2} size="small" sx={{flex: 1}} onChange={event=>handleChange('fax2', event.target.value)} />
                        <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                        <TextField placeholder="0000" value={fields.fax3} size="small" sx={{flex: 1}} onChange={event=>handleChange('fax3', event.target.value)} />
                    </div>
                </div>
            </div>
            <FormTitle title="대표자 E-mail" />
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px'}}>
                <TextField placeholder="대표 E-mail을 입력하세요" value={fields.email} size="small" sx={{flex: 4}} onChange={event=>handleChange('email', event.target.value)} />
                <Button variant="btnActive" size="small" sx={{flex: 1, height: '40px'}}>인증하기</Button>
            </div>
            <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", marginBottom: "10px", color: "#757575"}}>
                <div>인증번호가 도착하지 않으셨나요?</div>
                <div style={{fontWeight: 'bold', textDecoration: 'underline'}}>다시 보내기</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px'}}>
                <TextField placeholder="E-mail에서 받은 인증 번호를 입력하세요" value={fields.emailConfirm} size="small" sx={{flex: 4}} onChange={event=>handleChange('emailConfirm', event.target.value)} />
                <Button variant="btnInit" size="small" sx={{flex: 1, height: '40px'}}>확인</Button>
            </div>
            <FormTitle title="업종" />
            <TextField error={false} placeholder="업종을 입력하세요" value={fields.business_item} size="small" onChange={event=>handleChange('business_item', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
            <FormTitle title="업태" />
            <TextField error={false} placeholder="업태를 입력하세요" value={fields.business_type} size="small" onChange={event=>handleChange('business_type', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
            <FormTitle title="주거래품목" required />
            <TextField error={false} placeholder="주거래품목을 입력하세요" value={fields.main_item} size="small" onChange={event=>handleChange('main_item', event.target.value)} fullWidth sx={{marginBottom: '10px'}}/>
            <FormTitle title="회사규모" />
            <Select
                value={fields.company_size}
                size="small"
                IconComponent={ExpandMoreIcon}
                sx={{marginBottom: '10px'}}
                onChange={event => handleChange('company_size', event.target.value)}
                displayEmpty
                renderValue={selected => {
                    if(!selected || selected.length === 0){
                        return <Typography style={{fontSize: "15px", color: "#AAAAAA", fontWeight: 600}}>회사규모를 선택하세요</Typography>
                    }
                    return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
                }}
                fullWidth
            >
                <MenuItem value="회사규모">회사규모</MenuItem>
            </Select>
            <FormTitle title="아이디" required />
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px'}}>
                <TextField placeholder="아이디를 입력하세요" value={fields.manager_id} size="small" sx={{flex: 4}} onChange={event=>handleChange('manager_id', event.target.value)} />
                <Button variant="btnInit" size="small" sx={{flex: 1, height: '40px'}} onClick={checkIDuplicate}>중복 확인</Button>
            </div>
            <FormTitle title="비밀번호" required />
            <OutlinedInput
                error={false}
                value={fields.password}
                type={showPassword ? 'text' : 'password'}
                sx={{marginBottom: '5px'}}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(show => !show)}
                            onMouseDown={e => e.preventDefault()}
                            onMouseUp={e => e.preventDefault()}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                onChange={event=>handleChange('password', event.target.value)}
                size="small"
                placeholder="비밀번호는 8자 이상의 영문, 숫자, 특수문자 조합으로 생성해주세요"
                fullWidth
            />
            <OutlinedInput
                error={false}
                value={fields.passwordConfirm}
                type={showPassword ? 'text' : 'password'}
                sx={{marginBottom: '5px'}}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(show => !show)}
                            onMouseDown={e => e.preventDefault()}
                            onMouseUp={e => e.preventDefault()}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                onChange={event=>handleChange('passwordConfirm', event.target.value)}
                size="small"
                placeholder="입력하신 비밀번호를 다시 입력해주세요"
                fullWidth
            />
            <FormTitle title="담당자 휴대폰" required />
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '40px'}}>
                <TextField placeholder="010" value={fields.managerPhone1} size="small" sx={{flex: 1}} onChange={event=>handleChange('managerPhone1', event.target.value)} />
                <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                <TextField placeholder="0000" value={fields.managerPhone2} size="small" sx={{flex: 1}} onChange={event=>handleChange('managerPhone2', event.target.value)} />
                <div style={{margin: "0 4px", height: 0, width: "10px", borderTop: "1px solid black"}} />
                <TextField placeholder="0000" value={fields.managerPhone3} size="small" sx={{flex: 1}} onChange={event=>handleChange('managerPhone3', event.target.value)} />
            </div>
            <div style={{display:"flex", gap: "10px"}}>
                {processing ?
                    <Button disabled variant="btnDisabled" sx={{flex:1}} onClick={submitRegister} >처리중 입니다</Button> :
                    <Button variant="btnActive" sx={{flex:1}} onClick={submitRegister} >정보 입력</Button>
                }
                <Button variant="btnInit" sx={{flex:1}} onClick={()=>navigate("/login")}>취소</Button>
            </div>
        </div>
    )
}

export default ThridStepForm;
