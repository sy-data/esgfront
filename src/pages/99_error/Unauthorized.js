import { useState, useEffect } from 'react';
import { 
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Background, Overlay } from './Styles';

const Unauthorized = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count <= 0) {
            navigate('/login');
        } else {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count]);

    return (
        <Background>
            <Overlay>
                <Typography
                    sx={{fontWeight: 'bold', fontSize: '1.8rem'}}
                >
                    로그인이 필요합니다.
                </Typography>
                <Typography 
                    variant="subtitle1"
                    sx={{textAlign: 'center'}}
                >
                    로그인이 필요한 페이지입니다.<br />
                    로그인 페이지로 이동하여 로그인 후 이용해 주세요.
                </Typography>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
                    {count}초 후 로그인 페이지로 이동합니다.
                </Typography>
                <Button 
                    variant="contained" 
                    href="/login" 
                    sx={{width: '80%'}}
                >
                    로그인 페이지로 가기
                </Button>
            </Overlay>
        </Background>
    );
}

export default Unauthorized;
