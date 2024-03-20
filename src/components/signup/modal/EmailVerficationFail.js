import {
    styled,
    Typography,
    Button,
} from '@mui/material';

const ModalContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    width: '500px',
    height: '250px',
    backgroundColor: 'white',
    borderRadius: '10px',
}));

const ModalContents = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const EmailVerificationFailModal = ({setIsOpen}) => {
    return (
        <ModalContainer>
            <Typography variant="h5">인증번호 오류 안내</Typography>
            <ModalContents>
                <Typography variant="subtitle1">사용자인증에 실패하셨습니다.</Typography>
                <Typography variant="subtitle1">가입 인증 메일 확인 후 재시도 부탁드립니다.</Typography>
            </ModalContents>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(false)}
            >
                확인
            </Button>
            <Typography variant="h6">이메일 인증번호 재전송</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(false)}
            >
                인증번호 재전송
            </Button>
        </ModalContainer>
    )
}

export default EmailVerificationFailModal;