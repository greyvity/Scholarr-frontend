import React, { useState } from "react";
import About from "./Layout/About";
// import Weather from "./Layout/Weather";
// import Home from "./User/Components/Home";
import Nav from "./Layout/Nav";
import Loader from "./Loader";
import Sidebar from "./Layout/Sidebar";
import Classroom from "./User/Components/Classroom/Classroom";
import Dashboard from "./User/Components/Dashboard/Dashboard";
import Login from "./Landing Page/Auth/Login";
import LandingHome from "./Landing Page/LandingHome";
import LandingNav from "./Landing Page/LandingNav";
// import About from "../Layout/About";
import Calendar from "./User/Components/Calendar/Calendar";
import CreateTodo from "./User/Components/ToDo/CreateTodo";
import EditTodo from "./User/Components/ToDo/EditTodo";
import TodoList from "./User/Components/ToDo/TodoList";
import Todo from "./User/Components/ToDo/Todo";
import Register from "./Landing Page/Auth/Register";
import Profile from "./User/Components/Profile/Profile";
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
import ClassroomExtended from "./User/Components/Classroom/ClassroomExtended";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    // localStorage.setItem(isLoggedIn, false);
    // localStorage.clear();
    const temp = JSON.parse(localStorage.getItem("isLoggedIn"));
    const tempUser = JSON.parse(localStorage.getItem("user"));
    const authToken = localStorage.getItem("authToken");
    if (temp && authToken && tempUser) {
      setIsLoggedIn(true);
      setToken(authToken);
      setUser(tempUser);
    }
  }, []);

  return (
    <>
      <Router>
        {isLoading && <Loader setIsLoading={setIsLoading} />}

        <Modal showModal={showModal} />
        {/* <ClassworkModal showClassworkModal={showClassworkModal} /> */}
        {isLoggedIn ? (
          <main className="container">
            <Nav setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
            <Sidebar />
            <Route
              render={({ location }) => (
                <AnimatePresence
                  exitBeforeEnter
                  onExitComplete={() => {
                    setShowModal(false);
                  }}
                >
                  <Switch location={location} key={location.pathname}>
                    {/* <Route path="/" exact render={(props) => <Home />} /> */}

                    <Route path="/about" render={(props) => <About />} />
                    <Route
                      path="/"
                      exact
                      render={(props) => (
                        <Classroom token={token} user={user} />
                      )}
                    />
                    <Route
                      path="/class/:classId"
                      render={(props) => (
                        <ClassroomExtended
                          token={token}
                          {...props}
                          user={user}
                        />
                      )}
                    />
                    <Route path="/calendar" render={(props) => <Calendar />} />
                    <Route
                      path="/todo"
                      exact
                      render={(props) => <Todo user={user} token={token} />}
                    />
                    <Route
                      path="/dashboard"
                      render={(props) => <Dashboard />}
                    />
                    <Route
                      path="/todo/create"
                      exact
                      render={(props) => (
                        <CreateTodo {...props} token={token} user={user} />
                      )}
                    />
                    <Route
                      path="/todo/edit/:todoId"
                      exact
                      render={(props) => (
                        <EditTodo {...props} token={token} user={user} />
                      )}
                    />
                    <Route
                      path="/profile"
                      render={(props) => (
                        <Profile
                          {...props}
                          token={token}
                          user={user}
                          setUser={setUser}
                        />
                      )}
                    />
                    {/* <Redirect to="/" /> */}
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
                          setUser={setUser}
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
