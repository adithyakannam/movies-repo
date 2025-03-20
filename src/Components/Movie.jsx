import React, { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Api from "../API/Api";
import { IoMdArrowRoundBack } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Seasons from "./Pages/Series/Seasons";
import CastList from "./Pages/CastList";
import Related from "./Related";
import Trailer from "./Trailer"; // Import the new Trailer component
import { ImCross } from "react-icons/im";
import MovieComponent from "./Pages/MovieComponent";
import MovieSkeleton from "./Loading/MovieSkeleton";

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const navigate = useNavigate();

  const { name, type } = useParams();
  const location = useLocation();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerSrc, setTrailerSrc] = useState("");

  const handleShowTrailer = (src) => {
    setTrailerSrc(src);
    setShowTrailer(true);
  };

  const handleHideTrailer = () => {
    setShowTrailer(false);
    setTrailerSrc("");
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [name]);

  const searchType = location.pathname.includes("/genre/")
    ? "movies"
    : location.pathname.includes("/movies/")
    ? "movies"
    : "shows";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response1 = await Api.get(
          `${searchType}/${name}?extended=full,images`
        );
        setMovie(response1.data);
        setLoading(false);
        const response2 = await Api.get(`${searchType}/${name}/seasons`);
        setSeasons(response2.data);
      } catch (error) {
        console.error("Error fetching data:");
      }
    };

    fetchData();
  }, [name, type, location.pathname]);

  return (
    <div className="relative">
      {loading ? (
        <MovieSkeleton />
      ) : (
        movie && (
          <MovieComponent movie={movie} handleShowTrailer={handleShowTrailer} />
        )
      )}
      {showTrailer && (
        <div className="fixed h-auto inset-0 z-15 bg-black">
          <Trailer src={trailerSrc} />
          <button
            onClick={handleHideTrailer}
            className="fixed z-15 top-20 right-10 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full "
          >
            <ImCross />
          </button>
        </div>
      )}
      <hr />
      <CastList />
      {seasons && (
        <>
          <hr />
          <Seasons showName={movie.ids.slug} />
        </>
      )}
      <hr />
      <Related />
    </div>
  );
};

export default Movie;
