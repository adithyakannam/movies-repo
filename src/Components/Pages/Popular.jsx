import React, { useEffect, useState, useRef, useMemo } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import Api from "../../API/Api";
import LoadingSkelton from "../Loading/LoadingSkelton";
import ButtonComponent from "../../ButtonFunctions/ButtonComponent";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response1 = await Api.get(
          `/movies/popular?extended=images&page=${searchParams.get(
            "page"
          )}&limit=24`
        );
        setMovies(response1.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <LoadingSkelton/>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center heading">Most Popular</h2>
      <div className="movie-cards">
        {movies.map((item, index) => {
          let imageUrl = item.images.poster?.[0] || item.movie.thumb?.[0];

          if (imageUrl && !imageUrl.startsWith("https://")) {
            imageUrl = "https://" + imageUrl; // Prepend protocol if missing
          }
          return (
            <NavLink
              key={item.ids.trakt}
              to={`${location.pathname}/movies/${item.ids.slug}`}
              state={`popular/movies`}
              className={`list-item`}
            >
              <div className="movie-card overflow-hidden">
                <img
                  src={imageUrl}
                  alt={item.title}
                />
                <p className="movie-title-card text-lg">{item.title}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
      <ButtonComponent />
    </div>
  );
};

export default Popular;
