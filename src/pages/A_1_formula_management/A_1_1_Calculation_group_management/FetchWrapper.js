import { getCookie, setCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";

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
    ...(requiredAuth && { Authorization: `Bearer ${token}` }),
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

// 유저의 모든 산정식 그룹을 가져오는 함수
export async function fetchAllUserFormulaGroups(adminId) {
  const url = `/v1/admin/calc/group/all`;

  try {
    const response = await esgFetch(url, "GET");
    if (response && response.data) {
      return response.data; // 서버에서 받은 전체 데이터를 반환
    } else {
      console.error("수식 그룹 데이터를 가져오는 중 오류:", response);
      return null;
    }
  } catch (error) {
    console.error("수식 그룹을 가져오는 중 오류가 발생했습니다.", error);
    return null;
  }
}

// 산정식 그룹을 등록하는 함수
export async function createFormulaGroup(
  adminId,
  groupId,
  groupName,
  parentGroupId,
  note
) {
  const url = `/v1/admin/calc/group`;
  const body = { adminId, groupId, groupName, parentGroupId, note };

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
export async function updateFormulaGroup(
  id,
  adminId,
  groupId,
  groupName,
  note
) {
  const url = `/v1/admin/calc/group/${id}`;
  const body = { adminId, groupId: parseInt(groupId, 10), groupName, note };

  console.log("본문으로 수식 그룹 업데이트 중:", body);

  try {
    const response = await esgFetch(url, "PUT", body);
    if (response && response.success) {
      console.log("수정완료", response);
      return response.data; // 서버에서 반환된 데이터를 리턴
    } else {
      console.error("수정 중 오류:", response);
      return null;
    }
  } catch (error) {
    console.error("수정 중 오류 발생:", error);
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
