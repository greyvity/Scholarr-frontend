import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";

function Todo({ user, token, setIsLoading }) {
  return (
    <motion.div
      exit={{ x: "100vw" }}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      className="todo-container"
    >
      <nav className="todo-nav-container">
        <ul className="todo-nav">
          <motion.li
            animate={{ filter: "contrast(1)" }}
            whileHover={{ filter: "contrast(0.5)" }}
            whileTap={{ scale: 0.9 }}
            className="todo-navbar-item"
          >
            <Link to="/todo" className="todo-nav-link">
              Todo List
            </Link>
          </motion.li>
          <motion.li
            animate={{ filter: "contrast(1)" }}
            whileHover={{ filter: "contrast(0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/todo/create">Create Todo</Link>
          </motion.li>
        </ul>
      </nav>
      <TodoList token={token} user={user} setIsLoading={setIsLoading} />
    </motion.div>
  );
}

export default Todo;
