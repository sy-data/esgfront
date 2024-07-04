import {
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { styled } from "@mui/material";

// 페이지네이션 컨테이너 스타일 정의
const PaginationContainer = styled("div")({
  alignSelf: "center",
  display: "flex",
  alignItems: "self-end",
});

// 스타일이 적용되지 않은 버튼 스타일 정의
const NonStyledButton = styled("button")({
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%" /* 22.4px */,
  width: "20px",
  margin: "0 5px",
  background: "none",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px",
  "&:disabled": {
    color: "#808080",
    cursor: "default",
  },
});

// 선택된 버튼 스타일 정의
const SelectedButton = styled(NonStyledButton)({
  color: "var(--Primary-Primary, var(--Primary, #00CD9B))",
});

// Pagination 컴포넌트 정의
const Pagination = (props, ref) => {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 정의

  useEffect(() => {
    setCurrentPage(1); // 컴포넌트가 마운트될 때 현재 페이지를 1로 설정
  }, []);

  useEffect(() => {
    // 현재 페이지가 변경될 때마다 해당 페이지에 해당하는 데이터를 설정
    props.setRows(
      props.data.slice(
        (currentPage - 1) * props.pageSize,
        currentPage * props.pageSize
      )
    );
  }, [currentPage, props, props.data]);

  // 부모 컴포넌트에서 접근할 수 있는 함수들 정의
  useImperativeHandle(ref, () => ({
    currentPageNum: currentPage, // 현재 페이지 번호 반환
    changePage: (page) => setCurrentPage(page), // 페이지 변경 함수
  }));

  // 총 페이지 수 계산
  const totalPageNum = useMemo(() => {
    return Math.ceil(props.data.length / props.pageSize);
  }, [props.data.length, props.pageSize]);

  return (
    props.data.length > props.pageSize && ( // 데이터가 페이지 크기보다 클 경우 페이지네이션을 렌더링
      <PaginationContainer>
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage - 1)} // 이전 페이지로 이동
          disabled={currentPage === 1} // 첫 페이지에서는 비활성화
        >
          &lt;
        </NonStyledButton>
        {Array.from({ length: totalPageNum }, (_, index) =>
          index + 1 === currentPage ? (
            <SelectedButton
              key={index}
              onClick={() => setCurrentPage(index + 1)} // 현재 페이지인 경우
            >
              {index + 1}
            </SelectedButton>
          ) : (
            <NonStyledButton
              key={index}
              onClick={() => setCurrentPage(index + 1)} // 현재 페이지가 아닌 경우
            >
              {index + 1}
            </NonStyledButton>
          )
        )}
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage + 1)} // 다음 페이지로 이동
          disabled={currentPage === totalPageNum} // 마지막 페이지에서는 비활성화
        >
          &gt;
        </NonStyledButton>
      </PaginationContainer>
    )
  );
};

export default forwardRef(Pagination);
