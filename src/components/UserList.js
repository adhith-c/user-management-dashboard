import React, { useState, useEffect } from "react";
import axios from "axios";

import "./UserList.css";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleEditModalOpen = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleDeleteModalOpen = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setUserToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`/api/users/${userToDelete}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      handleDeleteModalClose();
    }
  };

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      <button
        className="add-button"
        onClick={handleAddModalOpen}>
        Add User
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditModalOpen(user._id)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteModalOpen(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        userId={selectedUserId}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
        userId={userToDelete}
      />
    </div>
  );
}

export default UserList;
