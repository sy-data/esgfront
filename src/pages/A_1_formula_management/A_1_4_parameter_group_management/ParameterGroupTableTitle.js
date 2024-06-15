import React from "react";
import MenuTitle from "../../../components/MenuTitle";
import {Button, styled} from "@mui/material";


const TitleButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const ButtonContainer = styled('div')({
    display: 'flex',
});


const ParameterGroupTableTitle = () => {
    return (
        <TitleButtonContainer>
            <MenuTitle title={"파라미터 그룹 목록"} />
            <ButtonContainer>
                <Button>그룹 추가</Button>
                <Button>삭제</Button>
            </ButtonContainer>
        </TitleButtonContainer>
    )
};

export default ParameterGroupTableTitle;
