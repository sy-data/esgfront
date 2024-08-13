import { getCookie, setCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";

// 로그인 함수
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
      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
        setCookie("token", data.jwt);
        return data.user;
      } else if (data.error) {
        alert(`status : ${data.error.status}\n${data.error.message}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const getFetchOptions = (method, body, requiredAuth) => {
  const token = getCookie("token");
  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
  }

  const headers = {
    ...((method === "POST" || method === "PUT") && {
      "Content-Type": "application/json",
    }),
    ...(requiredAuth && { Authorization: `Bearer ${token}` }),
  };

  return {
    method,
    headers,
    ...(method !== "GET" &&
      method !== "HEAD" &&
      body && { body: JSON.stringify(body) }),
  };
};

export async function esgFetch(
  url,
  method = "GET",
  body = {},
  requiredAuth = true
) {
  try {
    const res = await fetch(
      `${host}${url}`,
      getFetchOptions(method, body, requiredAuth)
    );
    return await res.json();
  } catch (error) {
    console.error(`API 요청중 오류 발생: ${url}`, error);
    throw error;
  }
}

// 파라미터 그룹 목록을 가져오는 함수
export const fetchParameterGroups = () =>
  esgFetch(`/v1/admin/parametergroup/group/all`);

// 특정 파라미터 그룹의 세부정보를 가져오는 함수
// export const fetchParameterGroupDetails = (groupId) =>
//   esgFetch(`/v1/admin/parameter/group/${groupId}`);

// 새로운 파라미터를 추가(등록)하는 함수
export const addParameter = (parameter) =>
  esgFetch(`/v1/admin/parametergroup/group`, "POST", parameter);

// 파라미터를 업데이트하는 함수
export const updateParameter = (groupId, parameter) =>
  esgFetch(`/v1/admin/parametergroup/group/${groupId}`, "PUT", parameter);

// 파라미터를 삭제하는 함수
export const deleteParameter = (groupId) =>
  esgFetch(`/v1/admin/parametergroup/group/${groupId}`, "DELETE");
