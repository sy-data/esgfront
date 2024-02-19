import { Paper, styled } from "@mui/material"

const AreaPadding = styled('div')(() => ({
  display: 'flex',
  padding: '10px'
}))

const PaperStyle = styled(Paper)(() => ({
  flex: 1,
  padding: '10px'
}));

const ContentBody = ({children, className}) => {
  return (
    <AreaPadding className={className}>
      <PaperStyle elevation={4}>
        {children}
      </PaperStyle>
    </AreaPadding>
  )
}

export default ContentBody;
