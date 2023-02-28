import React, { useState } from "react";
import { traceSpan } from "./tracing";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (newTodo) => traceSpan(`"${newTodo}" added`, () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
  });

  const handleDelete = (name, index) => traceSpan(`"${name}" todo deleted`, (index) => {
    const updatedTodos = todos.filter((todo) => todo !== name);
    setTodos(updatedTodos);
  });


  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button onClick={() => handleSubmit(newTodo)} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-container">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}{" "}
            <button onClick={() => handleDelete(todo)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
