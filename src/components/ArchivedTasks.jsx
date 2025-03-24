import React from "react";
import "./ArchivedTasks.css"; // Assuming you already have some CSS here

function ArchivedTasks({ archivedTasks, onUndoTask, onDeleteTask }) {
  return (
    <div className="archived-tasks-container">
      <h2>Archived Tasks</h2>

      {archivedTasks.length === 0 ? (
        <p>No archived tasks yet.</p>
      ) : (
        <ul className="archived-task-list">
          {archivedTasks.map((task) => (
            <li key={task.id} className="archived-task-item">
              <div className="task-details">
                <h3>{task.taskName}</h3>
                <p>Description: {task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
              </div>

              <div className="task-actions">
                {/* Undo Task Button */}
                <button
                  className="undo-button"
                  onClick={() => onUndoTask(task.id)}
                >
                  Undo
                </button>

                {/* Delete Task Button (Deletes task permanently) */}
                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchivedTasks;
