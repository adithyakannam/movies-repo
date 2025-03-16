import React, { useEffect, useState } from "react";
import TrendingCarousel from "../Carousel/TrendingCarousel";
import Api from "../../API/Api";
import Features from "./Features";
import { BiCameraMovie } from "react-icons/bi";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

  const fetchApi = async () => {
    try {
      const response1 = await Api.get("/movies/watched/weekly?extended=images");
      localStorage.setItem("mostWatched", JSON.stringify(response1.data));

      const response2 = await Api.get("/movies/favorited/year?extended=images");
      localStorage.setItem("Popular", JSON.stringify(response2.data));

      const response3 = await Api.get("/movies/boxoffice?extended=images");
      localStorage.setItem("boxOffice", JSON.stringify(response3.data));

      const response4 = await Api.get("/movies/trending?extended=images");
      localStorage.setItem("trending", JSON.stringify(response4.data));

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
    const cachedMostWatched = localStorage.getItem("mostWatched");
    const cachedPopular = localStorage.getItem("Popular");
    const cachedBoxOffice = localStorage.getItem("boxOffice");
    const cachedTrending = localStorage.getItem("trending");

    if (
      cachedMostWatched &&
      cachedPopular &&
      cachedBoxOffice &&
      cachedTrending
    ) {
      setMovies({
        trending: JSON.parse(cachedTrending),
        watched: JSON.parse(cachedMostWatched),
        favorited: JSON.parse(cachedPopular),
        boxOffice: JSON.parse(cachedBoxOffice),
      });
      setLoading(false);
    } else {
      fetchApi();
    }
  }, []);


  return (
    <div>
      {/* <TrendingCarousel /> */}
      <div className="bg-image">
        <div className="left-col">
          <h1>
            <span className="camera">
              <BiCameraMovie />
            </span>
            <span className="focus"></span>
            Movies
          </h1>
        </div>
        <div className="right-col">
          
        </div>
      </div>
      
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
