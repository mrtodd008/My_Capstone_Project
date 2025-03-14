import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, Add, Visibility } from "@mui/icons-material";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../Services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    fullName: "",
    djName: "",
    phoneNumber: "",
    address: "",
    role: "user",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleOpenDialog = (
    mode,
    user = {
      id: null,
      fullName: "",
      djName: "",
      phoneNumber: "",
      address: "",
      role: "user",
    }
  ) => {
    setDialogMode(mode);
    setSelectedUser({ ...user });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleInputChange function removed as it is not used

  const handleSaveUser = async () => {
    try {
      if (dialogMode === "add") {
        await createUser(selectedUser);
      } else if (dialogMode === "edit") {
        await updateUser(selectedUser.id, selectedUser);
      }
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog("add")}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>DJ Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.djName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog("view", user)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog("edit", user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add User" : "Edit User"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={selectedUser.fullName}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, fullName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="DJ Name"
            type="text"
            fullWidth
            value={selectedUser.djName}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, djName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={selectedUser.phoneNumber}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={selectedUser.address}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, address: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserManagement;
