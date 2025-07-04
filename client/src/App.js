
import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://sarthak-todo-backend.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    axios.get("/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("/api/todos", { title: newTask })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTask("");
      })
      .catch(err => console.error("Error adding task:", err));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error("Error deleting task:", err));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📝 To-Do List</h1>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={addTask} style={{ marginLeft: "1rem", padding: "0.5rem" }}>Add Task</button>

      <ul style={{ marginTop: "2rem" }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginBottom: "1rem" }}>
            {todo.title}
            <button
              onClick={() => deleteTask(todo._id)}
              style={{ marginLeft: "1rem", color: "white", background: "red", border: "none", padding: "0.3rem 0.6rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
