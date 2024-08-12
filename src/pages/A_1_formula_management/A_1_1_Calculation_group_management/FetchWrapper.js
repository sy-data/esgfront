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
    alert(
      "데이터를 가져오는 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요."
    );
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
    alert(
      "데이터를 가져오는 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요."
    );
  });
}

// 유저의 모든 산정식 그룹을 페이지네이션을 사용하여 가져오는 함수
export async function fetchAllUserFormulaGroups(adminId, userId) {
  let allData = []; // 모든 데이터를 저장할 배열을 초기화
  let page = 1; // 초기 페이지 번호를 설정
  let size = 10; // 페이지 당 불러올 데이터 수
  let moreData = true; // 더 많은 데이터를 불러올 수 있는지 여부를 나타내는 플래그를 초기화

  // 더 많은 데이터가 있는 동안 반복
  while (moreData) {
    // 현재 페이지와 크기를 포함한 URL을 설정
    const url = `/v1/admin/calc/group/filter?page=${page}&size=${size}`;
    const body = { adminId }; // 요청 본문에 adminId를 포함
    const response = await esgFetch(url, "POST", body);

    // 응답이 성공적인 경우
    if (response && response.ok) {
      const data = await response.json();
      console.log("API response data:", data); // 응답 데이터 로그 출력

      // 응답 데이터에 data 필드가 있고, 그 길이가 0보다 큰 경우
      if (data.data && data.data.length > 0) {
        allData = allData.concat(data.data); // 모든 데이터 배열에 응답 데이터를 추가
        // 응답 데이터 길이가 요청한 크기보다 작으면 더 이상 데이터가 없는 것으로 간주
        if (data.data.length < size) {
          moreData = false;
        } else {
          page++;
        }
      } else {
        moreData = false; // 응답 데이터가 없으면 더 이상 데이터가 없는 것으로 간주
      }
    } else {
      console.error("수식 그룹을 가져오지 못했습니다.");
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
