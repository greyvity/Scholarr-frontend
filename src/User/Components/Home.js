import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return <motion.div exit={{ y: 1000 }} className="home"></motion.div>;
};

export default Home;
