import React from "react";
import { Box, Button, Checkbox, Typography, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: 24,
  height: "1000px",
  width: "1684px",
});

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
});

const StyledTypography = styled(Typography)({
  color: "var(--Gray-111, #111)",
  fontFamily: "Pretendard Variable",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "36px",
  letterSpacing: "-0.48px",
});

const ButtonGroup = styled(Box)({
  display: "flex",
  gap: 8,
});

const AddButton = styled(Button)({
  display: "flex",
  height: "38px",
  padding: "10px 26px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  borderRadius: "8px",
  background: "var(--Primary-Primary, #00CD9B)",
  color: "var(--Gray-fff, #FFF)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "21px",
  letterSpacing: "-0.28px",
  whiteSpace: "nowrap",
});

const DeleteButton = styled(Button)({
  display: "flex",
  height: "40px",
  padding: "10px 26px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flex: "1 0 0",
  borderRadius: "8px",
  border: "1px solid var(--Gray-eee, #EEE)",
  background: "var(--Gray-fff, #FFF)",
  color: "var(--Gray-ccc, #CCC)",
  textAlign: "center",
  fontFamily: "Pretendard Variable",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "21px",
  letterSpacing: "-0.28px",
});

const TableContainer = styled(Box)({
  border: "1px solid #5e5e5e",
  borderRadius: 8,
  width: "100%",
  overflow: "hidden",
});

const TableHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #eaeaea",
  height: "42px",
  padding: 16,
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    border: "1px solid var(--graye-5e-5e-5)",
    borderRadius: 4,
    height: 20,
    width: 20,
  },
  "& .Mui-checked": {
    height: "20px !important",
    left: "0 !important",
    position: "absolute !important",
    top: "0 !important",
    width: "20px !important",
  },
  "&.Mui-disabled": {
    "&.Mui-checked": {
      backgroundColor: "var(--grayfff)",
    },
    "&:not(.Mui-checked)": {
      backgroundColor: "var(--grayf-9f-9f-9)",
    },
  },
  "&:not(.Mui-disabled)": {
    "&.Mui-checked": {
      backgroundColor: "var(--grayfff)",
    },
    "&:not(.Mui-checked)": {
      backgroundColor: "var(--grayfff)",
    },
  },
}));

const HeaderItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "70px",
});

const HeaderTitle = styled(Typography)({
  fontWeight: "bold",
  color: "#757575",
  paddingTop: 11,
  paddingRight: 124,
  paddingBottom: 11,
  paddingLeft: 20,
});

const TableContent = styled(Box)({
  height: "780px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  backgroundColor: "#fff",
});

const ContentMessage = styled(Typography)({
  color: "#757575",
});

const Icon = styled(Box)({
  width: "20px",
  height: "20px",
  marginRight: 4,
});

const App = () => {
  return (
    <Container>
      <ContentContainer>
        <HeaderContainer>
          <StyledTypography>산정식그룹 기본정보</StyledTypography>
          <ButtonGroup>
            <AddButton variant="contained" color="primary">
              그룹 추가
            </AddButton>
            <DeleteButton variant="contained" color="secondary" disabled>
              삭제
            </DeleteButton>
          </ButtonGroup>
        </HeaderContainer>
        <TableContainer>
          <TableHeader>
            <StyledCheckbox />
            <HeaderItem>
              <HeaderTitle variant="body2">No</HeaderTitle>
            </HeaderItem>
            <Box sx={{ flex: 1, display: "flex", gap: 8 }}>
              <HeaderTitle variant="body2">산정식그룹 ID</HeaderTitle>
              <HeaderTitle variant="body2">산정식그룹명</HeaderTitle>
              <HeaderTitle variant="body2">비고</HeaderTitle>
            </Box>
          </TableHeader>
          <TableContent>
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M11.1237 9.375C11.1237 9.20924 11.0579 9.05027 10.9407 8.93306C10.8235 8.81585 10.6645 8.75 10.4987 8.75C10.333 8.75 10.174 8.81585 10.0568 8.93306C9.9396 9.05027 9.87375 9.20924 9.87375 9.375V13.125C9.87375 13.2908 9.9396 13.4497 10.0568 13.5669C10.174 13.6842 10.333 13.75 10.4987 13.75C10.6645 13.75 10.8235 13.6842 10.9407 13.5669C11.0579 13.4497 11.1237 13.2908 11.1237 13.125V9.375ZM11.4362 6.875C11.4362 7.12347 11.3375 7.36177 11.1618 7.53747C10.9861 7.71317 10.7478 7.81187 10.4994 7.81187C10.2509 7.81187 10.0126 7.71317 9.8369 7.53747C9.66121 7.36177 9.5625 7.12347 9.5625 6.875C9.5625 6.62669 9.66114 6.38855 9.83672 6.21297C10.0123 6.03739 10.2504 5.93875 10.4987 5.93875C10.7471 5.93875 10.9852 6.03739 11.1608 6.21297C11.3364 6.38855 11.4362 6.62669 11.4362 6.875ZM10.5 1.25C8.17936 1.25 5.95376 2.17187 4.31282 3.81282C2.67187 5.45376 1.75 7.67936 1.75 10C1.75 12.3206 2.67187 14.5462 4.31282 16.1872C5.95376 17.8281 8.17936 18.75 10.5 18.75C12.8206 18.75 15.0462 17.8281 16.6872 16.1872C18.3281 14.5462 19.25 12.3206 19.25 10C19.25 7.67936 18.3281 5.45376 16.6872 3.81282C15.0462 2.17187 12.8206 1.25 10.5 1.25ZM3 10C3 9.01509 3.19399 8.03982 3.5709 7.12987C3.94781 6.21993 4.50026 5.39314 5.1967 4.6967C5.89314 4.00026 6.71993 3.44781 7.62987 3.0709C8.53982 2.69399 9.51509 2.5 10.5 2.5C11.4849 2.5 12.4602 2.69399 13.3701 3.0709C14.2801 3.44781 15.1069 4.00026 15.8033 4.6967C16.4997 5.39314 17.0522 6.21993 17.4291 7.12987C17.806 8.03982 18 9.01509 18 10C18 11.9891 17.2098 13.8968 15.8033 15.3033C14.3968 16.7098 12.4891 17.5 10.5 17.5C8.51088 17.5 6.60322 16.7098 5.1967 15.3033C3.79018 13.8968 3 11.9891 3 10Z"
                  fill="#757575"
                />
              </svg>
            </Icon>
            <ContentMessage variant="body2">
              조회된 정보가 없습니다
            </ContentMessage>
          </TableContent>
        </TableContainer>
      </ContentContainer>
      <Pagination count={1} variant="outlined" color="primary" />
    </Container>
  );
};

export default App;
