import React from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Box,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useGroupManagement } from "./useGroupManagement";

function CalcGroupMgmt() {
  const {
    groups,
    groupName,
    note,
    isEditMode,
    editGroupId,
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
    handleCreateGroup,
    handleUpdateGroup,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRowDoubleClick,
    handleKeyPress,
    handleAddNewGroup,
    clearForm,
    setOpenSnackbar,
    setOpenDeleteDialog,
    setOpenWarningDialog,
    handleConfirmDelete,
  } = useGroupManagement();

  return (
    <Container
      sx={{
        minWidth: "100rem",
        border: "2px solid #D8D8D8",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h5"
          sx={{
            color: "var(--Neutral-100, #000)",
            fontFamily: "Pretendard Variable",
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "-0.36px",
            marginTop: "1rem",
          }}
        >
          산정식 그룹 기본정보
        </Typography>
        <Box sx={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
          <Button
            variant="contained"
            onClick={handleAddNewGroup}
            style={{
              height: "40px",
              width: "7rem",
              marginRight: "1rem",
              borderRadius: "8px",
              background: "var(--Primary, #00CD9B)",
              color: "var(--Gray-fff, #FFF)",
              textAlign: "center",
              fontFamily: "Pretendard Variable",
              fontWeight: 700,
              letterSpacing: "-0.28px",
            }}
          >
            그룹 추가
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDeleteDialog(true)}
            disabled={selected.length === 0}
            sx={{
              height: "40px",
              width: "7rem",
              marginRight: "1rem",
              borderRadius: "8px",
              background: "var(--Primary, #00CD9B)",
              fontWeight: 700,
              color: "var(--Gray-fff, #FFF)",
              textAlign: "center",
              fontFamily: "Pretendard Variable",
              letterSpacing: "-0.28px",
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          border: "2px solid #D8D8D8",
          borderRadius: "1rem",
          marginBottom: "-15rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < groups.length
                  }
                  checked={
                    groups.length > 0 && selected.length === groups.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>산정식 그룹 ID</TableCell>
              <TableCell>산정식그룹명</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddingNewGroup && (
              <TableRow>
                <TableCell />
                <TableCell>신규</TableCell>
                <TableCell>자동 생성됨</TableCell>
                <TableCell>
                  <TextField
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="그룹명을 입력해주세요"
                    fullWidth
                    autoFocus
                    onKeyDown={handleKeyPress}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="비고내용"
                    fullWidth
                    onKeyDown={handleKeyPress}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateGroup}
                  >
                    저장
                  </Button>
                  <Button
                    onClick={clearForm}
                    style={{ marginLeft: 8, marginRight: "-4rem" }}
                  >
                    취소
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {groups
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((group, index) => {
                const isItemSelected = selected.includes(group.groupId);
                const labelId = `enhanced-table-checkbox-${index}`;
                const no = groups.length - (page * rowsPerPage + index);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, group.groupId)}
                    onDoubleClick={() => handleRowDoubleClick(group)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={group.groupId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell>{no}</TableCell>
                    <TableCell>{group.groupId}</TableCell>
                    <TableCell>
                      {isEditMode && group.groupId === editGroupId ? (
                        <TextField
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          fullWidth
                          autoFocus
                          onKeyPress={handleKeyPress}
                        />
                      ) : (
                        group.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditMode && group.groupId === editGroupId ? (
                        <TextField
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          fullWidth
                          onKeyPress={handleKeyPress}
                        />
                      ) : (
                        group.note
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={groups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">그룹 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            선택하신 {selected.length}개의 데이터를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClick={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openWarningDialog}
        onClose={() => setOpenWarningDialog(false)}
        aria-labelledby="warning-dialog-title"
        aria-describedby="warning-dialog-description"
      >
        <DialogTitle id="warning-dialog-title">입력 오류</DialogTitle>
        <DialogContent>
          <DialogContentText id="warning-dialog-description">
            산정식 그룹명을 입력해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWarningDialog(false)} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CalcGroupMgmt;
