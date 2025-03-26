import React, { useEffect, useState } from "react";
import Api from "../../API/Api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useLocation, useSearchParams, useParams, NavLink } from "react-router-dom";
import LoadingSkelton from "../Loading/LoadingSkelton";

const GenreMovies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
const {type} = useParams()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await Api.get(
          `movies/popular?genres=${location.state}&extended=images&page=1&limit=24`);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [location]);


  if (loading) {
    return (
     <LoadingSkelton/>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center bg-blue-500 p-2">Top Movies</h2>
      <div className="movie-cards ">
              {movies.map((item, index) => {
                let imageUrl = item.images.poster?.[0] || item.movie.thumb?.[0];
      
                if (imageUrl && !imageUrl.startsWith("https://")) {
                  imageUrl = "https://" + imageUrl;
                }
                return (
                  <NavLink
                    key={item.ids.trakt}
                    to={`${location.pathname}/movies/${item.ids.slug}`}
                    state={`popular/movies`}
                    className={`list-item`}
                  >
                    <div className="movie-card ">
                      <img
                        src={imageUrl}
                        alt={item.title}
                      />
                      <p className="">
                        {item.title}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
    </div>
  );
};

export default GenreMovies;
