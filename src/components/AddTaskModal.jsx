import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddTaskModal from "./AddTaskModal"; // Import modal component
import "./Header.css";

function Header({ onAddTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const navigate = useNavigate();

  return (
    <header>
      <h1>To-Do List App</h1>

      <div className="nav-buttons">
        <Link to="/" className="nav-button">
          Home
        </Link>

        <Link to="/archived" className="nav-button">
          Archived Tasks
        </Link>

        <button className="nav-button" onClick={() => setIsModalOpen(true)}>
          Add Task
        </button>

        <button className="nav-button logout-btn" onClick={() => navigate("/logout")}>
          Logout
        </button>
      </div>

      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAddTask={onAddTask}
        />
      )}
    </header>
  );
}

export default Header;
