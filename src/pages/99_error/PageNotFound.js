import { useState, useEffect } from 'react';
import { 
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Background, Overlay } from './Styles';

const PageNotFound = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count <= 0) {
            navigate('/');
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
                    요청하신 페이지를 찾지 못했습니다.
                </Typography>
                <Typography 
                    variant="subtitle1"
                    sx={{textAlign: 'center'}}
                >
                    페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
                    입력하신 주소를 다시 한 번 확인해 주세요
                </Typography>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
                    {count}초 후 홈으로 이동합니다.
                </Typography>
                <Button 
                    variant="contained" 
                    href="/" 
                    sx={{width: '80%'}}
                >
                    홈으로 가기
                </Button>
            </Overlay>
        </Background>
    );
}

export default PageNotFound;
