import { useState, useImperativeHandle, forwardRef } from "react";
import { FilterContainer, FilterLabel, FilterSelect } from "../Styles";
import MenuItem from "@mui/material/MenuItem";

/**
 * 1900년부터 올해까지 선택가능한 기준년도 select입니다. 
 * 
 * 사용법 :
 * const baseyearRef = useRef();
 * <BaseYearSelect ref={baseyearRef} />
 * 
 * 이렇게 선언 후 필요한 곳에서 baseyearRef.current.baseYear 사용
 * 
 * ========================================================
 * 
 * parent component에서 선택된 값이 변할때마다 실행되는 콜백 함수 사용
 * const handleBaseYearChanged = newValue => {
 *   console.log(newValue);
 * }
 * 
 * return (
 *   <BaseYearSelect ref={baseyearRef} onBaseYearChanged={handleBaseYearChanged} />
 * )
 * 
 */
const BaseYearSelect = (props, ref) => {
  const thisYear = new Date().getFullYear();
  const arrayYear = Array.from({ length: thisYear - 1900 + 1 }, (v, k) => k + 1900);
  
  const [baseYear, setBaseYear] = useState(thisYear);
  const handleChange = e => {
    setBaseYear(e.target.value);
    if(props.onBaseYearChanged){
      props.onBaseYearChanged(e.target.value);
    }
  }
  useImperativeHandle(ref, () => ({
    baseYear
  }));
  
  return (
    <FilterContainer>
      <FilterLabel>기준년도</FilterLabel>
      <FilterSelect value={baseYear} onChange={handleChange}>
        {arrayYear.map(a => <MenuItem key={'by'+a} value={a}>{a}</MenuItem>)}
      </FilterSelect>
    </FilterContainer>
  )
}

export default forwardRef(BaseYearSelect);
