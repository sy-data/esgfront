// 메뉴 아이템을 기반으로 초기 상태를 설정하는 함수
export const initTreeState = (menu) => {
  // 상태를 빌드하는 재귀 함수
  const buildState = (items, state = {}) => {
    items.forEach((item) => {
      state[item.id] = false; // 각 item의 id를 키로 하여 상태를 false로 설정
      if (item.children) buildState(item.children, state); // 자식이 있는 경우 재귀적으로 처리
    });
    return state;
  };
  return buildState(menu); // 주어진 메뉴를 사용하여 초기 상태를 빌드하고 반환
};
