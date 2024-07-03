import {
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { styled } from "@mui/material";

const PaginationContainer = styled("div")({
  alignSelf: "center",
  display: "flex",
  alignItems: "self-end",
});

const NonStyledButton = styled("button")({
  color: "#000", // 기본 색상은 검은색
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

const SelectedButton = styled(NonStyledButton)({
  color: "var(--Primary-Primary, var(--Primary, #00CD9B))", // 선택된 페이지 색상
});

const Pagination = (props, ref) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    props.setRows(
      props.data.slice(
        (currentPage - 1) * props.pageSize,
        currentPage * props.pageSize
      )
    );
  }, [currentPage, props.data]);

  useImperativeHandle(ref, () => ({
    currentPageNum: currentPage,
    changePage: (page) => setCurrentPage(page),
  }));

  const totalPageNum = useMemo(() => {
    return Math.ceil(props.data.length / props.pageSize);
  }, [props.data]);

  return (
    props.data.length > props.pageSize && (
      <PaginationContainer>
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </NonStyledButton>
        {Array.from({ length: totalPageNum }, (_, index) =>
          index + 1 === currentPage ? (
            <SelectedButton
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </SelectedButton>
          ) : (
            <NonStyledButton
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </NonStyledButton>
          )
        )}
        <NonStyledButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPageNum}
        >
          &gt;
        </NonStyledButton>
      </PaginationContainer>
    )
  );
};

export default forwardRef(Pagination);
