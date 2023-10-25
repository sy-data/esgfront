import { styled } from "@mui/material"

const Container = styled('div')(({direction}) => ({
  display: "flex",
  flexDirection: direction === 'v' ? 'row' : 'column',
  width: "100%",
  height: "100%"
}));

const Section1 = styled('div')(({direction, customWidth}) => ({
  flex: customWidth ? customWidth : direction === 'v' ? 0.4 : 1,
  ...((!customWidth && direction === 'v') && {
    maxWidth: "600px",
    minWidth: "400px"
  })
}));

const Section2 = styled('div')(({customWidth}) => ({
  flex: customWidth ? 1 - customWidth : 1,
}));

const SplitArea = ({ children, direction, customWidth }) => {
  const dir = (!direction || !['h', 'v'].includes(direction[0])) ? 'v' : direction[0];
  
  let content1 = '';
  let content2 = '';
  if(children){
    if(Array.isArray(children)){
      content1 = children[0];
      content2 = children.length >= 2 ? children[1] : '';
    }
    else if(typeof children === 'object'){
      content1 = children;
    }
  }
  
  return (
    <Container direction={dir}>
      <Section1 direction={dir} customWidth={customWidth}>
        {content1}
      </Section1>
      <Section2 customWidth={customWidth}>
        {content2}
      </Section2>
    </Container>
  )
}

export default SplitArea;
