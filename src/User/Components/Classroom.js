import React from "react";
import { motion } from "framer-motion";

const Classroom = () => {
  return (
    <motion.div exit={{ y: 1000 }} className="classroom-grid-container">
      CLASSROOM
    </motion.div>
  );
};

export default Classroom;
