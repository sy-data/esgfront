import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import RegCalcFormulaPagination from "./RegCalcFormulaPagination";
import { NoPaginationDataGrid, TableContainer } from "../styles";

const RegCalcFormulaDataGrid = (props, ref) => {
  const { data = [], pageSize, ...otherProps } = props; // props에서 data와 pageSize를 추출하며, data의 기본값을 빈 배열로 설정
  const [rows, setRows] = useState([]); // 현재 페이지에 표시될 행 상태
  const paginationRef = useRef(null); // 페이지네이션 참조 생성

  // 부모 컴포넌트에서 호출할 수 있는 함수들 정의
  useImperativeHandle(ref, () => ({
    changeToLastPage: () => {
      if (paginationRef.current) {
        paginationRef.current.changeLastPage(); // 첫 번째 페이지로 변경
      }
    },
  }));

  return (
    <TableContainer>
      {/* 페이지네이션 없는 DataGrid 렌더링 */}
      <NoPaginationDataGrid rows={rows} {...otherProps} />
      <RegCalcFormulaPagination
        ref={paginationRef} // 페이지네이션 참조 설정
        data={data} // 전체 데이터 전달
        pageSize={pageSize} // 페이지 크기 전달
        setRows={setRows} // rows 설정 함수 전달
      />
    </TableContainer>
  );
};

export default forwardRef(RegCalcFormulaDataGrid);
