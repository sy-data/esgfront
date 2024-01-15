import { Typography, styled } from "@mui/material";

const TitleContainer = styled('div')(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "10px"
}));

const SubTitle = ({ title, children }) => {
  return (
    <TitleContainer>
      <Typography variant="h5" component="h5">
        {title}
      </Typography>
      {children}
    </TitleContainer>
  )
}

export default SubTitle;
