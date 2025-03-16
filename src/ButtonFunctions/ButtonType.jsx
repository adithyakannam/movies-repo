import React, { Children } from "react";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const ButtonType = ({ children, prop }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (movieType) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("type", movieType);
    newSearchParams.set("page", 1);
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <Button
        className={`mx-2 p-2  ${
          searchParams.get("type") == prop ? "bg-red-500" : "bg-blue-500"
        }`}
        onClickFun={() => handleSearch(prop)}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonType;
