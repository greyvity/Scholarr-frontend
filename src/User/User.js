import React, { useState } from "react";
import About from "../Layout/About";
import Weather from "../Layout/Weather";
import Home from "./Components/Home";
import Nav from "../Layout/Nav";
import Loader from "../Loader";
import Sidebar from "../Layout/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Classroom from "./Components/ClassRoom/Classroom";
import { motion, AnimatePresence } from "framer-motion";

const User = ({ showModal, setShowModal, setIsLoggedIn, isLoading }) => {
  return (
    <motion.main className="container">
      <Router>
        {isLoading && <Loader />}
        <Nav setIsLoggedIn={setIsLoggedIn} />
        <Sidebar />
        <Weather />
        <Route
          render={({ location }) => (
            <AnimatePresence
              exitBeforeEnter
              // onExitComplete={() => {
              //   setIsLoading(true);
              //   setTimeout(() => {
              //     setIsLoading(false);
              //   }, 5000);
              //   return;
              // }}
            >
              <Switch location={location} key={location.pathname}></Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </motion.main>
  );
};

export default User;
