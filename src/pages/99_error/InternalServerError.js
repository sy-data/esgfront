import { Typography } from '@mui/material';
import { Background, Overlay } from './Styles';

const InternalServerError = () => {
    
    return (
        <Background>
            <Overlay>
                <Typography
                    sx={{fontWeight: 'bold', fontSize: '1.8rem'}}
                >
                    일시적인 장애가 발생하였습니다.
                </Typography>
                <Typography 
                    variant="subtitle1"
                    sx={{textAlign: 'center'}}
                >
                    현재 서비스에 일시적인 장애가 발생하였습니다.<br />
                    장애 발생 원인 파악 및 필요한 조치에 <br/>
                    최선을 다하고 있사오니 양해 부탁드립니다.
                </Typography>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
                    서비스 이용에 불편을 드려 죄송합니다.
                </Typography>
            </Overlay>
        </Background>
    )
};

export default InternalServerError;