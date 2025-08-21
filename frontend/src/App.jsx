import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await axios.post("http://localhost:5000/api/todos", {
      text: newTodo,
      done: false, // add done flag
    });
    setTodos([...todos, res.data]);
    setNewTodo("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // Toggle done
  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">✅ Todo List</h1>

        {/* Input + Add Button */}
        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span className={todo.done ? "done-text" : ""}>{todo.text}</span>
              <div className="actions">
                <button
                  onClick={() => toggleDone(todo._id)}
                  className="done-btn"
                >
                  ✔
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="delete-btn"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
