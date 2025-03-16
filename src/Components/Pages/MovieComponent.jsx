import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MovieComponent = ({ movie, handleShowTrailer }) => {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div
      //   ref={containerRef}
      className="relative flex justify-center items-center w-full h-screen"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed z-1 top-25 left-10 hover:bg-black/20 text-white p-2 rounded-full transition-all duration-300 cursor-pointer"
      >
        <IoMdArrowRoundBack className="text-3xl" />
      </button>

      {/* Movie Background */}
      <div className="absolute z-[-1] inset-0">
        <img
          className="w-full h-full object-cover object-center fixed brightness-50"
          src={`https://${movie.images.fanart[0]}?w=248&fit=crop&auto=format`}
          alt={movie.title}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-10 rounded-lg w-[85%] mx-auto mt-10">
        {/* Movie Poster */}
        <div className="w-[250px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-auto object-cover"
            srcSet={`https://${movie.images.poster[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`https://${movie.images.poster[0]}?w=248&fit=crop&auto=format`}
            alt={movie.title}
          />
        </div>

        <div className="text-white opacity-100 px-5 py-4 backdrop-filter backdrop-blur-lg bg-opacity-30">
          <p className="text-7xl font-bold text-blue-500 movie-title">
            {movie.title}
          </p>
          <p className="italic text-gray-300">{movie.tagline}</p>
          <p className="text-xl">{movie.overview}</p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xl">
            <p>
              <strong>📅 Released:</strong>{" "}
              <span className=" font-bold text-blue-500">
                {movie.released
                  ? movie.released
                  : movie.first_aired.slice(0, 10)}
              </span>
            </p>
            <p>
              <strong>⏳ Runtime:</strong>
              <span className="text-blue-500">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </p>
            <p>
              <strong>🌍 Country:</strong>{" "}
              <span className="text-blue-500">
                {movie.country.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>⭐ Rating:</strong>{" "}
              <span className="text-blue-500">{movie.rating.toFixed(2)}</span> (
              {movie.votes} votes )
            </p>
            <p>
              <strong>🗣 Language:</strong>{" "}
              <span className="text-blue-500">
                {movie.language.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>🎭 Genres:</strong>{" "}
              <span className="text-blue-500">{movie.genres?.join(", ")}</span>
            </p>
            <p>
              <strong>🎥 Network:</strong>{" "}
              <span className="text-blue-500">{movie.network}</span>
            </p>
            <p>
              <strong>🥤 Status:</strong>{" "}
              <span className="text-blue-500">{movie.status}</span>
            </p>
          </div>

          {/* Trailer, Homepage & Watchlist Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleShowTrailer(movie.trailer)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition-all"
            >
              🎬 Watch Trailer
            </button>
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition-all"
            >
              🌐 Visit Homepage
            </a>
            <button
              onClick={toggleWatchlist}
              className={`px-4 py-2 rounded-lg font-semibold transition-all
                     ${
                       isInWatchlist
                         ? "bg-green-600 hover:bg-green-700 text-white"
                         : "bg-gray-600 hover:bg-gray-700 text-white"
                     }
                  `}
            >
              {isInWatchlist ? "✅ Added to Watchlist" : "➕ Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
