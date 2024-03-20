import { useState, useImperativeHandle, forwardRef } from "react";
import { FilterContainer, FilterLabel } from "../Styles";
import TextField from "@mui/material/TextField";

/**
 * from / to를 직접 입력하는 기준년도 input입니다. 
 * 
 * 사용법 :
 * const baseyearRef = useRef();
 * <BaseYearSelect ref={baseyearRef} />
 * 
 * 이렇게 선언 후 필요한 곳에서 baseyearRef.current.baseYearFrom, baseyearRef.current.baseYearTo 사용
 * 
 * ========================================================
 * 
 * parent component에서 선택된 값이 변할때마다 실행되는 콜백 함수 사용
 * const handleBaseYearFromChanged = newValue => {
 *   console.log(newValue);
 * }
 * const handleBaseYearToChanged = newValue => {
 *   console.log(newValue);
 * }
 * 
 * return (
 *   <BaseYearSelect ref={baseyearRef} onBaseYearFromChanged={handleBaseYearFromChanged} onBaseYearToChanged={handleBaseYearToChanged} />
 * )
 * 
 */
const BaseYearRange = (props, ref) => {
  const thisYear = new Date().getFullYear();

  const [baseYearFrom, setBaseYearFrom] = useState(thisYear-1);
  const [baseYearTo, setBaseYearTo] = useState(thisYear);
  const handleFrom = e => {
    setBaseYearFrom(e.target.value);
    if (props.onBaseYearFromChanged) {
      props.onBaseYearFromChanged(e.target.value);
    }
  }
  const handleTo = e => {
    setBaseYearTo(e.target.value);
    if (props.onBaseYearToChanged) {
      props.onBaseYearToChanged(e.target.value);
    }
  }
  useImperativeHandle(ref, () => ({
    baseYearFrom,
    baseYearTo
  }));

  return (
    <FilterContainer>
      <FilterLabel>기준년도</FilterLabel>
      {/* TODO : work after design fixed */}
      <TextField value={baseYearFrom} type="number" inputProps={{ style: { width: '58px', height: '37px', padding: '0px 0px 0px 10px' } }} onChange={handleFrom} />
      <span style={{width: '15px', textAlign: 'center'}}>~</span>
      <TextField value={baseYearTo} type="number" inputProps={{ style: { width: '58px', height: '37px', padding: '0px 0px 0px 10px' } }} onChange={handleTo} />
    </FilterContainer>
  )
}

export default forwardRef(BaseYearRange);
