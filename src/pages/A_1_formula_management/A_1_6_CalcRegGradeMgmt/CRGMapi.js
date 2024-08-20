import { getCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";
const API_ENDPOINT = "/v1/admin/calc/rank";

// 공통 fetch 함수
const apiFetch = async (
  url,
  method = "GET",
  body = null,
  authRequired = true
) => {
  try {
    const token = getCookie("token");
    const headers = {
      "Content-Type": "application/json",
      ...(authRequired && { Authorization: `Bearer ${token}` }),
    };
    const options = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };
    const response = await fetch(`${host}${url}`, options);

    // 응답이 JSON 형식인지 확인
    const isJson = response.headers
      .get(`'content-type`)
      ?.includes(`application/json`);

    if (!response.ok) {
      //HTTP 오류가 발생한 경우
      const errorMessage = isJson ? await response.json() : response.statusText;
      // throw new Error(errorMessage);
    }

    return isJson ? await response.json() : {};
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    // throw error; // 필요에 따라 에러를 다시 던질 수 있음
  }
};

// 데이터 조회
export const fetchData = async () => {
  const data = await apiFetch(`${API_ENDPOINT}/all`, "GET");
  return Array.isArray(data) ? data : []; // 배열인지 확인하여 반환
};

// 데이터 추가
export const addData = (newRow) => apiFetch(API_ENDPOINT, "POST", newRow);

// 데이터 삭제
export const deleteData = (id) => apiFetch(`${API_ENDPOINT}/${id}`, "DELETE");

// 데이터 수정
export const updateData = (id, updatedRow) =>
  apiFetch(`${API_ENDPOINT}/${id}`, "PUT", updatedRow);
