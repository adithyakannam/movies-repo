import React, { useEffect, useState } from "react";
import { newMoviesApi } from "../../API/Api";
import Features from "./Features";
import Fallback from "../../Fallback";

const UpComming = () => {
  const [movies, setMovies] = useState(null);
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  const fetchData = async () => {
    try {
      const response = await newMoviesApi.get();
      setMovies(response.data.slice(0, 50));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {movies ? (
        <div className="w-[80%] m-auto">
          <Features movieList={movies} title={"Up Comming Movies"} />
        </div>
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default UpComming;
