import React from "react";
import axios from "axios";

import "./DeleteUserModal.css";

function DeleteUserModal({ isOpen, onClose, onDelete, userId }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-user-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="button-container">
          <button
            className="cancel-button"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
