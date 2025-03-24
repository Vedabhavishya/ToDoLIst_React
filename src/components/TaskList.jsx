import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, onArchiveTask, onUpdateTask }) {
  const [editableTask, setEditableTask] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (task) => {
    setEditableTask(task.id); // Track the task being edited
    setEditedStatus(task.status); // Set current status in editable state
  };

  const handleSave = (task) => {
    onUpdateTask(task.id, editedStatus); // Update the task status
    setEditableTask(null); // Exit edit mode after saving
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value); // Track changes in the status dropdown
  };

  const renderStatusDropdown = () => (
    <select value={editedStatus} onChange={handleStatusChange}>
      <option value="Pending">Pending</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
    </select>
  );

  return (
    <div className="task-list-container">
      <h2>Upcoming Activities</h2>

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
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7">No upcoming activities ahead!</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td> {/* Fixed task name display */}
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>

                {/* Editable Status Column */}
                <td>
                  {editableTask === task.id
                    ? renderStatusDropdown()
                    : task.status}
                </td>

                <td>
                  {editableTask === task.id ? (
                    <button onClick={() => handleSave(task)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(task)}>Edit</button>
                  )}

                  {/* Archive Button for Completed Tasks */}
                  {task.status === "Completed" && (
                    <button onClick={() => onArchiveTask(task.id)}>
                      Archive
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
