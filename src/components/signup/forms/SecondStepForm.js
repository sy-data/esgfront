import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {  Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { activeStep, signupForm1 } from "../State";
import "./forms.css";
import { esgFetch } from "../../FetchWrapper";


const SecondStepForm = () => {
    const navigate = useNavigate();
    const setActiveStep = useSetRecoilState(activeStep);
    const firstFormValue = useRecoilValue(signupForm1);
    const [terms, setTerms] = useState([]);
    const [checked, setChecked] = useState({});
    const [checkall, setCheckall] = useState(false);

    useEffect(() => {
        // if(firstFormValue.bizNumber.length === 0
        //     || firstFormValue.type.length === 0
        //     || firstFormValue.country.length === 0
        //     || firstFormValue.name.length === 0) {
        //     navigate('/signup');
        // }
        setActiveStep(1);
        window.scrollTo(0, 0);
        loadTerms();
    }, []);
    
    const loadTerms = async () => {
        const result = await esgFetch("/registration/terms").then(res => res.json());
        if("data" in result && result.data.count > 0) {
            setTerms(result.data.items);
            setChecked(
                result.data.items.reduce((acc, item) => {
                    acc[item.id] = false;
                    return acc;
                }, {})
            );
        }
        else {
            alert("약관 로딩 실패");
        }
    }

    const handleSubmit = () => {
        if (!Object.values(checked).every(field => field)) {
            alert('모든 약관에 동의하세요');
            return;
        }
        navigate('/signup/step3');
    }
    
    const TermItem = props => {
        const onCheck = tid => {
            setChecked(chk => ({
                ...chk,
                [tid]: !chk[tid]
            }));
        }
        return (
            <div>
                <FormControlLabel
                    control={<Checkbox checked={checked[props.tid]} onChange={()=>onCheck(props.tid)} />}
                    label={<Typography sx={{fontSize: "14px", fontWeight: 600}}>{props.title}</Typography>}
                />
                <div className="term-content">
                    {props.terms_txt}
                </div>
            </div>
        )
    }
    
    const handleCheckAll = e => {
        setCheckall(e.target.checked);
        setChecked(
            terms.reduce((acc, item) => {
                acc[item.id] = e.target.checked;
                return acc;
            }, {})
        );
    }

    return (
        <div className="form-content">
            <div className="form-label">이용약관 동의</div>
            <FormControlLabel
                control={<Checkbox checked={checkall} onChange={handleCheckAll} />}
                label={<Typography sx={{fontSize: "14px", fontWeight: 600}}>전체 약관에 동의합니다.</Typography>}
            />
            <div className="form-terms">
                {terms.map(t => <TermItem tid={t.id} title={t.title} terms_txt={t.terms_txt} />)}
            </div>
            <div style={{marginTop: "40px"}}><Button onClick={handleSubmit} variant="btnActive" fullWidth>약관동의</Button></div>
        </div>
    )
}

export default SecondStepForm;
