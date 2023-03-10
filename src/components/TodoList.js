import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodoItem = {
      id: uuidv4(), // added new id using this package as it was deleting all the list items of newly added items as they were having same id.
      title: newTodo,
    };
    setTodos([...todos, newTodoItem]);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button style={{ marginTop: "10%", marginBottom: "5%" }} type="submit">
          Add Todo
        </button>
      </form>
      <div
        style={{
          width: "600px",
          height: "592px !important",
          padding: "16px",
          overflowY: "scroll",
          marginLeft: "30%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      >
        {todos.map((todo) => {
          return (
            <li
              style={{
                listStyleType: "none",
                width: "100%",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={todo.id}
            >
              {todo.title}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
