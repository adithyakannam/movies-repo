import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import Api from "../../API/Api";
import LoadingSkelton from "../Carousel/LoadingSkelton";
import ButtonComponent from "../../ButtonFunctions/ButtonComponent";
import { BiSolidEditLocation } from "react-icons/bi";
import Features from "./Features";

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
      <h2 className="text-center heading">Most Popular</h2>
      <div className="movie-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
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
                <p className="movie-info-popular">{item.title}</p>
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
