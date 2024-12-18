import {ButtonContainer, ConfirmButton, StyledMenuTitleContainer, TitleButtonContainer} from "../styles";
import {
  FormulaDetailLabel,
  FormulaDetailSectionContainer,
  FormulaDetailSelectBox,
  FormulaDetailSelectPlaceholder
} from "./styles";
import React, {useCallback, useState} from "react";
import {styled, MenuItem} from "@mui/material";
import {CalendarIcon} from "./icon";
import dayjs from 'dayjs';

const LabelInputContainer = styled("div")({
  display: "flex",
  flexDirection: "space-between",
  flexWrap: "wrap",
  gap: '24px',
});

const LabelInputBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 'calc(50% - 12px)',
});

const LabelRedDot = styled("div")({
  display: "flex",
  gap: "4px",
});

const RedDot = styled("span")({
  background: 'var(--System-Error, #FF462D)',
  width: "4px",
  height: "4px",
  borderRadius: "2px"
});


const Input = styled("input")(({disabled}) => ({
  display: "flex",
  padding: "10px 16px",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: disabled ? "var(--Gray-eee, #EEE)" : "var(--Gray-fff, #FFF)",
  marginTop: "4px",
  fontFamily: "Pretendard Variable",
  fontWeight: 700,
  color: disabled ? "var(--Gray-aaa, #AAA)" : "var(--Gray-111, #111)",
  '&::placeholder': {
    fontWeight: 400,
    color: "var(--Gray-aaa, #AAA)",
  }
}));

const IconInputBox = styled("div")({
  display: 'flex',
  alignItems: 'center',
  background: 'var(--Gray-eee, #EEE)',
  borderRadius: "8px",
  marginTop: "4px",
  padding: "0 0 0 16px",
});

const IconInput = styled(Input)({
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: 10,
});


/**
 * A_1_2. 산정식 등록 > 산정식 상세정보 섹션
 */
export const FormulaDetailSection = () => {
  const [name, setName] = useState('');
  const [emissions, setEmissions] = useState('');
  const [scope, setScope] = useState('');
  const [boundary, setBoundary] = useState('');
  const [use, setUse] = useState('');

  const renderValue = useCallback((selected, placeholder) => {
    if (selected === '') {
      return <FormulaDetailSelectPlaceholder>{placeholder}</FormulaDetailSelectPlaceholder>;
    }
    return selected;
  }, []);

  return (
    <FormulaDetailSectionContainer>
      <TitleButtonContainer>
        <StyledMenuTitleContainer>산정식 상세 정보</StyledMenuTitleContainer>
        <ButtonContainer>
          <ConfirmButton>저장</ConfirmButton>
        </ButtonContainer>
      </TitleButtonContainer>

      <LabelInputContainer>
        <LabelInputBox>
          <LabelRedDotBox text={"산정식 ID"}/>
          <Input value="" disabled={true}/>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"상위 산정식 ID"}/>
          <Input value="" disabled={true}/>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"산정식명"} isRequire={true}/>
          <Input value={name} placeholder={"산정식명을 입력하세요"} onChange={(e) => setName(e.target.value)}/>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"산정식 버전"}/>
          <Input value="" disabled={true}/>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"배출활동"} isRequire={true}/>
          <FormulaDetailSelectBox
            value={emissions}
            onChange={(e) => setEmissions(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "배출활동을 선택하세요")}>
            <MenuItem value="배출활동 1">배출활동 1</MenuItem>
            <MenuItem value="배출활동 2">배출활동 2</MenuItem>
            <MenuItem value="배출활동 3">배출활동 3</MenuItem>
            <MenuItem value="배출활동 4">배출활동 4</MenuItem>
          </FormulaDetailSelectBox>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"Scope"} isRequire={true}/>
          <FormulaDetailSelectBox
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "Scope를 선택하세요")}>
            <MenuItem value="Scope 1">Scope 1</MenuItem>
            <MenuItem value="Scope 2">Scope 2</MenuItem>
            <MenuItem value="Scope 3">Scope 3</MenuItem>
          </FormulaDetailSelectBox>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"경계"}/>
          <FormulaDetailSelectBox
            value={boundary}
            onChange={(e) => setBoundary(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "경계 값을 선택하세요")}>
            <MenuItem value="경계 1">경계 1</MenuItem>
            <MenuItem value="경계 2">경계 2</MenuItem>
            <MenuItem value="경계 3">경계 3</MenuItem>
          </FormulaDetailSelectBox>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"사용"} isRequire={true}/>
          <FormulaDetailSelectBox
            value={use}
            onChange={(e) => setUse(e.target.value)}
            displayEmpty
            renderValue={(selected) => renderValue(selected, "사용여부를 선택하세요")}>
            <MenuItem value="사용">사용</MenuItem>
            <MenuItem value="미사용">미사용</MenuItem>
          </FormulaDetailSelectBox>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"등록/변경일"}/>
          <IconInputBox>
            <CalendarIcon/>
            <IconInput value={dayjs().format('YYYY-MM-DD')} disabled={true}/>
          </IconInputBox>
        </LabelInputBox>
        <LabelInputBox>
          <LabelRedDotBox text={"등록/변경자"}/>
          <Input value="" disabled={true}/>
        </LabelInputBox>
      </LabelInputContainer>
    </FormulaDetailSectionContainer>
  )
}

const LabelRedDotBox = ({text, isRequire}) => {
  return (
    <LabelRedDot>
      <FormulaDetailLabel>{text}</FormulaDetailLabel>
      {isRequire && <RedDot/>}
    </LabelRedDot>
  )
}
