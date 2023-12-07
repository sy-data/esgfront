import { styled, Select, FormControl } from "@mui/material";


export const MasterLayout = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%', 
  minHeight: '100%'
}));

export const MainContent = styled('div')(() => ({
  flex: 1,
  display: 'flex',
}));

export const ContentWithTitie = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}))

export const FilterBlock = styled('div')(() => ({
  margin: "10px",
  padding: "10px",
  backgroundColor: "#FFFFFF",
  border: "2px black solid"
}));

export const FilterLine = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center'
}));

export const FilterContainer = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '40px'
}));

FilterContainer.defaultProps = {
  size: 'small'
};

export const FilterLabel = styled('div')(() => ({
  padding: '0px 10px',
  margin: '0px 10px',
  height: '40px',
  minWidth: '120px',
  backgroundColor: '#999999',
  display: 'flex',
  alignItems: 'center'
}));

export const FilterSelect = styled(Select)(() => ({
  minWidth: '150px',
  maxHeight: '37px'
}));

export const SearchButtonContainer = styled('div')(() => ({
  padding: '0px 10px',
  display: 'flex',
  justifyContent: 'flex-end'
}));
