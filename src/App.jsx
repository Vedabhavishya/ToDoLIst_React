import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ArchivedTasks from "./components/ArchivedTasks";
import Login from "./components/Login";
import Blank from "./components/Blank";

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [archivedTasks, setArchivedTasks] = useState(() => JSON.parse(localStorage.getItem("archivedTasks")) || []);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  // Add Task Function (Attach User Email)
  const addTask = (task) => {
    const taskWithUser = { ...task, id: Date.now(), email: userEmail, status: "Pending" }; // Attach email to task
    setTasks([...tasks, taskWithUser]);
  };

  // Archive Task
  const archiveTask = (taskId) => {
    const taskToArchive = tasks.find((task) => task.id === taskId);
    if (taskToArchive) {
      setArchivedTasks([...archivedTasks, { ...taskToArchive }]);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  // Undo Archived Task
  const undoArchivedTask = (taskId) => {
    const taskToUndo = archivedTasks.find((task) => task.id === taskId);
    if (taskToUndo) {
      setTasks([...tasks, { ...taskToUndo }]);
      setArchivedTasks(archivedTasks.filter((task) => task.id !== taskId));
    }
  };

  // Edit Task Status
  const editTaskStatus = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: status } : task))
    );
  };

  // Logout Handler (Clear User Email)
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Clear email on logout
    setUserEmail(""); // Reset state
  };

  // Filter tasks for the logged-in user only
  const filteredTasks = tasks.filter((task) => task.email === userEmail);
  const filteredArchivedTasks = archivedTasks.filter((task) => task.email === userEmail);

  return (
    <Router>
      <div className="App">
        {userEmail ? (
          <>
            <Header onAddTask={addTask} onLogout={handleLogout} />
            <Routes>
              <Route
                path="/"
                element={
                  <TaskList
                    tasks={filteredTasks}
                    onEditTask={editTaskStatus}
                    onArchiveTask={archiveTask}
                  />
                }
              />
              <Route
                path="/archived"
                element={
                  <ArchivedTasks
                    archivedTasks={filteredArchivedTasks}
                    onUndoTask={undoArchivedTask}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="*" element={<Navigate to="/blank" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
