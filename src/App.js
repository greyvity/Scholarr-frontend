import React, { useState } from "react";
import About from "./Layout/About";
import Weather from "./Layout/Weather";
import Home from "./User/Components/Home";
import Nav from "./Layout/Nav";
import Loader from "./Loader";
import Sidebar from "./Layout/Sidebar";
import Classroom from "./User/Components/Classroom";
import Dashboard from "./User/Components/Dashboard";
import Login from "./Landing Page/Auth/Login";
import LandingHome from "./Landing Page/LandingHome";
import LandingNav from "./Landing Page/LandingNav";
// import About from "../Layout/About";
import Calendar from "./User/Components/Calendar";
import Todo from "./User/Components/Todo";
import Register from "./Landing Page/Auth/Register";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./styles/style.css";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    // localStorage.setItem(isLoggedIn, false);
    // localStorage.clear();
    const temp = JSON.parse(localStorage.getItem("isLoggedIn"));
    console.log(temp);
    console.log(isLoggedIn);
    if (temp) {
      setIsLoggedIn(temp);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        {isLoading && <Loader setIsLoading={setIsLoading} />}
        <Modal showModal={showModal} />
        {isLoggedIn ? (
          <main className="container">
            <Nav setIsLoggedIn={setIsLoggedIn} />
            <Sidebar />
            <Weather />
            <Route
              render={({ location }) => (
                <AnimatePresence
                  exitBeforeEnter
                  onExitComplete={() => {
                    setShowModal(false);
                  }}
                >
                  <Switch location={location} key={location.pathname}>
                    <Route path="/" exact render={(props) => <Home />} />

                    <Route path="/about" render={(props) => <About />} />
                    <Route
                      path="/classroom"
                      render={(props) => <Classroom />}
                    />
                    <Route path="/calendar" render={(props) => <Calendar />} />
                    <Route path="/todo" render={(props) => <Todo />} />
                    <Route
                      path="/dashboard"
                      render={(props) => <Dashboard />}
                    />
                    <Redirect to="/" />
                  </Switch>
                </AnimatePresence>
              )}
            />
          </main>
        ) : (
          <main className="landing-container">
            <LandingNav />
            <Route
              render={({ location }) => (
                <AnimatePresence
                  exitBeforeEnter
                  onExitComplete={() => {
                    setShowModal(false);
                  }}
                >
                  <Switch location={location} key={location.pathname}>
                    <Route path="/" exact render={(props) => <LandingHome />} />
                    <Route
                      path="/login"
                      render={(props) => (
                        <Login
                          token={token}
                          error={error}
                          setError={setError}
                          setToken={setToken}
                          isLoggedIn={isLoggedIn}
                          setIsLoggedIn={setIsLoggedIn}
                          setShowModal={setShowModal}
                          location={props.location}
                        />
                      )}
                    />
                    <Route path="/aboutus" render={(props) => <About />} />
                    <Route path="/register" render={(props) => <Register />} />
                  </Switch>
                </AnimatePresence>
              )}
            />
          </main>
        )}
      </Router>
    </>
  );
}

export default App;
