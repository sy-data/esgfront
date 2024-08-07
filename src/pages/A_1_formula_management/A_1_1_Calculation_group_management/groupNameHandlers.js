import debounce from "lodash/debounce";

export const handleGroupNameChange = (id, value, setEditingGroupNames) => {
  debouncedHandleGroupNameChange(id, value, setEditingGroupNames);
};

const debouncedHandleGroupNameChange = debounce(
  (id, value, setEditingGroupNames) => {
    setEditingGroupNames((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  },
  300
);

export const handleGroupNameBlur = (
  id,
  setData,
  editingGroupNames,
  setEditingGroupNames,
  handleSnackbarOpen
) => {
  setData((prevState) =>
    prevState.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          groupName: editingGroupNames[id] || row.groupName,
        };
      }
      return row;
    })
  );
  setEditingGroupNames((prevState) => {
    const newState = { ...prevState };
    delete newState[id];
    return newState;
  });
  handleSnackbarOpen();
};

export const handleGroupNameKeyPress = (
  id,
  event,
  setEditRowId,
  setData,
  editingGroupNames,
  setEditingGroupNames,
  handleSnackbarOpen
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleGroupNameBlur(
      id,
      setData,
      editingGroupNames,
      setEditingGroupNames,
      handleSnackbarOpen
    );
    setEditRowId(null);
  } else if (event.key === " ") {
    event.stopPropagation();
  }
};
