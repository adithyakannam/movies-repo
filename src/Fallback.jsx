import React from "react";
import error from "./assets/web-maintenance.png";

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
    </div>
  );
};

export default Fallback;
