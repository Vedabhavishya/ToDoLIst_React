import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [category, setCategory] = useState("Assignments"); // Default category

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, dueDate, priority, status, category });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    setStatus("Pending");
    setCategory("Assignments");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Assignments">Assignments</option>
        <option value="Discussions">Discussions</option>
        <option value="Club Activities">Club Activities</option>
        <option value="Examinations">Examinations</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
