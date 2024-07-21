import { esgFetch } from "../../../components/FetchWrapper";

// 사용자의 모든 매개변수 그룹을 가져옵니다.
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

// 특정 매개변수 그룹의 세부정보를 가져옵니다.
export const fetchParameterGroupDetails = async (groupId) => {
  try {
    const res = await esgFetch(`/admin/parameter_groups/${groupId}`);
    if (!res.ok)
      throw new Error("매개변수 그룹 세부정보를 가져오지 못했습니다.");
    return await res.json();
  } catch (error) {
    console.error(
      "매개변수 그룹 세부정보를 가져오는 중에 오류가 발생했습니다.",
      error
    );
    return [];
  }
};
