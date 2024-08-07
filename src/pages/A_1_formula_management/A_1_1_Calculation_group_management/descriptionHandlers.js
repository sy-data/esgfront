import debounce from "lodash/debounce";

export const handleDescriptionChange = (id, value, setEditingDescriptions) => {
  debouncedHandleDescriptionChange(id, value, setEditingDescriptions);
};

const debouncedHandleDescriptionChange = debounce(
  (id, value, setEditingDescriptions) => {
    setEditingDescriptions((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  },
  300
);

export const handleDescriptionBlur = (
  id,
  setData,
  editingDescriptions,
  setEditingDescriptions,
  handleSnackbarOpen
) => {
  setData((prevState) =>
    prevState.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          description: editingDescriptions[id] || row.description,
        };
      }
      return row;
    })
  );
  setEditingDescriptions((prevState) => {
    const newState = { ...prevState };
    delete newState[id];
    return newState;
  });
  handleSnackbarOpen();
};

export const handleDescriptionKeyPress = (
  id,
  event,
  setEditRowId,
  setData,
  editingDescriptions,
  setEditingDescriptions,
  handleSnackbarOpen
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleDescriptionBlur(
      id,
      setData,
      editingDescriptions,
      setEditingDescriptions,
      handleSnackbarOpen
    );
    setEditRowId(null);
  } else if (event.key === " ") {
    event.stopPropagation();
  }
};
