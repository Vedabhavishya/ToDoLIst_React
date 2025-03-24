import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ArchivedTasks from "./components/ArchivedTasks";
import Login from "./components/Login";
import Blank from "./components/Blank"; // Import Blank component

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [archivedTasks, setArchivedTasks] = useState(() => JSON.parse(localStorage.getItem("archivedTasks")) || []);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

  // Save tasks and archived tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  // Add Task Function
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), taskName: task.taskName, status: "Pending", ...task }]);
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

  // Delete Archived Task Permanently
  const deleteArchivedTask = (taskId) => {
    const updatedArchivedTasks = archivedTasks.filter((task) => task.id !== taskId);
    setArchivedTasks(updatedArchivedTasks);
    localStorage.setItem("archivedTasks", JSON.stringify(updatedArchivedTasks));
  };

  // Edit Task Status
  const editTaskStatus = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Remove email from storage
    setUserEmail(""); // Reset state, redirect user to Blank page
  };

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
                    tasks={tasks}
                    onEditTask={editTaskStatus}
                    onArchiveTask={archiveTask}
                  />
                }
              />
              <Route
                path="/archived"
                element={
                  <ArchivedTasks
                    archivedTasks={archivedTasks}
                    onUndoTask={undoArchivedTask}
                    onDeleteTask={deleteArchivedTask} // Pass delete function here
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
            <Route path="/blank" element={<Blank />} /> {/* Render Blank page */}
            <Route path="*" element={<Navigate to="/blank" />} /> {/* Redirect to Blank if logged out */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
