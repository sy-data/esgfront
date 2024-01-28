import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  options = {
    path: "/",
    maxAge: 60 * 60 * 3,
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
