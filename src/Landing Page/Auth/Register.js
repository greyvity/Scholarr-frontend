import React from "react";
import { motion } from "framer-motion";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    if (email && password) {
      const userCredentials = {
        email,
        username,
        password,
      };

      const options = {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          userCredentials,
        }),
      };
      try {
        const response = await fetch(
          "http://localhost:4000/auth/register",
          options
        );
        console.log(response);
        // if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        window.alert("Please check your mail for the verification code.");
        // } else {
        console.log("something went wrong");
        // }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("i");
    }
  };

  return (
    <motion.div exit={{ opacity: 0 }} className="register auth">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="email"
          required
        />
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          placeholder="username"
          id="username"
          className="username"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          placeholder="password"
          id="password"
          className="password"
        />
        <input type="submit" value="Submit" />
      </form>
    </motion.div>
  );
};

export default Register;
