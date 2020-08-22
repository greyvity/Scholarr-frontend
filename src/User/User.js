import React from "react";
import About from "../Layout/About";
import Weather from "../Layout/Weather";
import Home from "./Components/Home";
import Nav from "../Layout/Nav";
import Sidebar from "../Layout/Sidebar";
import { Route, Switch } from "react-router-dom";

const User = ({ showModal, setShowModal }) => {
  return (
    <main className="container">
      <Nav />
      <Sidebar />
      <Weather />
      <Route path="/" exact render={(props) => <Home />} />
      <Route path="/about" render={(props) => <About />} />
    </main>
  );
};

export default User;
