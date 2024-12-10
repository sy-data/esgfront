import { useState } from "react";
import { Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material";
import SubTitle from "../../../components/SubTitle";
import ContentBody from "../../../components/ContentBody";
import CloseIcon from '@mui/icons-material/Close';
import HsModal from "./HsModal";
import { esgFetch } from "../../../components/FetchWrapper";

const BlockGroup =  styled("div")(() => ({
  display: "flex", flexDirection: "column", gap: "24px"
}));
const BlockField = styled("div")(() => ({
  display: "flex", gap: "24px", height: "40px"
}));
const BlockFieldTitle = styled("div")(() => ({
  fontFamily: "Pretendard Variable", fontSize: "14px", fontWeight: 600,
  width: "100px", height: "100%", color: "#111111",
  display: "flex", alignItems: "center"
}));


const RegisterDataGroup = ({ index, values, handleChange, handleOpenModal, addField }) => {
  return (
    <BlockGroup>
      <BlockField>
        <BlockFieldTitle>생산품명</BlockFieldTitle>
        <div style={{display: 'flex', width: '100%'}}>
          <TextField key={`rdg-${index}-name`} placeholder="생산품명을 입력해주세요" value={values[index]["name"]} size="small" onChange={e=>handleChange(index, "name", e.target.value)} fullWidth />
        </div>
      </BlockField>
      <BlockField>
        <BlockFieldTitle>HS Code</BlockFieldTitle>
        <div style={{display: 'flex', gap: '4px', width: '100%'}}>
          <TextField key={`rdg-${index}-code`} placeholder="HS Code를 검색해주세요" value={values[index]["code"]} size="small" onChange={e=>handleChange(index, "code", e.target.value)} fullWidth />
          <Button variant="btnInit" sx={{padding: 0, minWidth: "147px"}} onClick={()=>handleOpenModal(index)}>
            <div style={{display: "flex", alignItems: "center", height: "100%", gap: "5px"}}>
              <Typography sx={{fontSize: "14px", fontWeight: "bold"}}>HS Code 찾기</Typography>
              <SearchIcon />
            </div>
          </Button>
        </div>
      </BlockField>
      <BlockField>
        <BlockFieldTitle>수량/단위</BlockFieldTitle>
        <div style={{display: 'flex', gap: '4px', width: '100%'}}>
          <TextField key={`rdg-${index}-amount`} placeholder="생산품 수량을 입력해주세요" value={values[index]["amount"]} size="small" onChange={e=>handleChange(index, "amount", e.target.value)} fullWidth />
          <Select
            key={`rdg-${index}-unit`}
            value={values[index]["unit"]}
            size="small"
            IconComponent={ExpandMoreIcon}
            sx={{minWidth: "147px"}}
            onChange={e=>handleChange(index, "unit", e.target.value)}
            displayEmpty
            renderValue={selected => {
              if(selected.length === 0){
                return <Typography style={{fontSize: "15px", color: "#AAAAAA"}}>단위</Typography>
              }
              return <Typography style={{fontSize: "15px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>
            }}
          >
            <MenuItem value="N㎥">N㎥</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="kWh">kWh</MenuItem>
            <MenuItem value="MJ">MJ</MenuItem>
            <MenuItem value="Ton">Ton</MenuItem>
          </Select>
        </div>
      </BlockField>
      {index === values.length-1 ?
      <div
        style={{display: "flex", alignItems: "center", justifyContent: "center", height: "30px", border: "1px solid #00CD9B", color: "#00CD9B", borderRadius: "8px", cursor: "pointer"}}
        onClick={addField}
      >
        항목 추가 +
      </div> :
      <div style={{height: "0px", borderTop: "1px solid #E5E5E5"}} />
      }
    </BlockGroup>
  )
}


const ProductRegister = props => {
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState([{name: "", code: "", amount: "", unit: ""}]);
  
  
  const handleChange = (groupIndex, fieldName, value) => {
    setValues((prevGroups) =>
      prevGroups.map((group, index) =>
        index === groupIndex
          ? { ...group, [fieldName]: value } // 불변성을 유지하며 특정 그룹 필드 업데이트
          : group
      )
    );
  }
  
  const addField = () => setValues([...values, {name: "", code: "", amount: "", unit: ""}]);
  const [openHsModal, setOpenHsModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleOpenModal = idx => {
    setActiveIndex(idx);
    setOpenHsModal(true);
  }
  const handleCloseModal = () => setOpenHsModal(false);
  const handleSelectValue = value => {
    const prevValues = [...values];
    prevValues[activeIndex].code = `${value.row.c2}(${value.row.c4})`;
    setValues(prevValues);
    setOpenHsModal(false);
  }
  
  const handleRegisterProduct = async () => {
    // data -> values
    // [{amount: ..., code: ..., name: ..., unit: ...}, {...}, ...]
    const result = await esgFetch().then(res=>res.json());
  }
  
  return (
    <ContentBody width={props.width} padding="24px" gap="32px" flex={1}>
      <SubTitle title={"생산품 정보"}>
        <CloseIcon onClick={()=>props.closeRegister()} />
      </SubTitle>
      <div style={{width: "100%", height: "auto", overflow: "scroll", display: "flex", flex: 1, flexDirection: "column", gap: "24px"}}>
        {values.map((value, index) => <RegisterDataGroup key={index} index={index} values={values} handleChange={handleChange} handleOpenModal={handleOpenModal} addField={addField} />)}
      </div>
      <Button variant={valid ? "btnActive":"btnDisabled"} size="small" sx={{height:"40px"}} fullWidth onClick={handleRegisterProduct}>등록</Button>
      <HsModal open={openHsModal} onClose={handleCloseModal} onSelect={handleSelectValue} />
    </ContentBody>
  )
}

export default ProductRegister;
