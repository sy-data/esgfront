import { getCookie, setCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";

// 반복되는 API 응답 처리 로직을 별도의 함수로 분리하여 중복 코드를 줄임
async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    console.error(`Error: ${errorData.message}`);
    return null;
  }
}

// API 호출 실패 시 재시도 로직을 추가하여 네트워크 문제를 대비함
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return await handleResponse(response);
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}

// 기본 옵션을 설정하여 코드 중복을 줄이고, 필요한 경우 재시도 로직을 추가
export function esgFetch(url, method = "GET", body = [], requiredAuth = true) {
  const token = getCookie("token");

  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
  }

  const options = {
    method: method,
    headers: {
      ...((method === "POST" || method === "PUT") && {
        "Content-Type": "application/json",
      }),
      ...(requiredAuth && { Authorization: `Bearer ${token}` }),
    },
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
  };

  return fetchWithRetry(`${host}${url}`, options);
}

// 로그인 함수의 예외 처리와 에러 메시지를 사용자에게 더 나은 방식으로 전달
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
    const data = await handleResponse(res);

    if (data && data.jwt) {
      localStorage.setItem("token", data.jwt);
      setCookie("token", data.jwt);
      return data.user;
    } else if (data && data.error) {
      alert(`Status: ${data.error.status}\n${data.error.message}`);
    }
  } catch (error) {
    console.log(error);
    alert("예상치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
  }
}

// 모든 API 호출 함수에 공통 응답 처리 로직 적용
export async function fetchMenuTree() {
  const url = `/v1admin/calc/menu-tree`;
  return await esgFetch(url);
}

export async function fetchChangeHistory(categoryId) {
  const url = `/v1/admin/calc/change-history/${categoryId}`;
  return await esgFetch(url);
}

export async function fetchCalculationHistory(categoryId) {
  const url = `/v1/admin/calc/calculation-history/${categoryId}`;
  return await esgFetch(url);
}
