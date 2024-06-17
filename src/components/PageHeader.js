import { Avatar, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeCookie, useAuth } from "../States/storage/Cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStateAtom } from "../States/auth/auth";
import { headerTitleAtom } from "../States/header/Title";
import title from "../assets/images/title.svg"
import user_icon from "../assets/images/user_icon.svg"


const HeaderContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  height: "80px",
  padding: 0, margin: 0,
  backgroundColor: "#FFFFFF",
}));

const HeaderItem = styled("div")(() => ({
  padding: "10px 20px",
}));

const PageHeader = () => {
  const navigate = useNavigate();
  const isLogin = useAuth(); // useAuth 훅을 호출하여 로그인 상태를 확인합니다.
  const setUserState = useSetRecoilState(userStateAtom);
  const userState = useRecoilValue(userStateAtom);
  const headerTitle = useRecoilValue(headerTitleAtom);

  console.log(userState);
  const onLoginOut = () => {
    removeCookie("token");
    setUserState(null); // Recoil 상태를 초기화
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '236px', height: '80px' }}>
        <img src={title} alt="E-Scope" style={{width: '116px', height: '18px'}} />
      </Box>
      <Box style={{flexGrow: 1, padding: '22px', fontWeight: 700, fontSize: '24px', color: '#111111'}}>
        {headerTitle}
      </Box>
      {isLogin ? (
        <>
          <Avatar alt="info" src={user_icon} style={{width: '36px', height: '36px',cursor: 'pointer', marginRight: '24px'}} />
        </>
      ) : (
        <>
          <HeaderItem style={{ cursor: 'pointer' }} onClick={() => navigate("/signup")}>회원가입</HeaderItem>
          <div style={{ width: "10px", textAlign: "center" }}>|</div>
          <HeaderItem
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </HeaderItem>
        </>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;
