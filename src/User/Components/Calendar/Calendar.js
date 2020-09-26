import React from "react";
import { motion } from "framer-motion";

import * as Google from "../Integrations/Google";

function Calendar() {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      className="profile-container"
    >
      <header className="App-header">
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => Google.handleClick("listEvents")}
        >
          Add Event
        </button>
      </header>
    </motion.div>
  );
}

export default Calendar;
