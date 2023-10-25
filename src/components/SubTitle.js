import { Typography, styled } from "@mui/material";

const TitleContainer = styled('div')(() => ({
  width: "100%",
  padding: "10px"
}));

const SubTitle = ({ title }) => {
  return (
    <TitleContainer>
      <Typography variant="h5" component="h5">
        {title}
      </Typography>
    </TitleContainer>
  )
}

export default SubTitle;
