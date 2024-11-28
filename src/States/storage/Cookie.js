import { Cookies, useCookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { userStateAtom } from "../auth/auth";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  options = {
    path: "/",
    maxAge: 60 * 60 * 4,
    ...options,
  };
  cookies.set(name, value, options);
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, options) => {
  cookies.remove(name, options);
};

export const useAuth = () => {
  const userState = useRecoilValue(userStateAtom);
  return "expires_at" in userState && userState.expires_at > new Date().toISOString();
};
