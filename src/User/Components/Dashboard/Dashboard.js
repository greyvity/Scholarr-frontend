import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      exit={{ y: 1000 }}
      className="dashboard-container classroom-container"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.3,
          },
        }}
        style={{
          fontSize: 35,
        }}
        className="coming-soon"
      >
        DASHBOARD COMING SOON
      </motion.h1>
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.7,
          },
        }}
        style={{
          fontSize: 20,
        }}
        className="coming-soon"
      >
        We Will Let You Know
      </motion.h1>
    </motion.div>
  );
};

export default Dashboard;
