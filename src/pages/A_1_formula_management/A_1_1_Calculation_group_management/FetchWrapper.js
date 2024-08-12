import { getCookie, setCookie } from "../../../States/storage/Cookie";

// 호스트 URL 설정 (환경 변수에서 가져오거나 기본값으로 빈 문자열 설정)
const host = process.env.REACT_APP_PROD_API_ENDPOINT || "";

// 공통 fetch 옵션을 설정하는 함수
function getFetchOptions(method, body, requiredAuth) {
  const token = getCookie("token");

  if (requiredAuth && !token) {
    window.location.href = "/unauthorized";
    return null;
  }

  const headers = {
    ...((method === "POST" || method === "PUT") && {
      "Content-Type": "application/json",
    }),
    ...(requiredAuth && { Authorization: `Bearer${token}` }),
  };

  return {
    method,
    headers,
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
  };
}

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

    if (!res.ok) {
      const error = await res.json();
      alert(`로그인 실패: ${error.message}`);
      return null;
    }

    const data = await res.json();
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setCookie("token", data.jwt);
      return data.user;
    } else {
      alert(`Status: ${data.error.status}\n${data.error.message}`);
      return null;
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    alert(
      "데이터를 가져오는 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요."
    );
    return null;
  }
}

// API 요청을 수행하는 함수
export function esgFetch(url, method = "GET", body = {}, requiredAuth = true) {
  const options = getFetchOptions(method, body, requiredAuth);
  if (!options) return;
  console.log(`옵션이 포함된 ${url}에 요청`, options);

  return fetch(`${host}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .catch((error) => {
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

    try {
      const response = await esgFetch(url, "POST", body);
      if (response.data && response.data.length > 0) {
        allData = allData.concat(response.data);
        if (response.data.length < size) {
          moreData = false;
        } else {
          page++;
        }
      } else {
        moreData = false;
      }
    } catch (error) {
      console.error("수식 그룹을 가져오지 못했습니다.:", error);
      return null;
    }
  }

  return allData;
}

// 산정식 그룹을 등록하는 함수
export async function createFormulaGroup(adminId, groupId, name, note) {
  const url = `/v1/admin/calc/group`;
  const body = { adminId, groupId, name, note };

  console.log("요청을 보내는 중:", url);
  console.log("요청 본문:", body);

  try {
    const response = await esgFetch(url, "POST", body);
    console.log("Success response:", response);
    return response;
  } catch (error) {
    console.error("수식 그룹을 생성하지 못했습니다.", error);
    return null;
  }
}

// 산정식 그룹을 수정하는 함수
export async function updateFormulaGroup(id, groupId, name, note) {
  const url = `/v1/admin/calc/group/${id}`;
  const body = { groupId, name, note };

  console.log("본문으로 수식 그룹 업데이트 중:", body);

  try {
    const response = await esgFetch(url, "PUT", body);
    console.log("수정완료");
    return response;
  } catch (error) {
    console.error("수식 그룹을 업데이트하지 못했습니다.");
    return null;
  }
}

// 산정식 그룹을 삭제하는 함수
export async function deleteFormulaGroup(id) {
  const url = `/v1/admin/calc/group/${id}`;

  console.log("ID가 있는 수식 그룹 삭제 중:", id);

  try {
    const response = await esgFetch(url, "DELETE");
    console.log("삭제완료");
    return response;
  } catch (error) {
    console.error("수식 그룹을 삭제하지 못했습니다.", error);
    return null;
  }
}
