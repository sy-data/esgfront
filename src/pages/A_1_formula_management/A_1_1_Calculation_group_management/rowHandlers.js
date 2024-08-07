export const handleRowSelectionModelChange = (
  rowIds,
  editRowId,
  setSelectedRow
) => {
  const isEditRow = rowIds[0] === editRowId;

  if (!isEditRow) {
    setSelectedRow(rowIds);
  }
};

export const handleRowDoubleClick = (
  params,
  setEditRowId,
  setEditingDescriptions,
  setEditingGroupNames
) => {
  setEditRowId(params.row.id);
  setEditingDescriptions((prevState) => ({
    ...prevState,
    [params.row.id]: params.row.description || "",
  }));
  setEditingGroupNames((prevState) => ({
    ...prevState,
    [params.row.id]: params.row.groupName || "",
  }));
};
