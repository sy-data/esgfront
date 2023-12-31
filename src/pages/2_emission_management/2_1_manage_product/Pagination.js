import { useState, useEffect, useMemo  } from 'react';
import { styled } from '@mui/material';

const PaginationContainer = styled('div')({
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'self-end',
});

const NonStyeldButton = styled('button')({
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0px 5px',
    '&:disabled': {
        color: '#808080',
        cursor: 'default',
    },
});

const Pagination = (props) => {
    const [ currentPage, setCurrentPage ] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        props.setRows(props.data.slice((currentPage - 1) * props.pageSize, currentPage * props.pageSize));
    }, [currentPage]);
    
    const totalPageNum = useMemo(() => {
        return Math.ceil(props.data.length / props.pageSize);
    }, [props.data]);

    return (
        props.data.length > props.pageSize && 
        <PaginationContainer>
            <NonStyeldButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</NonStyeldButton>
            {Array.from({ length: totalPageNum}, (_, index) => (
                <NonStyeldButton key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</NonStyeldButton>
            ))}
            <NonStyeldButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPageNum}>&gt;</NonStyeldButton>
        </PaginationContainer>
    )
}
export default Pagination;
