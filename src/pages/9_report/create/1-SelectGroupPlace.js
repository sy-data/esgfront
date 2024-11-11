import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import GroupList from "./1-L-GroupList";
import WorkplaceName from "./1-R-WorkplaceName";

const SelectGroupPlace = props => {
  
  
  return (
    <div style={{width: "60%", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", height: "27px", marginBottom: "16px", alignItems: "center", justifyContent: "space-between", fontFamily: "Pretendard Variable"}}>
        <div style={{fontSize: "18px", fontWeight: "bold", marginLeft: "5px"}}>1. 조직 및 사업장 선택</div>
        <div style={{display: "flex", alignItems: "center", fontSize: "14px", color: "#4454FF"}}>
          <InfoOutlinedIcon sx={{width: 20, height: 20}} /><span style={{fontWeight: "bold"}}>통합 4개, 개별 사업장 10개</span>&nbsp;선택 가능
        </div>
      </div>
      
      <div style={{
        display: "flex", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #EEEEEE", overflow: "auto",
        width: "100%", flexGrow: 1, boxSizing: "border-box",
      }}>
        <GroupList />
        <WorkplaceName />
      </div>
    </div>
  )
}

export default SelectGroupPlace;
