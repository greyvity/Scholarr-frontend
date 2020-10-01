import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Login = ({
  isLoggedIn,
  setIsLoggedIn,
  token,
  setToken,
  setShowModal,
  location,
  setUser,
  setIsLoading,
}) => {
  const [error, setError] = useState({});

  // const submitVariants = {
  //   initial: {
  //     color: "#ffffff",
  //     // backgroundColor: "#2e2b55",
  //   },
  //   animate: {
  //     color: "#ffffff",
  //     backgroundColor: error ? "#ff5353" : "#2e2b55",
  //   },
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredentials = {
        email,
        password,
      };

      const options = {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(userCredentials),
      };

      const response = await fetch(
        "https://tranquil-woodland-86159.herokuapp.com/api/auth/login",
        options
      );
      const jsonResponse = await response.json();
      setIsLoading(false);
      if (jsonResponse.status === "error") {
        const temp = {};
        temp[jsonResponse.error.location] = {
          message: jsonResponse.error.message,
        };
        setError(temp);

        setTimeout(() => {
          setError({});
        }, 4000);
      } else if (jsonResponse.success) {
        // setShowModal(true);
        setIsLoggedIn(true);
        setToken(jsonResponse.success["auth_token"]);
        setUser(jsonResponse.success.user);

        localStorage.setItem("user", JSON.stringify(jsonResponse.success.user));
        localStorage.setItem("authToken", jsonResponse.success["auth_token"]);
        localStorage.setItem("isLoggedIn", true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) location.pathname = "/";
  }, [isLoggedIn, location.pathname]);

  return (
    <motion.div exit={{ x: 1000 }} className="login auth">
      <form autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
        {error.others?.length !== 0 && (
          <h1 className="error-message">{error.others?.message}</h1>
        )}
        {error.email?.length !== 0 && (
          <h1 className="error-message">{error.email?.message}</h1>
        )}
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
        {error.password && (
          <h1 className="error-message">{error.password.message}</h1>
        )}
        <div className="password-input-container input-container">
          <label htmlFor="password">
            <svg
              width="60%"
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
            autoComplete="new-password"
            required
            type="password"
            placeholder="password"
            id="password"
            className="password input"
          />
        </div>
        <motion.input
          type="submit"
          value="Login"
          className="auth-form-submit"
        />
      </form>
    </motion.div>
  );
};

export default Login;
