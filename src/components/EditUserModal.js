import React, { useState, useEffect } from "react";
import axios from "axios";

import "./EditUserModal.css";

function EditUserModal({ isOpen, onClose, userId }) {
  const [user, setUser] = useState({});
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    if (isOpen && userId) {
      fetchUser(userId);
    }
  }, [isOpen, userId]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
      setEditedUsername(response.data.username);
      setEditedEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, {
        username: editedUsername,
        email: editedEmail,
      });
      onClose();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-user-modal">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <button className="submit-button">Save Changes</button>
        </form>
        <button
          className="close-button"
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default EditUserModal;
