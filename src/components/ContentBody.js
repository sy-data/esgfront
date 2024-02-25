import { Paper, styled } from "@mui/material"

const AreaPadding = styled('div')(() => ({
  display: 'flex',
  padding: '10px',
  width: "calc(100% - 20px)",
  height: "calc(100% - 20px)",
}))

const PaperStyle = styled(Paper)(() => ({
  flex: 1,
  padding: '10px'
}));

const ContentBody = ({children}) => {
  return (
    <AreaPadding>
      <PaperStyle elevation={4}>
        {children}
      </PaperStyle>
    </AreaPadding>
  )
}

export default ContentBody;
