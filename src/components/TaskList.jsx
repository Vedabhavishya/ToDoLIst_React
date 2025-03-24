import React, { useState, useEffect } from "react";
import "./TaskList.css"; // Make sure TaskList.css has appropriate table styles.

function TaskList({ tasks, onEditTask, onArchiveTask }) {
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    const today = new Date();
    const filteredTasks = tasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      const timeDiff = taskDueDate - today;
      const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
      return daysLeft > 0 && daysLeft <= 7;
    });
    setUpcomingDeadlines(filteredTasks);
  }, [tasks]);

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const handleSaveStatus = (taskId) => {
    if (updatedStatus) {
      onEditTask(taskId, updatedStatus);
    }
    setEditingTaskId(null);
    setUpdatedStatus("");
  };

  return (
    <div className="task-list-container">
      <div className="upcoming-deadlines-card">
        <h3>Upcoming Deadlines</h3>
        {upcomingDeadlines.length === 0 ? (
          <p>No upcoming deadlines ahead!</p>
        ) : (
          <ul>
            {upcomingDeadlines.map((task) => (
              <li key={task.id}>
                <strong>{task.taskName}</strong> - Due on {task.dueDate}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2>Task List</h2>
      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                  {editingTaskId === task.id ? (
                    <select
                      value={updatedStatus || task.status}
                      onChange={handleStatusChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                <td>
                  {editingTaskId === task.id ? (
                    <button onClick={() => handleSaveStatus(task.id)}>Save</button>
                  ) : (
                    <>
                      {(task.status === "Pending" || task.status === "Ongoing") && (
                        <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                      )}
                      {task.status === "Completed" && (
                        <button onClick={() => onArchiveTask(task.id)}>Archive</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
