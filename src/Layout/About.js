import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div className="about-us" exit={{ y: 1000 }}>
      <div className="aboutcontainer">
        <h1>About Us</h1>
        <h2>Members</h2>
      </div>

      <div className="bigcontainer">
        <div className="card">
          <img
            className="photo"
            // src="penguin.jpg"
            alt=""
            // style="width: 100%;"
          />
          <div className="container">
            <h2>Image Adhikari</h2>
            <p className="title">Member</p>
            <p>Student at KU</p>
            <div className="social">
              <ul>
                <li>
                  <a href="$">Fb</a>
                </li>
                <li>
                  <a href="$">Em</a>
                </li>
                <li>
                  <a href="$">Ig</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <ul>
          <li>
            <a href="/">About scholarr</a>
          </li>
          <li>
            <a href="/">Help</a>
          </li>
          <li>
            <a href="/">Contact Us</a>
          </li>
        </ul>
        &copy; 2020 scholarr.com. All Rights Reserved.
      </div>
    </motion.div>
  );
};

export default About;
