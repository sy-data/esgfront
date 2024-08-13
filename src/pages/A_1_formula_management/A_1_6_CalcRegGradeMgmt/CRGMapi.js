import { getCookie } from "../../../States/storage/Cookie";

const host = process.env.REACT_APP_PROD_API_ENDPOINT || "http://localhost:3000";

// 공통 fetch 함수
const apiFetch = async (
  url,
  method = "GET",
  body = null,
  authRequired = true
) => {
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
  return response.json();
};

// 데이터 조회
export const fetchData = async () => {
  const data = await apiFetch("/v1/admin/calc/rating", "GET");
  return Array.isArray(data) ? data : []; // 배열인지 확인하여 반환
};

// 데이터 추가
export const addData = (newRow) =>
  apiFetch("/v1/admin/calc/rating", "POST", newRow);

// 데이터 삭제
export const deleteData = (id) =>
  apiFetch(`/v1/admin/calc/rating/${id}`, "DELETE");

// 데이터 수정
export const updateData = (id, updatedRow) =>
  apiFetch(`/v1/admin/calc/rating/${id}`, "PUT", updatedRow);
