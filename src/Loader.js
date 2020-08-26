import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "black",
        position: "absolute",
        top: 0,
      }}
      className="backdrop"
    >
      <h1 style={{ fontSize: "80px" }}>Loading</h1>
    </div>
  );
};

export default Loader;
