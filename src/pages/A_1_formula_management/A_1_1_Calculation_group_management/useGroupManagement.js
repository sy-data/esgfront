import { useState, useEffect } from "react";
import { esgFetch } from "./FetchWrapper";

const API_URL = "/v1/admin/calc/group";

export const useGroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [note, setNote] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddingNewGroup, setIsAddingNewGroup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await esgFetch(`${API_URL}/all`, "GET");
      const sortedGroups = data.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setGroups(sortedGroups);
    } catch (error) {
      console.error("그룹을 로드하지 못했습니다.:", error);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setOpenWarningDialog(true);
      return;
    }
    try {
      const adminId = "test";
      const parentGroupId = "";

      const response = await esgFetch(`${API_URL}`, "POST", {
        adminId,
        groupName,
        parentGroupId: parseInt(parentGroupId),
        note,
      });

      if (response.success) {
        fetchGroups();
        clearForm();
        setIsAddingNewGroup(false);
        setSnackbarMessage("그룹이 추가되었습니다.");
        setOpenSnackbar(true);
      } else {
        console.error("그룹을 추가하지 못했습니다.:", response.message);
      }
    } catch (error) {
      console.error("그룹을 추가하는 중 오류가 발생했습니다.:", error);
    }
  };

  const handleUpdateGroup = async () => {
    if (!groupName.trim()) {
      setOpenWarningDialog(true);
      return;
    }
    try {
      const adminId = "test";

      const response = await esgFetch(`${API_URL}/${editGroupId}`, "PUT", {
        adminId,
        groupName,
        note,
      });

      if (response.success) {
        fetchGroups();
        clearForm();
        setIsEditMode(false);
        setSnackbarMessage("그룹이 업데이트되었습니다.");
        setOpenSnackbar(true);
      } else {
        console.error("그룹 업데이트 실패", response.message);
      }
    } catch (error) {
      console.error("그룹을 업데이트하는 중 오류가 발생했습니다.:", error);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      const response = await esgFetch(`${API_URL}/${id}`, "DELETE");
      if (response.success) {
        fetchGroups();
        setSnackbarMessage("그룹이 삭제되었습니다.");
        setOpenSnackbar(true);
      } else {
        console.error("그룹을 삭제하지 못했습니다.:", response.message);
      }
    } catch (error) {
      console.error("그룹을 삭제하는 중 오류가 발생했습니다.:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) => esgFetch(`${API_URL}/${id}`, "DELETE"))
      );
      fetchGroups();
      setSelected([]);
      setSnackbarMessage(`${selected.length}개의 데이터가 삭제되었습니다.`);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("데이터를 삭제하지 못했습니다.", error);
    }
  };

  const clearForm = () => {
    setGroupName("");
    setNote("");
    setIsEditMode(false);
    setEditGroupId(null);
    setIsAddingNewGroup(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = groups.map((n) => n.groupId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowDoubleClick = (group) => {
    setGroupName(group.name);
    setNote(group.note || "");
    setEditGroupId(group.groupId);
    setIsEditMode(true);
    setIsAddingNewGroup(false);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (isEditMode) {
        await handleUpdateGroup();
      } else {
        await handleCreateGroup();
      }
    }
  };

  const handleAddNewGroup = () => {
    clearForm();
    setIsAddingNewGroup(true);
  };

  const handleConfirmDelete = () => {
    handleBulkDelete();
    setOpenDeleteDialog(false);
  };

  return {
    groups,
    groupName,
    note,
    isEditMode,
    selected,
    page,
    rowsPerPage,
    isAddingNewGroup,
    openSnackbar,
    snackbarMessage,
    openDeleteDialog,
    openWarningDialog,
    setGroupName,
    setNote,
    setIsEditMode,
    setSelected,
    setPage,
    setRowsPerPage,
    setIsAddingNewGroup,
    setOpenSnackbar,
    setOpenDeleteDialog,
    setOpenWarningDialog,
    fetchGroups,
    handleCreateGroup,
    handleUpdateGroup,
    handleDeleteGroup,
    handleBulkDelete,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRowDoubleClick,
    handleKeyPress,
    handleAddNewGroup,
    clearForm,
    handleConfirmDelete,
    editGroupId,
    setEditGroupId,
  };
};
