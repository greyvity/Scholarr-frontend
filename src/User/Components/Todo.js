import React from "react";
import { motion } from "framer-motion";

const Todo = () => {
  return (
    <motion.div exit={{ y: 1000 }} className="todo-grid-container">
      Todo
    </motion.div>
  );
};

export default Todo;
