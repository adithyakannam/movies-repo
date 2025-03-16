import React, { useEffect, useState } from "react";
import Api from "../../API/Api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useLocation, useSearchParams, useParams, NavLink } from "react-router-dom";

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
      <div className="container">
        <SkeletonTheme
          baseColor="#bab6b6"
          highlightColor="#444"
          direction="ltr"
        >
          <p className="movie-cards">
            <Skeleton count={20} containerClassName="loading-card" />
          </p>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center bg-blue-500 p-2">Top Movies</h2>
      <div className="movie-cards grid grid-cols-2 lg:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
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
                    <div className="movie-card rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-auto"
                      />
                      <p className="movie-info-popular">
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
