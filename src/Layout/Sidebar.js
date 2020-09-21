import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "../styles/assets/vectors/Dashboard.svg";
// import Todo from "../styles/assets/vectors/Todo.svg";
// import Calendar from "../styles/assets/vectors/Calendar.svg";

const Sidebar = () => {
  const [toggleOpen, setToggleOpen] = useState(true);

  const handleToggleOpener = () => {
    setToggleOpen(!toggleOpen);
  };

  return (
    <motion.div
      initial={{ width: "50px" }}
      animate={{
        width: toggleOpen ? "300px" : "50px",
        // transition: { delay: 0.15 },
      }}
      className="quick-toggles sidebar"
    >
      <AnimatePresence exitBeforeEnter>
        {toggleOpen && (
          <motion.div
            key="hide14"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 20, opacity: 0 }}
            className="hide-show"
          >
            <Link to="/dashboard">
              <div className="quick-toggle dashboard">
                <i class="fas fa-tachometer-alt"></i>
              </div>
            </Link>
            <Link to="/calendar">
              <div className="quick-toggle">
                <i class="fas fa-calendar-alt"></i>
              </div>
            </Link>
            <Link to="/todo">
              <div className="quick-toggle">
                <i className="fas fa-sticky-note"></i>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="quick-toggle" onClick={handleToggleOpener}>
        {/* <motion.svg
          width="20"
          height="25"
          viewBox="0 0 31 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={{ rotate: toggleOpen ? 0 : 180 }}
            d="M3 3L28 18L3 33"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg> */}
        <motion.i
          className="fas fa-angle-left"
          animate={{ rotate: toggleOpen ? 180 : 0 }}
        ></motion.i>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
