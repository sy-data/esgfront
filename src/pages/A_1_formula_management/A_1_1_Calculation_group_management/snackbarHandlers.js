export const handleSnackbarOpen = (setOpenSnackbar) => {
  setOpenSnackbar(true);
};

export const handleSnackbarClose = (event, reason, setOpenSnackbar) => {
  if (reason === "clickaway") {
    return;
  }
  setOpenSnackbar(false);
};
