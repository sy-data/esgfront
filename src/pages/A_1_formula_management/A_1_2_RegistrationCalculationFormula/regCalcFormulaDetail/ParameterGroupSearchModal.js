import {Dialog, IconButton, styled} from "@mui/material";
import React from "react";
import {CloseIcon} from "./icon";

const ModalContainer = styled('div')({
  padding: 24,
});

const DialogTitle = styled('div')({
  width: '100%',
  textAlign: 'center',
  color: 'var(--Neutral-100, #000)',
  fontFamily: "Pretendard Variable",
  fontSize: 24,
  fontWeight: 700,
});

export const ParameterGroupSearchModal = ({isOpen, setIsOpen, setParameterGroup}) => {
  return (
    <Dialog open={isOpen} PaperProps={{
      style: {
        width: `calc(100% - 300px)`,
        height: `calc(100% - 200px)`,
        borderRadius: 8,
      }
    }}>
      <ModalContainer>
        <DialogTitle>파라미터 그룹 검색
          <IconButton onClick={() => setIsOpen(false)} sx={{position: "absolute", right: 14, top: 14}}>
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
      </ModalContainer>
    </Dialog>
  )
}
