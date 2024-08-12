import { getCookie, setCookie } from "../../../States/storage/Cookie";

// 호스트 URL 설정 (환경 변수에서 가져오거나 기본값으로 빈 문자열 설정)
const host = process.env.REACT_APP_PROD_API_ENDPOINT || "";

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
        alert(`Status: ${data.error.status}\n${data.error.message}`);
      }
    } else {
      const error = await res.json();
      alert(`Login failed: ${error.message}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again later.");
  }
}

// API 요청을 수행하는 함수
export function esgFetch(url, method = "GET", body = {}, requiredAuth = true) {
  const token = getCookie("token");

  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
    return; // 인증이 없으면 함수 종료
  }

  const options = {
    method,
    headers: {
      ...((method === "POST" || method === "PUT") && {
        "Content-Type": "application/json",
      }),
      ...(requiredAuth && { Authorization: `Bearer ${token}` }),
    },
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
  };

  console.log(`Request to ${url} with options:`, options); // 요청 옵션 로그 출력

  return fetch(`${host}${url}`, options).catch((error) => {
    console.error("Fetch error:", error);
    alert("An error occurred while fetching data. Please try again later.");
  });
}

// 유저의 모든 산정식 그룹을 페이지네이션을 사용하여 가져오는 함수
export async function fetchAllUserFormulaGroups(adminId, userId) {
  let allData = [];
  let page = 1;
  let size = 10; // 페이지 당 불러올 데이터 수
  let moreData = true;

  while (moreData) {
    const url = `/v1/admin/calc/group/filter?page=${page}&size=${size}`;
    const body = { adminId };

    console.log(`Fetching data from ${url} with body:`, body); // 요청 본문 로그 출력

    const response = await esgFetch(url, "POST", body);

    if (response && response.ok) {
      const data = await response.json();
      console.log("API response data:", data); // 응답 데이터 로그 출력

      if (data.data && data.data.length > 0) {
        allData = allData.concat(data.data);
        if (data.data.length < size) {
          moreData = false;
        } else {
          page++;
        }
      } else {
        moreData = false;
      }
    } else {
      console.error("Failed to fetch formula groups");
      return null;
    }
  }

  return allData;
}

// 산정식 그룹을 등록하는 함수
export async function createFormulaGroup(adminId, groupId, name, note) {
  const url = `/v1/admin/calc/group`;
  const body = { adminId, groupId, name, note };

  console.log("Sending request to:", url);
  console.log("Request body:", body);

  const response = await esgFetch(url, "POST", body);

  if (response && response.ok) {
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
  const url = `/v1/admin/calc/group/${id}`;
  const body = { groupId, name, note };

  console.log("Updating formula group with body:", body);

  const response = await esgFetch(url, "PUT", body);

  if (response && response.ok) {
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
  const url = `/v1/admin/calc/group/${id}`;

  console.log("Deleting formula group with id:", id);

  const response = await esgFetch(url, "DELETE");

  if (response && response.ok) {
    const data = await response.json();
    console.log("삭제완료");
    return data;
  } else {
    console.error("Failed to delete formula group");
    return null;
  }
}
