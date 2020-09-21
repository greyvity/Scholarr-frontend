import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div exit={{ y: 1000 }} className="dashboard-container">
      Dashboard
    </motion.div>
  );
};

export default Dashboard;
