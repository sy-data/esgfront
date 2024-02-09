import { Navigate } from "react-router-dom";
import { getCookie } from "../../States/storage/Cookie";

const Index = () => {
  const checkLogin = () => getCookie('token');
  
  return (
    <Navigate
      replace
      to={checkLogin() ? "/facility" : "/login"}
    />
  )
}

export default Index;
