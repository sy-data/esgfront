import { Avatar, Box, styled } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { removeCookie, useAuth } from "../States/storage/Cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStateAtom } from "../States/auth/auth";
import { headerTitleAtom } from "../States/header/Title";
import title from "../assets/images/title.svg"
import user_icon from "../assets/images/user_icon.svg"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SvgIcon from "@mui/material/SvgIcon";


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

  const loc = useLocation();
  const onLoginOut = () => {
    removeCookie("token");
    setUserState({}); // Recoil 상태를 초기화
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '236px', height: '80px', borderRight: "1px solid #E5E5E5" }} onClick={() => navigate("/facility/workplace")}>
        <img src={title} alt="E-Scope" style={{width: '116px', height: '18px'}} />
      </Box>
      <div style={{display: "flex", flexGrow: 1, height: "100%", alignItems: "center", borderBottom: "1px solid #E5E5E5"}}>
        <Box style={{flexGrow: 1, padding: '22px', fontWeight: 700, fontSize: '24px', color: '#111111'}}>
          {headerTitle}
        </Box>
        {isLogin ? (
          <div style={{display: "flex", gap: "24px", marginRight: '50px', height: "100%", alignItems: "center"}}>
            <div style={{display: "flex", gap: "8px", fontSize:"14px", height: "100%", alignItems: "center"}}>
              <Avatar alt="info" src={user_icon} style={{width: '36px', height: '36px',cursor: 'pointer'}} />
              {"displayname" in userState && <div style={{display: "flex", gap: "3px", height: "100%", alignItems: "center"}}>
                <b>{userState.displayname}</b>님<ExpandMoreIcon />
              </div>}
            </div>
            <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="17.9999" cy="5.99844" r="3.6" fill="#FD5443"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5255 2.68805C13.7225 2.40085 12.869 2.25 11.9999 2.25C10.0108 2.25 8.10311 3.04018 6.69659 4.4467C5.29007 5.85322 4.49989 7.76088 4.49989 9.75C4.49989 13.0631 3.72551 15.5981 3.2052 16.4944C3.07233 16.7222 3.00189 16.9811 3.00099 17.2449C3.00008 17.5086 3.06874 17.768 3.20005 17.9967C3.33135 18.2255 3.52065 18.4156 3.74886 18.5478C3.97708 18.6801 4.23613 18.7498 4.49989 18.75H8.32583C8.49886 19.5967 8.95904 20.3577 9.62851 20.9042C10.298 21.4507 11.1357 21.7492 11.9999 21.7492C12.8641 21.7492 13.7018 21.4507 14.3713 20.9042C15.0407 20.3577 15.5009 19.5967 15.674 18.75H19.4999C19.7636 18.7496 20.0225 18.6798 20.2506 18.5475C20.4787 18.4151 20.6678 18.225 20.799 17.9963C20.9302 17.7676 20.9988 17.5083 20.9979 17.2446C20.9969 16.9809 20.9265 16.7222 20.7936 16.4944C20.3164 15.6723 19.6262 13.4707 19.5152 10.5559C19.0463 10.7118 18.5453 10.7973 18.0248 10.7999C18.1628 13.7175 18.8524 16.137 19.4999 17.25H4.49989C5.22176 16.0087 5.99989 13.1325 5.99989 9.75C5.99989 8.1587 6.63203 6.63258 7.75725 5.50736C8.88247 4.38214 10.4086 3.75 11.9999 3.75C12.5611 3.75 13.1142 3.82862 13.6445 3.97977C13.8668 3.50117 14.1658 3.06535 14.5255 2.68805ZM10.7013 19.8369C11.081 20.1055 11.5347 20.2499 11.9999 20.25C12.4651 20.2499 12.9187 20.1055 13.2985 19.8369C13.6783 19.5683 13.9655 19.1886 14.1205 18.75H9.87926C10.0343 19.1886 10.3215 19.5683 10.7013 19.8369Z" fill="#111111"/>
            </SvgIcon>
          </div>
        ) : (
          <div style={{display: "flex", gap: "8px", fontSize:"14px", height: "100%", alignItems: "center", marginRight: '100px'}}>
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
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};

export default PageHeader;
