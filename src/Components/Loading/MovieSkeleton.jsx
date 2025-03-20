import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieSkeleton = () => {
    return (
        <div className="relative flex justify-center items-center w-full h-screen bg-gray-900">
            {/* Back Button */}
            <button className="fixed z-1 top-25 left-10 hover:bg-gray-00 text-gray-400 p-2 rounded-full transition-all duration-300 cursor-pointer">
                <Skeleton circle={true} height={40} width={40} />
            </button>

            {/* Movie Background */}
            <div className="absolute z-[-1] inset-0">
                <Skeleton height="100%" width="100%" />
            </div>

            {/* Content Container */}
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

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xl">
                        <p>
                            <strong>📅 Released:</strong>{" "}
                            <span className="font-bold text-blue-400">
                                <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>⏳ Runtime:</strong>
                            <span className="text-blue-400">
                                <Skeleton width={50} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>🌍 Country:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>⭐ Rating:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={50} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>🗣 Language:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={50} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>🎭 Genres:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={150} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>🎥 Network:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                        <p>
                            <strong>🥤 Status:</strong>{" "}
                            <span className="text-blue-400">
                                <Skeleton width={100} baseColor="gray" highlightColor="#444" />
                            </span>
                        </p>
                    </div>

                    {/* Trailer, Homepage & Watchlist Buttons */}
                    <div className="flex gap-4 mt-4">
                        <Skeleton width={150} height={40} baseColor="gray" highlightColor="#444" />
                        <Skeleton width={150} height={40} baseColor="gray" highlightColor="#444" />
                        <Skeleton width={150} height={40} baseColor="gray" highlightColor="#444" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSkeleton;
