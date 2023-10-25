import { Typography, styled } from "@mui/material";

const TitleContainer = styled('div')(() => ({
  width: "300px",
  margin: "20px"
}));

const MenuTitle = ({title}) => {
  return (
    <TitleContainer>
      <Typography variant="h4" component="h4">
        {title}
      </Typography>
    </TitleContainer>
  )
}

export default MenuTitle;
