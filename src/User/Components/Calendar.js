import React from "react";
import { motion } from "framer-motion";

const Calendar = () => {
  return (
    <motion.div exit={{ y: 1000 }} className="calendar-container">
      Calendar
    </motion.div>
  );
};

export default Calendar;
