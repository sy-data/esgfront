export const initTreeState = (menu) => {
  // initTreeState 함수 정의, menu를 인자로 받음
  const buildState = (items, state = {}) => {
    // 상태를 빌드하는 재귀 함수 정의, items와 초기 state를 인자로 받음
    items.forEach((item) => {
      // items 배열을 순회
      state[item.id] = false; // 각 item의 id를 키로 하여 상태를 false로 설정
      if (item.children) buildState(item.children, state); // item에 자식이 있으면 재귀적으로 자식들을 처리
    });
    return state;
  };
  return buildState(menu); // 주어진 menu를 사용하여 초기 상태를 빌드하고 반환
};
