import { getCookie, setCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";

// 로그인 함수
export async function loginDev(payload) {
  try {
    // 사용자 인증을 위해 POST 요청을 보냄
    const res = await fetch(`${host}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: payload.id, // 사용자 ID
        password: payload.password, // 사용자 비밀번호
      }),
    });

    // 응답이 성공적인 경우
    if (res.ok) {
      const data = await res.json(); // 응답을 JSON으로 변환
      if (data.jwt) {
        // 응답에 JWT가 포함된 경우
        localStorage.setItem("token", data.jwt); // JWT를 localStorage에 저장
        setCookie("token", data.jwt); // JWT를 쿠키에 저장
        return data.user; // 사용자 정보를 반환
      } else if (data.error) {
        // 에러가 포함된 경우
        alert(`status : ${data.error.status}\n${data.error.message}`); // 에러 메시지를 알림으로 표시
      }
    }
  } catch (error) {
    console.log(error); // 에러를 콘솔에 출력
  }
}

// 공통 fetch 옵션 설정 함수
const getFetchOptions = (method, body, requiredAuth) => {
  const token = getCookie("token");
  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
  }

  const headers = {
    ...((method === "POST" || method === "PUT") && {
      "Content-Type": "apllication/json",
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

// API 요청을 수행하는 함수
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
    // if (!res.ok) throw new Error("요청에 실패했습니다."); // api 완성되지 않아서 임시 주석처리
    return await res.json();
  } catch (error) {
    console.error(`API 요청중 오류 발생: ${url}`, error);
    throw error;
  }
}

// 파라미터 그룹 목록을 가져오는 함수
export const fetchParameterGroups = () => esgFetch(`/v1/admin/parameter/list`);

// 특정 파라미터 그룹의 세부정보를 가져오는 함수
export const fetchParameterGroupDetails = (groupId) =>
  esgFetch(`/v1/admin/parameter/info/${groupId}`);

// 파라미터를 검색하는 함수
export const searchParameters = (searchTerm) =>
  esgFetch(`/v1/admin/parameter/search`, "POST", { searchTerm });

// 새로운 파라미터를 추가하는 함수
export const addParameter = (parameter) =>
  esgFetch(`/v1/admin/parameter/add`, "POST", parameter);

// 파라미터를 업데이트하는 함수
export const updateParameter = (parameter) =>
  esgFetch(`/v1/admin/parameter/update/${parameter.id}`, "PUT", parameter);

// 파라미터를 삭제하는 함수
export const deleteParameter = (parameterId) =>
  esgFetch(`/v1/admin/parameter/delete/${parameterId}`, "DELETE");
