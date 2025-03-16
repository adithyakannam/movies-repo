import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useSearchParams, useParams } from "react-router-dom";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";

const ButtonComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { type } = useParams();

  const [state, setState] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", state);
    setSearchParams(newSearchParams);
  }, [state]);

  // Reset page number to 1 when `type` changes

  useEffect(() => {
    setState(1);
  }, [searchParams.get("type")]);

  const incrementCounter = () => {
    setState((prev) => prev + 1);
  };

  const decrementCounter = () => {
    setState((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="w-fit m-auto mt-5">
      <div className="flex">
        <Button
          onClickFun={decrementCounter}
          className=" bg-blue-800 px-3 py-2 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          <HiOutlineArrowSmallLeft />
        </Button>

        <span className="w-[3em] block text-xl">{state}</span>

        <Button
          onClickFun={incrementCounter}
          className=" bg-blue-800 px-3 py-2 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          <HiOutlineArrowSmallRight />
        </Button>
      </div>
    </div>
  );
};

export default ButtonComponent;
