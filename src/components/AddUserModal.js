import React, { useState } from "react";
import axios from "axios";

import "./AddUserModal.css";

function AddUserModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", { username, email });
      setUsername("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-user-modal">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit-button">Add User</button>
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

export default AddUserModal;
