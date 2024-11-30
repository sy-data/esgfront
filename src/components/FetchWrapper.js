import { getCookie, setCookie } from "../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT ? process.env.REACT_APP_PROD_API_ENDPOINT : "";

export async function loginDev(payload) {
  try {
    const res = await fetch(`${host}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: payload.id,
        password: payload.password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if ("jwt" in data) {
        localStorage.setItem("token", data["jwt"]);
        setCookie("token", data["jwt"]);
        return data.user;
      } else if ("error" in data) {
        alert(`status : ${data.error.status}\n${data.error.message}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function esgFetch(url, method = "GET", body = {}, requiredAuth = true) {
  // const token = localStorage.getItem("token");
  // const token = getCookie("token");

  // if (requiredAuth && !token) {
  //   // alert("401 페이지로 이동 필요");
  //   window.location.href = "/unauthorized";
  // }
  return fetch(`${host}/api/v1${url}`, {
    method: method,
    credentials: "include",
    headers: {
      ...(method !== "GET" && { "Content-Type": "application/json" }),
      // ...(requiredAuth && { Authorization: `Bearer ${token}` }),
    },
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
  });
}

export async function esgLogin(id, pw) {
  const session = await esgFetch("/account/login-id", "POST", {provideruserid : id, password: pw}).then(res=>res.json());
  if("id" in session) {
    localStorage.setItem("__session", session.id);
    setCookie("__session", session.id);
    return session;
  }
  return null;
}
