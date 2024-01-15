import { Typography, styled } from "@mui/material";

const TitleContainer = styled('div')(() => ({
  margin: "20px",
  borderBottom: "1px solid black",
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
