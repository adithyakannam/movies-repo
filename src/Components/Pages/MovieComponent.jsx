import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, deleteMovie } from "../../redux/movieSlice";
import { FaRegBookmark } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

const MovieComponent = ({ movie, handleShowTrailer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const moviesList = useSelector((state) => state.movies.movies);
  const location = useLocation();

  const toggleWatchlist = (movie) => {
    const authenticated = JSON.parse(localStorage.getItem("authenticated"))?.data || false;
    console.log(typeof authenticated)
    console.log(authenticated)
    if (authenticated === true) {
      if (!isInWatchlist) {
        setIsInWatchlist((prev) => !prev);
        const movieType = location.pathname.includes("/genre/")
          ? "movies"
          : location.pathname.includes("/movies/")
          ? "movies"
          : "shows";
        dispatch(
          addMovie({ id: movie.ids.imdb, movie: movie, type: movieType })
        );
      } else {
        setIsInWatchlist((prev) => !prev);
        dispatch(deleteMovie(movie.ids.imdb));
      }
    }
  };

  useEffect(() => {
    moviesList.forEach((item) => {
      if (item.id == movie.ids.imdb) {
        setIsInWatchlist(true);
      }
    });
  }, []);

  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  return (
    <div className="movie-box">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <IoMdArrowRoundBack className="text-3xl" />
      </button>

      {/* Movie Background */}
      <div className="absolute z-[-1] inset-0">
        <img
          className="w-full h-full object-cover object-center fixed brightness-50"
          src={`https://${movie.images.fanart?.[0] || fallbackImage}`}
          alt={movie.title}
        />
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Movie Poster */}
        <div className="w-[250px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-auto object-cover"
            src={`https://${movie.images.poster?.[0] || fallbackImage}`}
            alt={movie.title}
          />
        </div>

        <div className="movie-details">
          <p className="text-[3em] font-bold text-blue-500 movie-title">
            {movie.title}
          </p>
          <p className="italic text-gray-300">{movie.tagline}</p>
          <p className="text-lg">{movie.overview}</p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xl">
            <p>
              <strong>📅 Released:</strong>{" "}
              <span className="">
                {
                  movie.released
                  // ? movie.released
                  // : movie.first_aired.slice(0, 10)
                }
              </span>
            </p>
            <p>
              <strong>⏳ Runtime:</strong>
              <span className="">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </p>
            <p>
              <strong>🌍 Country:</strong>{" "}
              <span className="">
                {movie.country.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>⭐ Rating:</strong>{" "}
              <span className="">{movie.rating.toFixed(2)}</span> (
              {movie.votes} votes )
            </p>
            <p>
              <strong>🗣 Language:</strong>{" "}
              <span className="">
                {movie.language.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>🎭 Genres:</strong>{" "}
              <span className="">{movie.genres?.join(", ")}</span>
            </p>
            <p>
              <strong>🎥 Network:</strong>{" "}
              <span className="">{movie.network}</span>
            </p>
            <p>
              <strong>🥤 Status:</strong>{" "}
              <span className="">{movie.status}</span>
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
              onClick={() => toggleWatchlist(movie)}
              className={`px-4 py-2 transition-all
                     ${
                       isInWatchlist
                         ? "bg-green-600 hover:bg-green-700 text-white"
                         : "bg-gray-600 hover:bg-gray-700 text-white"
                     }
                  `}
            >
              {isInWatchlist ? <IoBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
