import React from "react";
import "./ArchivedTasks.css";

function ArchivedTasks({ archivedTasks, onUndoTask }) {
  return (
    <div>
      <h2>Archived Tasks</h2>
      <table>
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
          {archivedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td> {/* Task Name should match your task object */}
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => onUndoTask(task.id)}>Undo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchivedTasks;
