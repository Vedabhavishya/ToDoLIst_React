import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ArchivedTasks from "./components/ArchivedTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Add Task Function (ensure task.name is explicitly set)
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), name: task.name, status: "Pending", ...task }]);
  };

  // Archive Task (preserve full task object, including 'name')
  const archiveTask = (taskId) => {
    const taskToArchive = tasks.find((task) => task.id === taskId);
    if (taskToArchive) {
      setArchivedTasks([...archivedTasks, { ...taskToArchive }]); // Preserve the full task object
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from active tasks
    }
  };

  // Undo Archived Task (restore the full task object)
  const undoArchivedTask = (taskId) => {
    const taskToUndo = archivedTasks.find((task) => task.id === taskId);
    if (taskToUndo) {
      setTasks([...tasks, { ...taskToUndo }]);
      setArchivedTasks(archivedTasks.filter((task) => task.id !== taskId));
    }
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
                onArchiveTask={archiveTask}
                onUpdateTask={(taskId, status) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                      task.id === taskId ? { ...task, status } : task
                    )
                  )
                }
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
