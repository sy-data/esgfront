import { esgFetch } from "../../../components/FetchWrapper";

export const fetchParameterGroups = async (userId) => {
  try {
    const res = await esgFetch(`/admin/formula_groups/${userId}`);

    if (!res.ok) throw new Error("매개변수 그룹을 가져오지 못했습니다.");

    return await res.json();
  } catch (error) {
    console.error("매개변수 그룹을 가져오는 중에 오류가 발생했습니다.", error);

    return [];
  }
};

// 특정 매개변수 그룹의 세부정보를 가져오는 비동기 함수
export const fetchParameterGroupDetails = async (groupId) => {
  try {
    // esgFetch를 사용하여 서버에서 특정 매개변수 그룹의 세부정보를 가져옴
    const res = await esgFetch(`/admin/parameter_groups/${groupId}`);

    // 요청이 성공하지 않은 경우 에러를 발생
    if (!res.ok)
      throw new Error("매개변수 그룹 세부정보를 가져오지 못했습니다.");

    // 요청이 성공한 경우, 응답을 JSON 형식으로 변환하여 반환
    return await res.json();
  } catch (error) {
    // 요청 중 에러가 발생하면 콘솔에 에러 메시지를 출력
    console.error(
      "매개변수 그룹 세부정보를 가져오는 중에 오류가 발생했습니다.",
      error
    );

    // 에러 발생 시 빈 배열을 반환
    return [];
  }
};
