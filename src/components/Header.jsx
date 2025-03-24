import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ onAddTask }) {
  const [showModal, setShowModal] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskDetails.taskName.trim() === "") {
      alert("Task name is required!");
      return;
    }

    onAddTask(taskDetails);

    setTaskDetails({
      taskName: "",
      description: "",
      dueDate: "",
      priority: "",
      category: "",
      status: "",
    });
    setShowModal(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <header className="header">
      <h1>To-Do List App</h1>
      <nav className="nav-buttons">
        <Link to="/">
          <button className="styled-button">Home</button>
        </Link>
        <Link to="/archived">
          <button className="styled-button">Archived Tasks</button>
        </Link>
        <button className="styled-button" onClick={() => setShowModal(true)}>
          Add Task
        </button>
        <button className="styled-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                value={taskDetails.taskName}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Task Description"
                value={taskDetails.description}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={handleChange}
                required
              />
              <select name="priority" value={taskDetails.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={taskDetails.category}
                onChange={handleChange}
                required
              />
              <select name="status" value={taskDetails.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
