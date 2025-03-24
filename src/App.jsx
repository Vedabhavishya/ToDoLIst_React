import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ArchivedTasks from "./components/ArchivedTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Add Task Function (ensure task object has 'status')
  const addTask = (task) => {
    setTasks([
      ...tasks,
      { id: Date.now(), taskName: task.taskName, status: "Pending", ...task },
    ]);
  };

  // Archive Task Function (move task to archivedTasks)
  const archiveTask = (taskId) => {
    const taskToArchive = tasks.find((task) => task.id === taskId);
    if (taskToArchive) {
      setArchivedTasks([...archivedTasks, { ...taskToArchive }]);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove from active tasks
    }
  };

  // Undo Archived Task (move back from archivedTasks to tasks)
  const undoArchivedTask = (taskId) => {
    const taskToUndo = archivedTasks.find((task) => task.id === taskId);
    if (taskToUndo) {
      setTasks([...tasks, { ...taskToUndo }]);
      setArchivedTasks(archivedTasks.filter((task) => task.id !== taskId));
    }
  };

  // Edit Task Function to update the task's status
  const editTaskStatus = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Header onAddTask={addTask} />
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
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
