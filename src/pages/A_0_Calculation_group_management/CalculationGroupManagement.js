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

const HeaderItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "70px",
});

const HeaderTitle = styled(Typography)({
  fontWeight: "bold",
  color: "#757575",
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
            <Checkbox />
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
