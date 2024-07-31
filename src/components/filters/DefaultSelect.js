import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { FilterContainer, FilterLabel, FilterSelect } from "../Styles";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";


/**
 * 일반 필터로 사용할 select입니다. 
 * 
 * 사용법 :
 * const selectRef = useRef();
 * <DefaultSelect
 *   selectLabel="사업장"
 *   selectOptions={[...list of options]}
 *   onSelectChanged={handleSelectChanged}
 *   ref={selectRef}
 * />
 * 
 * const handleSelectChanged = selectedValue => {
 *   ... do with new selected value ...
 * }
 * 
 * options의 element로 object type이 들어올 경우 value와 label key를 사용합니다
 * object 이외의 type이 들어올 경우 value로 list의 index를, display label로 element를 사용합니다.
 * 
 * selectRef.current.selected는 selectOptions의 value를 반환합니다.
 * selectOptions[selectRef.current.selected] 로 원본값에 access
 * 
 * selectRef.current.changeOption은 외부에서 value를 변경할때 사용합니다.
 * ** selectRef.current.changeOption(value to change)
 * 
 * onSelectChanged에 등록한 function은 value가 변경되었을때 실행됩니다.
 */
const DefaultSelect = ({selectLabel, selectOptions, onSelectChanged}, ref) => {
  const [selected, setSelected] = useState(selectOptions.length > 0 ? selectOptions[0].value : 0);
  useImperativeHandle(ref, () => ({
    selected,
    changeOption: value => setSelected(value),
  }));
  
  useEffect(() => {
    if(onSelectChanged){
      onSelectChanged(selected);
    }
  }, [selected]);
  
  useEffect(() => {
    if(!selectOptions.map(option => "value" in option ? option.value : option).includes(selected)){
      setSelected(selectOptions.length > 0 ? selectOptions[0].value : 0);
    }
  }, [selectOptions]);
  
  const createMenuItem = (data, index) => {
    const item = { key: `defaultSelect_${selectLabel}_${index}` };
    if (typeof (data) === "object") {
      item.value = data.value;
      item.label = data.label;
    }
    else {
      item.value = index;
      item.label = data;
    }
    return (
      <MenuItem key={item.key} value={item.value}>
        {item.label}
      </MenuItem>
    );
  }
  
  return (
    <FilterContainer>
      <FilterLabel>{selectLabel}</FilterLabel>
      <FilterSelect
        value={selected}
        onChange={e => setSelected(e.target.value)}
        IconComponent={(props) => (
          <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z" fill="#111111"/>
          </SvgIcon>
        )}
      >
        {selectOptions && selectOptions.length > 0 ?
          selectOptions.map((data, index) => createMenuItem(data, index)) :
          <MenuItem key={0} value={0} />
        }
      </FilterSelect>
    </FilterContainer>
  )
}

export default forwardRef(DefaultSelect);
