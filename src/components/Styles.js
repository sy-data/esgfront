import { styled } from "@mui/material";


export const MasterLayout = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%', height: '100%'
}));

export const MainContent = styled('div')(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

export const ContentWithTitie = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}))
