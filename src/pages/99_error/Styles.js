import { styled } from '@mui/material';

export const Background = styled('div')(() => ({
    backgroundColor: '#AAAAAA',
    width: '100%',
    height: '100vh',
}));

export const Overlay = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '65px',
    position: 'absolute',
    width: 'calc(30% - 100px)',
    height: 'calc(65% - 200px)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    padding: '100px 50px'
}));