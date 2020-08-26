import React from "react";
import { motion } from "framer-motion";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    console.log("Hello" + email);

    if (email && password) {
      const userCredentials = {
        email,
        username,
        password,
      };

      const options = {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(userCredentials),
      };

      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          options
        );
        console.log(response);
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          window.alert("Please check your mail for the verification code.");
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("i");
    }
  };

  return (
    <motion.div exit={{ x: 1000 }} className="register auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="username-input-container input-container">
          <label htmlFor="username">
            <svg
              width="50%"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0357 6C16.0357 8.56954 13.837 10.75 11 10.75C8.16304 10.75 5.96429 8.56954 5.96429 6C5.96429 3.43046 8.16304 1.25 11 1.25C13.837 1.25 16.0357 3.43046 16.0357 6ZM11 15.5C12.3589 15.5 13.6552 15.2297 14.833 14.75H15.4C18.4088 14.75 20.75 17.0664 20.75 19.8V21.75C20.75 22.2477 20.3093 22.75 19.6429 22.75H2.35714C1.69072 22.75 1.25 22.2477 1.25 21.75V19.8C1.25 17.0664 3.59117 14.75 6.6 14.75H7.16782C8.34762 15.2291 9.63953 15.5 11 15.5Z"
                stroke="black"
                stroke-width="2.5"
              />
            </svg>
          </label>
          <input
            required
            type="text"
            placeholder="username"
            id="username"
            className="username input"
          />
        </div>
        <div className="email-input-container input-container">
          <label htmlFor="email">
            <svg
              width="60%"
              viewBox="0 0 53 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3V0.5C1.61929 0.5 0.5 1.61929 0.5 3L3 3ZM50 3H52.5C52.5 1.61929 51.3807 0.5 50 0.5V3ZM25.1953 21.7771L26.6748 19.762L25.1953 21.7771ZM25.797 21.7697L24.265 19.7941L25.797 21.7697ZM3 5.5H50V0.5H3V5.5ZM47.5 3V35.5H52.5V3H47.5ZM49.5 33.5H3.5V38.5H49.5V33.5ZM5.5 35.5V3H0.5V35.5H5.5ZM26.6748 19.762C22.3992 16.6227 18.8454 13.4811 15.3597 10.3399C11.8925 7.21541 8.45481 4.05557 4.52859 1.02177L1.47141 4.97823C5.21359 7.86984 8.49069 10.8806 12.0125 14.0543C15.5159 17.2113 19.2255 20.4955 23.7157 23.7923L26.6748 19.762ZM48.4679 1.02445L24.265 19.7941L27.3291 23.7452L51.5321 4.97555L48.4679 1.02445ZM23.7157 23.7923C24.7917 24.5823 26.2673 24.5686 27.3291 23.7452L24.265 19.7941C24.9749 19.2436 25.9578 19.2355 26.6748 19.762L23.7157 23.7923ZM3.5 33.5C4.60457 33.5 5.5 34.3954 5.5 35.5H0.5C0.5 37.1569 1.84315 38.5 3.5 38.5V33.5ZM47.5 35.5C47.5 34.3954 48.3954 33.5 49.5 33.5V38.5C51.1569 38.5 52.5 37.1569 52.5 35.5H47.5Z"
                fill="black"
              />
            </svg>
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="email input"
            required
          />
        </div>
        <div className="password-input-container input-container">
          <label htmlFor="password">
            <svg
              width="50%"
              viewBox="0 0 36 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.27273 18H32.7273C33.4433 18 34 18.5728 34 19.25V38.75C34 39.4272 33.4433 40 32.7273 40H3.27273C2.55666 40 2 39.4272 2 38.75V19.25C2 18.5728 2.55666 18 3.27273 18Z"
                stroke="black"
                strokeWidth="4"
              />
              <path
                d="M31 14C31 12.2928 30.6637 10.6023 30.0104 9.02511C29.3571 7.44788 28.3995 6.01477 27.1924 4.80761C25.9852 3.60045 24.5521 2.64288 22.9749 1.98957C21.3977 1.33625 19.7072 1 18 1C16.2928 1 14.6023 1.33626 13.0251 1.98957C11.4479 2.64288 10.0148 3.60045 8.80761 4.80761C7.60045 6.01477 6.64288 7.44788 5.98957 9.02512C5.33625 10.6023 5 12.2928 5 14H7.74663C7.74663 12.6535 8.01184 11.3202 8.52712 10.0762C9.0424 8.83221 9.79766 7.70189 10.7498 6.74978C11.7019 5.79766 12.8322 5.0424 14.0762 4.52712C15.3202 4.01184 16.6535 3.74663 18 3.74663C19.3465 3.74663 20.6798 4.01184 21.9238 4.52712C23.1678 5.0424 24.2981 5.79766 25.2502 6.74977C26.2023 7.70189 26.9576 8.83221 27.4729 10.0762C27.9882 11.3202 28.2534 12.6535 28.2534 14H31Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M21 29C21 30.6569 19.6569 32 18 32C16.3431 32 15 30.6569 15 29C15 27.3431 16.3431 26 18 26C19.6569 26 21 27.3431 21 29Z"
                fill="black"
              />
              <path d="M17 31H19V37H17V31Z" fill="black" />
            </svg>
          </label>
          <input
            required
            type="password"
            placeholder="password"
            id="password"
            className="password input"
          />
        </div>
        <input type="submit" className="auth-form-submit" value="Sign Up" />
      </form>
    </motion.div>
  );
};

export default Register;
