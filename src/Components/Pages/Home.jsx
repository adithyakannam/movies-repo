import React, { useEffect, useState } from "react";
import TrendingCarousel from "../Loading/TrendingCarousel";
import Api from "../../API/Api";
import Features from "./Features";
import { BiCameraMovie } from "react-icons/bi";
import MovieExperience from "./MovieExperience";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

  // Helper to store item with expiry
  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  // Helper to retrieve item with expiry check
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  };

  const fetchApi = async () => {
    try {
      const response1 = await Api.get("/movies/watched/weekly?extended=images");
      setWithExpiry("mostWatched", response1.data, 86400000);

      const response2 = await Api.get("/movies/favorited/year?extended=images");
      setWithExpiry("Popular", response2.data, 86400000);

      const response3 = await Api.get("/movies/boxoffice?extended=images");
      setWithExpiry("boxOffice", response3.data, 86400000);

      const response4 = await Api.get("/movies/trending?extended=images");
      setWithExpiry("trending", response4.data, 86400000);

      setMovies({
        trending: response4.data,
        watched: response1.data,
        favorited: response2.data,
        boxOffice: response3.data,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedMostWatched = getWithExpiry("mostWatched");
    const cachedPopular = getWithExpiry("Popular");
    const cachedBoxOffice = getWithExpiry("boxOffice");
    const cachedTrending = getWithExpiry("trending");

    if (
      cachedMostWatched &&
      cachedPopular &&
      cachedBoxOffice &&
      cachedTrending
    ) {
      setMovies({
        trending: cachedTrending,
        watched: cachedMostWatched,
        favorited: cachedPopular,
        boxOffice: cachedBoxOffice,
      });
      setLoading(false);
    } else {
      fetchApi();
    }
  }, []);

  return (
    <div>
      <MovieExperience />

      <div className="outer-container">
        {!loading && (
          <Features
            movieList={movies.trending}
            title={"Trending"}
            ranking={true}
            overflow={false}
          />
        )}
      </div>
      <div className="outer-container">
        {!loading && (
          <Features movieList={movies.watched} title={"Most Watched"} />
        )}
      </div>
      <div className="outer-container">
        {!loading && (
          <Features movieList={movies.favorited} title={"Popular"} />
        )}
      </div>
      <div className="outer-container">
        {!loading && (
          <Features movieList={movies.boxOffice} title={"Box Office"} />
        )}
      </div>
    </div>
  );
};

export default Home;
