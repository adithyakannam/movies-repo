import React from "react";

const Fallback = () => {
  return (
    <div className="w-full ">
      <h1
        style={{
          color: "#D22B2B",
          fontSize: "20em",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: ".5em",
        }}
      >
        404
        <span > ERROR</span>
      </h1>
      <p className="text-center text-3xl text-red-500 font-semibold">Working on it.</p>
    </div>
  );
};

export default Fallback;
