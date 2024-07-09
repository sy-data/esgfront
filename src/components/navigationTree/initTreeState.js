export const initTreeState = menu => {
  const buildState = (items, state={}) => {
    items.forEach(item => {
      state[item.id] = false;
      if(item.children) buildState(item.children, state);
    });
    return state;
  };
  return buildState(menu);
}
