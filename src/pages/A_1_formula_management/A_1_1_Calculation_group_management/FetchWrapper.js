import { getCookie, setCookie } from "../../../States/storage/Cookie";

// 호스트 URL 설정 (환경 변수에서 가져오거나 기본값으로 빈 문자열 설정)
const host = process.env.REACT_APP_PROD_API_ENDPOINT
  ? process.env.REACT_APP_PROD_API_ENDPOINT
  : "연결안됨";

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

// 유저의 모든 산정식 그룹을 가져오는 함수
export async function fetchUserFormulaGroups(userId, page = 1, size = 10) {
  const url = `v1/admin/calc/group/all`; // 페이지와 크기를 쿼리 매개변수로 포함한 URL 생성
  const response = await esgFetch(url); // esgFetch 함수를 사용하여 API 요청 수행

  // 응답이 성공적인 경우
  if (response.ok) {
    const data = await response.json(); // 응답을 JSON으로 변환
    return data; // 데이터를 반환
  } else {
    console.error("Failed to fetch formula groups"); // 실패한 경우 콘솔에 에러 메시지 출력
    return null; // null 반환
  }
}

// 산정식 그룹을 등록하는 함수
export async function createFormulaGroup(groupId, name, note) {
  const url = `v1/admin/calc/group`;
  console.log("Sending request to:", url);
  console.log("Request body:", { groupId, name, note });

  const response = await esgFetch(url, "POST", { groupId, name, note });

  if (response.ok) {
    const data = await response.json();
    console.log("Success response:", data);
    return data;
  } else {
    const error = await response.json();
    console.error("Failed to create formula group", error);
    return null;
  }
}

// 산정식 그룹을 수정하는 함수
export async function updateFormulaGroup(id, groupId, name, note) {
  const url = `v1/admin/calc/group/${id}`;
  const response = await esgFetch(url, "PUT", { groupId, name, note });
  if (response.ok) {
    const data = await response.json();
    console.log("수정완료");
    return data;
  } else {
    console.error("Failed to update formula group");
    return null;
  }
}

// 산정식 그룹을 삭제하는 함수
export async function deleteFormulaGroup(id) {
  const url = `v1/admin/calc/group/${id}`;
  const response = await esgFetch(url, "DELETE");
  if (response.ok) {
    const data = await response.json();
    console.log("삭제완료");
    return data;
  } else {
    console.error("Failed to delete formula group");
    return null;
  }
}
