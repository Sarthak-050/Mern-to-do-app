
import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://sarthak-todo-backend.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get("/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error loading todos:", err));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    console.log("Adding task:", newTask); // for debugging
    axios.post("/api/todos", { title: newTask })
      .then(res => {
        setTodos(prev => [...prev, res.data]);
        setNewTask("");
      })
      .catch(err => console.error("Error adding task:", err));
  };

  const deleteTask = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo._id !== id));
      })
      .catch(err => console.error("Error deleting task:", err));
  };

  return (
    <div style={{
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "auto"
    }}>
      <h2 style={{ textAlign: "center" }}>✅ MERN To-Do App</h2>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter a task"
          style={{
            flex: 1,
            padding: "0.5rem",
            fontSize: "1rem"
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{
            marginBottom: "0.75rem",
            backgroundColor: "#f0f0f0",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>{todo.title}</span>
            <button
              onClick={() => deleteTask(todo._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.3rem 0.7rem",
                cursor: "pointer"
              }}
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
