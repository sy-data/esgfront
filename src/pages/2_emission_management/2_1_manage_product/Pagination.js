import { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';
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

const Pagination = (props, ref) => {
    const [ currentPage, setCurrentPage ] = useState(0);

    // 현재 페이지 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, []);

    // 페이지 변경 시 table에 표시할 데이터 변경
    useEffect(() => {
        props.setRows(props.data.slice((currentPage - 1) * props.pageSize, currentPage * props.pageSize));
    }, [currentPage, props.data]);

    // 부모 컴포넌트에서 페이지 변경 함수 호출 가능하도록 설정
    useImperativeHandle(ref, () => ({
        currentPageNum: currentPage,
        changePage: (page) => setCurrentPage(page)
    }));
    
    // 데이터 개수에 따라 페이지 개수 계산
    const totalPageNum = useMemo(() => {
        return Math.ceil(props.data.length / props.pageSize);
    }, [props.data]);

    return (
        props.data.length > props.pageSize && 
        <PaginationContainer>
            <NonStyeldButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</NonStyeldButton>
            {Array.from({ length: totalPageNum}, (_, index) => (
                <NonStyeldButton key={index} onClick={() => setCurrentPage(index + 1)}>
                    {index + 1 === currentPage ? <b>{index + 1}</b> : index + 1}
                </NonStyeldButton>
            ))}
            <NonStyeldButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPageNum}>&gt;</NonStyeldButton>
        </PaginationContainer>
    )
}
export default forwardRef(Pagination);
