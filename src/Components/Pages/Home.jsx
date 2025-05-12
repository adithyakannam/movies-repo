import React, { useEffect, useState } from "react";
import TrendingCarousel from "../Loading/TrendingCarousel";
import Api from "../../API/Api";
import Features from "./Features";
import { BiCameraMovie } from "react-icons/bi";
import MovieExperience from "./MovieExperience";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

const fetchApi = async () => {
  try {
    const response1 = await Api.get("/movies/watched/weekly?extended=images");
    saveWithExpiry("mostWatched", response1.data);

    const response2 = await Api.get("/movies/favorited/year?extended=images");
    saveWithExpiry("Popular", response2.data);

    const response3 = await Api.get("/movies/boxoffice?extended=images");
    saveWithExpiry("boxOffice", response3.data);

    const response4 = await Api.get("/movies/trending?extended=images");
    saveWithExpiry("trending", response4.data);

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


  // useEffect(() => {
  //   const cachedMostWatched = localStorage.getItem("mostWatched");
  //   const cachedPopular = localStorage.getItem("Popular");
  //   const cachedBoxOffice = localStorage.getItem("boxOffice");
  //   const cachedTrending = localStorage.getItem("trending");

  //   if (
  //     cachedMostWatched &&
  //     cachedPopular &&
  //     cachedBoxOffice &&
  //     cachedTrending
  //   ) {
  //     setMovies({
  //       trending: JSON.parse(cachedTrending),
  //       watched: JSON.parse(cachedMostWatched),
  //       favorited: JSON.parse(cachedPopular),
  //       boxOffice: JSON.parse(cachedBoxOffice),
  //     });
  //     setLoading(false);
  //   } else {
  //     fetchApi();
  //   }
  // }, []);

  useEffect(() => {
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr){
      localStorage.clear();
      return null
    } 

    try {
      const item = JSON.parse(itemStr);

      // If no timestamp exists, remove it and return null
      if (!item.timestamp) {
        localStorage.removeItem(key);
        return null;
      }

      const now = new Date().getTime();
      // 24 hours = 86400000 ms
      if (now - item.timestamp > 86400000) {
        localStorage.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      localStorage.clear()
      localStorage.removeItem(key);
      return null;
    }
  };

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

const saveWithExpiry = (key, data) => {
  const item = {
    data: data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

  return (
    <div>
      <MovieExperience/>

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