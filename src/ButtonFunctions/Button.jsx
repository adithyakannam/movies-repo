import React from "react";

const Button = ({ children, onClickFun, ...props }) => {
  return (
    <button onClick={onClickFun} {...props}>
      {children}
    </button>
  );
};

export default Button;
