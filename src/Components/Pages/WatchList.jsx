import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteMovie } from "../../redux/movieSlice";

const Watchlist = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  return (
    <div className="min-h-screen container">
      <h1 className="text-4xl py-5 font-bold text-center text-blue-500">
        My Watchlist
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map(({ id, movie, type }) => (
          <li
            key={id}
            className="bg-gray-900  rounded-lg shadow-lg overflow-hidden flex flex-column justify-between hover-image"
          >
            <NavLink to={`${type}/${movie.ids.slug}`} state={"movies"}>
              <div className="relative">
                <img
                  src={`https://${movie.images.fanart?.[0] || fallbackImage}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <p className="absolute text-xl bg-[#2c2b2b] px-2 py-1 rounded-sm z-1 right-5 bottom-0">
                  ⭐
                  <span className="text-white font-bold">
                    {movie.rating.toFixed(1)}
                  </span>
                </p>
              </div>
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="mt-2 text-gray-500">
                  {movie.overview.slice(0, 150)}...
                </p>
                <div className="mt-4">
                  <p className="text-gray-500">
                    <strong>Genres:</strong> {movie.genres.join(", ")}
                  </p>
                </div>
              </div>
            </NavLink>
            <button
              className="w-full bg-gray-800 text-white p-2 hover:bg-red-800 transition duration-300"
              onClick={() => dispatch(deleteMovie(movie.ids.imdb))}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      {movies.length == 0 && (
        <button onClick={() => navigate("/popular")}>
          <span className="text-xl border-1 p-3 rounded-lg hover:bg-blue-600 font-semibold">
            ➕ Add Movies
          </span>
        </button>
      )}
    </div>
  );
};

export default Watchlist;
