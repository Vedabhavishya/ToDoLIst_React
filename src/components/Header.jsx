import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ onAddTask }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userEmail")); // Check initial login state
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || ""); // Manage user email
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
    status: "",
  });

  const navigate = useNavigate(); // To navigate between pages

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      const storedTasks = JSON.parse(localStorage.getItem(userEmail)) || [];
      setTasks(storedTasks); // Load tasks for the logged-in user
    } else {
      setTasks([]); // No tasks if not logged in
    }
  }, [isLoggedIn, userEmail]);

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged out state
    setUserEmail("");
    localStorage.removeItem("userEmail"); // Clear user info on logout
    navigate("/blank"); // Navigate to blank page
  };

  const handleLogin = () => {
    const email = prompt("Enter your email to login:");
    if (email) {
      localStorage.setItem("userEmail", email); // Store email in localStorage
      setUserEmail(email);
      setIsLoggedIn(true);
      alert(`Welcome back, ${email}!`);
      navigate("/"); // Redirect to main page after login
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert("You need to be logged in to add tasks.");
      return;
    }
    if (taskDetails.taskName.trim() === "") {
      alert("Task name is required!");
      return;
    }

    const userTasks = JSON.parse(localStorage.getItem(userEmail)) || [];
    userTasks.push(taskDetails);
    localStorage.setItem(userEmail, JSON.stringify(userTasks));

    onAddTask(taskDetails); // Update parent task list
    alert("Task added successfully!");

    setTaskDetails({
      taskName: "",
      description: "",
      dueDate: "",
      priority: "",
      category: "",
      status: "",
    });
    setShowModal(false); // Close modal after adding task
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

        {/* Dynamic Login/Logout Button */}
        {isLoggedIn ? (
          <button className="styled-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="styled-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>

      {/* Add Task Modal */}
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
              <select
                name="priority"
                value={taskDetails.priority}
                onChange={handleChange}
                required
              >
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
              <select
                name="status"
                value={taskDetails.status}
                onChange={handleChange}
                required
              >
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
