import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos") // your backend URL
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);
  const addTodo = async () => {
  if (!newTodo.trim()) return;
  const res = await axios.post("http://localhost:5000/api/todos", { text: newTodo });
  setTodos([...todos, res.data]);
  setNewTodo("");
};
const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:5000/api/todos/${id}`);
  setTodos(todos.filter(todo => todo._id !== id));
};
return (
  <div>
    <h1>Todo List</h1>
    <input
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder="Add a todo..."
    />
    <button onClick={addTodo}>Add</button>

    <ul>
      {todos.map(todo => (
        <li key={todo._id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo._id)}>❌</button>
        </li>
      ))}
    </ul>
  </div>
);

}