import React from "react";
import {ContentWithTitie} from "../../../../components/Styles";
import {FormulaDetailSection} from "./FormulaDetailSection";
import {FormulaLogicSection} from "./FormulaLogicSection";
import {FormulaParameterSection} from "./FormulaParameterSection";

/**
 * A_1_2. 산정식 등록 > 산정식 상세정보, 로직, 파라미터 (5 depth)
 */
const RegCalcFormulaDetail = () => {
  return (
    <ContentWithTitie gap={"24px"}>
      <FormulaDetailSection/>
      <FormulaLogicSection/>
      <FormulaParameterSection/>
    </ContentWithTitie>
  );
};

export default RegCalcFormulaDetail;
