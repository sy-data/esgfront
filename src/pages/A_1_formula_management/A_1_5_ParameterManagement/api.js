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
      if ("jwt" in data) {
        // 응답에 JWT가 포함된 경우
        localStorage.setItem("token", data["jwt"]); // JWT를 localStorage에 저장
        setCookie("token", data["jwt"]); // JWT를 쿠키에 저장
        return data.user; // 사용자 정보를 반환
      } else if ("error" in data) {
        // 에러가 포함된 경우
        alert(`status : ${data.error.status}\n${data.error.message}`); // 에러 메시지를 알림으로 표시
      }
    }
  } catch (error) {
    console.log(error); // 에러를 콘솔에 출력
  }
}

// API 요청을 수행하는 함수
export function esgFetch(url, method = "GET", body = {}, requiredAuth = true) {
  const token = getCookie("token"); // 쿠키에서 토큰을 가져옴

  // 인증이 필요한 경우 토큰이 없으면 로그인 페이지로 리디렉션
  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
  }

  return fetch(`${host}${url}`, {
    method: method,
    headers: {
      ...((method === "POST" || method === "PUT") && {
        "Content-Type": "application/json",
      }), // POST 또는 PUT 요청인 경우 Content-Type 헤더 설정
      ...(requiredAuth && { Authorization: `Bearer ${token}` }), // 인증이 필요한 경우 Authorization 헤더에 토큰 추가
    },
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }), // body가 비어있지 않은 경우 JSON으로 변환하여 추가
  });
}

// 파라미터 그룹 목록을 가져오는 함수
export const fetchParameterGroups = async () => {
  try {
    const res = await esgFetch(`/v1/admin/parameter/list`);
    if (!res.ok) throw new Error("파라미터 그룹을 가져오지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error("파라미터 그룹을 가져오는 중에 오류가 발생했습니다.", error);
    return [];
  }
};

// 특정 파라미터 그룹의 세부정보를 가져오는 비동기 함수
export const fetchParameterGroupDetails = async (groupId) => {
  try {
    const res = await esgFetch(`/v1/admin/parameter/info/${groupId}`);
    if (!res.ok) throw Error("파라미터 그룹 세부정보를 가져오지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error(
      "파라미터 그룹 세부정보를 가져오는 중에 오류가 발생했습니다.",
      error
    );
    return [];
  }
};

// 파라미터를 검색하는 함수
export const searchParameters = async (searchTerm) => {
  try {
    const res = await esgFetch(`/v1/admin/parameter/search`, "POST", {
      searchTerm,
    });
    if (!res.ok) throw Error("파라미터를 검색하지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error("파라미터를 검색하는 중에 오류가 발생했습니다.", error);
    return [];
  }
};

// 새로운 파라미터를 추가하는 함수
export const addParameter = async (parameter) => {
  try {
    const res = await esgFetch(`/v1/admin/parameter/add`, "POST", parameter);
    if (!res.ok) throw Error("파라미터를 추가하지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error("파라미터를 추가하는 중에 오류가 발생했습니다.", error);
    return null;
  }
};

// 파라미터를 업데이트 하는 함수
export const updateParameter = async (parameter) => {
  try {
    const res = await esgFetch(
      `/v1/admin/parameter/update/${parameter.id}`,
      "PUT",
      parameter
    );
    if (!res.ok) throw new Error("파라미터를 업데이트하지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error("파라미터를 업데이트하는 중에 오류가 발생했습니다.", error);
    return null;
  }
};

// 파라미터를 삭제하는 함수
export const deleteParameter = async (parameterId) => {
  try {
    const res = await esgFetch(
      `/v1/admin/parameter/delete/${parameterId}`,
      "DELETE"
    );
    if (!res.ok) throw new Error("파라미터를 삭제하지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error("파라미터를 삭제하는 중에 오류가 발생했습니다.", error);
    return null;
  }
};
