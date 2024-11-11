import { useState, useImperativeHandle, forwardRef } from "react";
import { FilterContainer, FilterLabel, FilterSelect } from "../Styles";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import Select from "@mui/material/Select";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const arrayYear = Array.from({ length: ("displayItemCount" in props) ? props.displayItemCount : thisYear - 1900 + 1 }, (v, k) => thisYear - k).reverse();
  
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
    <Select value={baseYear} size="small" IconComponent={ExpandMoreIcon} sx={{width: "width" in props?props.width:338}} >
      {arrayYear.map(a => <MenuItem key={'by'+a} value={a}>{a}</MenuItem>)}
      {/* <MenuItem value={1}>사용</MenuItem>
      <MenuItem value={0}>미사용</MenuItem> */}
    </Select>
    // <FilterContainer>
    //   <FilterLabel>기준년도</FilterLabel>
    //   <FilterSelect
    //     value={baseYear}
    //     onChange={handleChange}
    //     IconComponent={(props) => (
    //       <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    //         <path d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z" fill="#111111"/>
    //       </SvgIcon>
    //     )}>
    //     {arrayYear.map(a => <MenuItem key={'by'+a} value={a}>{a}</MenuItem>)}
    //   </FilterSelect>
    // </FilterContainer>
  )
}

export default forwardRef(BaseYearSelect);
