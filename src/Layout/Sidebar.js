import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../styles/assets/vectors/Dashboard.svg";
import Todo from "../styles/assets/vectors/Todo.svg";
import Calendar from "../styles/assets/vectors/Calendar.svg";

const Sidebar = () => {
  return (
    <div className="quick-toggles sidebar">
      <Link to="/dashboard">
        <div className="quick-toggle dashboard">
          <img src={Dashboard} alt="dashboard icon" />
        </div>
      </Link>
      <Link to="/calendar">
        <div className="quick-toggle">
          <img src={Calendar} alt="calendar icon" />
        </div>
      </Link>
      <Link to="/todo">
        <div className="quick-toggle">
          <img src={Todo} alt="To do icon" />
        </div>
      </Link>
      <Link to="/">
        <div className="quick-toggle"></div>
      </Link>
    </div>
  );
};

export default Sidebar;
