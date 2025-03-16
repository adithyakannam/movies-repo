import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

{
  /* <Skeleton count={5} /> // Five-line loading skeleton */
}

const LoadingSkelton = () => {
  return <Skeleton count={3} />; // Simple, single-line loading skeleton
};

export default LoadingSkelton;
