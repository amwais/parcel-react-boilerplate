import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Store } from "./store";

import "./App.css";

const ToDoList = ({ todos }) => {
  return todos.map((item, i) => <ToDoItem key={i} {...item} />);
};

const ToDoItem = ({ id, text, completed }) => {
  const store = useContext(Store);
  const todoDispatch = store.todos[1];
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() =>
          todoDispatch({ type: "TOGGLE_TODO_COMPLETED", payload: id })
        }
      />
      <input
        type="text"
        value={text}
        onChange={e => {
          todoDispatch({
            type: "UPDATE_ITEM_TEXT",
            payload: { id, text: e.target.value }
          });
        }}
      />
      <button
        onClick={() => {
          todoDispatch({ type: "DELETE_TODO", payload: id });
        }}
      >
        Delete
      </button>
    </div>
  );
};

const App = () => {
  const store = useContext(Store);
  const [todosState, todoDispatch] = store.todos;
  useEffect(() => {
    const raw = localStorage.getItem("todos");
    todoDispatch({ type: "SET_TODOS", payload: JSON.parse(raw) });
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosState));
  }, [todosState]);

  return (
    <div>
      <h1>Hooks & Context</h1>
      <button
        onClick={() => {
          todoDispatch({ type: "ADD_TODO", payload: Date.now() });
        }}
      >
        New Todo
      </button>
      <br />
      <br />
      <ToDoList todos={todosState} />
    </div>
  );
};

export default App;
