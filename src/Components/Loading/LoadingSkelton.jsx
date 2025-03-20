import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingSkelton = ({ props }) => {
  return (
    <div className={`${props ? "w-full m-auto" : "container"}`}>
      <SkeletonTheme baseColor="#bab6b6" highlightColor="#444" direction="ltr">
        <Skeleton style={{ height: "4em", backgroundColor: "gray" }} />
        <p>
          <Skeleton count={20} containerClassName="loading-card" />
        </p>
      </SkeletonTheme>
    </div>
  ); // Simple, single-line loading skeleton
};

export default LoadingSkelton;

const CastSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#bab6b6" highlightColor="#444" direction="ltr">
      <Skeleton style={{ height: "4em", backgroundColor: "gray" }} />
      <p>
        <Skeleton
          count={8}
          height={300}
          width={200}
          containerClassName="loading-card"
        />
      </p>
    </SkeletonTheme>
  );
};

export { CastSkeleton };

const SeasonSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#bab6b6" highlightColor="#444" direction="ltr">
      <div className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-10 rounded-lg w-[85%] mx-auto mt-10 ">
                      <div className="w-[250px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                          <Skeleton height={375} width={250} baseColor="gray" highlightColor="#444" />
                      </div>
      
                      <div className="text-gray-400 opacity-100 w-full px-5 py-4  bg-gray-800">
                          <p className="text-7xl font-bold text-blue-400 movie-title">
                              <Skeleton width={300} baseColor="gray" highlightColor="#444" />
                          </p>
                          <p className="italic text-gray-400">
                              <Skeleton width={200} baseColor="gray" highlightColor="#444" />
                          </p>
                          <p className="text-xl">
                              <Skeleton count={3} baseColor="gray" highlightColor="#444" />
                          </p>
      
                          <div className="text-xl">
                              <p>
                                  <strong>Network:</strong>{" "}
                                  <span className="font-bold text-blue-400">
                                      <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                                  </span>
                              </p>
                              <p>
                                  <strong>Released:</strong>{" "}
                                  <span className="font-bold text-blue-400">
                                      <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                                  </span>
                              </p>
                              <p>
                                  <strong>Episodes:</strong>{" "}
                                  <span className="font-bold text-blue-400">
                                      <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                                  </span>
                              </p>
                              <p>
                                  <strong>Rating:</strong>{" "}
                                  <span className="text-blue-400">
                                      <Skeleton width={50} baseColor="gray" highlightColor="#444" />
                                  </span>
                              </p>
                         
                          </div>
      
                          
                      </div>
                  </div>
        <p className="">
          <Skeleton
            count={8}
            height={200}
            width={650}
            containerClassName="loading-card"
          />
        </p>
    </SkeletonTheme>
  );
};

export { SeasonSkeleton };
