import { Typography, styled } from "@mui/material";

const TitleContainer = styled('div')(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px",
  alignItems: "center"
}));

const SubTitle = ({ title, children }) => {
  return (
    <TitleContainer>
      <Typography style={{marginLeft: "4px", fontFamily: "Pretendard Variable", fontSize: "18px", fontWeight: "bold"}}>
        {title}
      </Typography>
      {children}
    </TitleContainer>
  )
}

export default SubTitle;
