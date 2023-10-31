import { styled, Select, FormControl } from "@mui/material";


export const MasterLayout = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%', height: '100%'
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
  display: 'flex',
  justifyContent: 'space-around'
}));

export const FilterContainer = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

FilterContainer.defaultProps = {
  size: 'small'
};

export const FilterLabel = styled('div')(() => ({
  padding: '0px 10px',
  margin: '0px 10px',
  height: '100%',
  backgroundColor: '#999999',
  display: 'flex',
  alignItems: 'center'
}));

export const FilterSelect = styled(Select)(() => ({
  minWidth: '150px',
}));
