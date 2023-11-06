import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { FilterContainer, FilterLabel, FilterSelect } from "../Styles";
import MenuItem from "@mui/material/MenuItem";


/**
 * 일반 필터로 사용할 select입니다. 
 * 
 * 사용법 :
 * const selectRef = useRef();
 * <DefaultSelect selectLabel="사업장" selectOptions={[...list of options]} ref={selectRef} />
 * 
 * selectRef.current.selected는 selectOptions의 index를 반환합니다.
 * selectOptions[selectRef.current.selected] 로 원본값에 access
 */
const DefaultSelect = ({selectLabel, selectOptions}, ref) => {
  const [selected, setSelected] = useState(0);
  useImperativeHandle(ref, () => ({
    selected
  }));
  
  useEffect(() => {
    if(selectOptions && selectOptions.length > 0){
      setSelected(0);
    }
  }, [selectOptions]);

  return (
    <FilterContainer>
      <FilterLabel>{selectLabel}</FilterLabel>
      <FilterSelect value={selected} onChange={e => setSelected(e.target.value)}>
        {selectOptions && selectOptions.length > 0 ?
          selectOptions.map((a, i) => <MenuItem key={"ds"+a} value={i}>{a}</MenuItem>) :
          <MenuItem key={"ds0"} value={0} />
        }
      </FilterSelect>
    </FilterContainer>
  )
}

export default forwardRef(DefaultSelect);
