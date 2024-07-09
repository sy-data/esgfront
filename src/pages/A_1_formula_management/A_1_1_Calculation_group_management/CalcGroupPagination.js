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
  const { data = [], pageSize, setRows } = props; // props로부터 값을 추출하고, data의 기본값을 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태를 1로 초기화

  // 데이터가 변경될 때마다 현재 페이지를 1로 설정
  useEffect(() => {
    setCurrentPage(1); // 컴포넌트가 마운트되거나 data가 변경될 때 현재 페이지를 1로 설정
  }, [data]);

  // 현재 페이지 또는 데이터가 변경될 때마다 페이지에 해당하는 데이터를 설정
  useEffect(() => {
    if (typeof setRows === "function") {
      setRows(data.slice((currentPage - 1) * pageSize, currentPage * pageSize)); // 현재 페이지에 맞는 데이터를 setRows 함수를 통해 설정
    }
  }, [currentPage, data, pageSize, setRows]);

  // 부모 컴포넌트에서 접근할 수 있는 함수들 정의
  useImperativeHandle(ref, () => ({
    currentPageNum: currentPage, // 현재 페이지 번호를 반환하는 함수
    changePage: (page) => setCurrentPage(page), // 페이지 변경 함수
  }));

  // 총 페이지 수 계산
  const totalPageNum = useMemo(() => {
    return Math.ceil(data.length / pageSize); // 데이터 길이를 페이지 크기로 나누어 총 페이지 수를 계산
  }, [data.length, pageSize]);

  return (
    data.length > pageSize && ( // 데이터 길이가 페이지 크기보다 클 경우에만 페이지네이션을 렌더링함
      <PaginationContainer>
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage - 1)} // 이전 페이지로 이동하는 버튼 클릭 핸들러
          disabled={currentPage === 1} // 현재 페이지가 첫 페이지일 경우 비활성화
        >
          &lt;
        </NonStyledButton>
        {Array.from({ length: totalPageNum }, (_, index) =>
          index + 1 === currentPage ? (
            <SelectedButton
              key={index} // 현재 페이지 번호를 나타내는 버튼
              onClick={() => setCurrentPage(index + 1)} // 버튼 클릭 시 해당 페이지로 이동
            >
              {index + 1}
            </SelectedButton>
          ) : (
            <NonStyledButton
              key={index} // 다른 페이지 번호를 나타내는 버튼
              onClick={() => setCurrentPage(index + 1)} // 버튼 클릭 시 해당 페이지로 이동
            >
              {index + 1}
            </NonStyledButton>
          )
        )}
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage + 1)} // 다음 페이지로 이동하는 버튼 클릭 핸들러
          disabled={currentPage === totalPageNum} // 현재 페이지가 마지막 페이지일 경우 비활성화합니다.
        >
          &gt;
        </NonStyledButton>
      </PaginationContainer>
    )
  );
};

export default forwardRef(Pagination); // forwardRef를 사용하여 부모 컴포넌트에서 ref를 전달받을 수 있도록 함
