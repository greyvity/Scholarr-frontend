import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";

function Todo() {
  return (
    <motion.div exit={{ x: "100vw" }} className="todo-container">
      <nav className="todo-nav-container">
        <ul className="todo-nav">
          <li className="todo-navbar-item">
            <Link to="/todo" className="todo-nav-link">
              Todo List
            </Link>
          </li>
          <li>
            <Link to="/todo/create">Create Todo</Link>
          </li>
        </ul>
      </nav>
      <TodoList />
    </motion.div>
  );
}

export default Todo;
