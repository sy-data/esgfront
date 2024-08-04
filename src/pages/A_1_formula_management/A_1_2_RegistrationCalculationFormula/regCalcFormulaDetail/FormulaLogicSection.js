import {StyledMenuTitleContainer} from "../styles";
import {
  FormulaDetailLabel,
  FormulaDetailSectionContainer,
  FormulaDetailSelectBox,
  FormulaDetailSelectPlaceholder
} from "./styles";
import React, {useState} from "react";
import {MenuItem, styled} from "@mui/material";

const dummyTier = {
  "Tier 1": "$CO2배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $CO2배출계수$ * $\n" +
    "산화계수$;\n" +
    "$CH4배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $CH4배출계수\n" +
    "$;\n" +
    "$N2O배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $N2O배출계수\n" +
    "$;\n" +
    "$에너지사용량$ = $활동량$ * $총발열량계수$ / 1000000;\n\n" +
    "Tier 1",
  "Tier 2": "$CO2배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $CO2배출계수$ * $\n" +
    "산화계수$;\n" +
    "$CH4배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $CH4배출계수\n" +
    "$;\n" +
    "$N2O배출량$ = $활동량$ * $순발열량계수$ / 1000000 * $N2O배출계수\n" +
    "$;\n" +
    "$에너지사용량$ = $활동량$ * $총발열량계수$ / 1000000;\n\n" +
    "Tier 2",
}

const LabelInputBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const TierDescription = styled("textarea")({
  display: "flex",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-eee, #EEE)",
  minHeight: "180px",
  color: "var(--Gray-aaa, #AAA)",
  fontFamily: "Pretendard Variable",
  fontSize: "13px",
  lineHeight: "150%",
  fontWeight: 700,
  resize: "none",
});

/**
 * A_1_2. 산정식 등록 > 산정식 로직 섹션
 */
export const FormulaLogicSection = () => {
  const [tier, setTier] = useState('');

  return (
    <FormulaDetailSectionContainer>
      <StyledMenuTitleContainer>산정식 로직</StyledMenuTitleContainer>
      <LabelInputBox>
        <FormulaDetailLabel>Tier</FormulaDetailLabel>
        <FormulaDetailSelectBox
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (selected === '') {
              return <FormulaDetailSelectPlaceholder>Tier 값을 선택하세요</FormulaDetailSelectPlaceholder>;
            }
            return selected;
          }}>
          <MenuItem value="Tier 1">Tier 1</MenuItem>
          <MenuItem value="Tier 2">Tier 2</MenuItem>
        </FormulaDetailSelectBox>
      </LabelInputBox>
      <TierDescription value={dummyTier[tier]} disabled={true}/>
    </FormulaDetailSectionContainer>
  )
}
