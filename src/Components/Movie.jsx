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
        const response2 = await Api.get(`${searchType}/${name}/seasons`);
        setSeasons(response2.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();
  }, [name, type, location.pathname]);

 

  if (!movie) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <button onClick={() => navigate(-1)} className="absolute p-1 m-5">
          <span className="text-4xl">
            <IoMdArrowRoundBack />
          </span>
        </button>
        <p>
          <Skeleton />
        </p>
      </SkeletonTheme>
    );
  }
  console.log(movie);

  // const movieComponent = (
  //   <div
  //     ref={containerRef}
  //     className="relative flex justify-center items-center w-full h-screen"
  //   >
  //     {/* Back Button */}
  //     <button
  //       onClick={() => navigate(-1)}
  //       className="fixed z-1 top-25 left-10 hover:bg-black/20 text-white p-2 rounded-full transition-all duration-300 cursor-pointer"
  //     >
  //       <IoMdArrowRoundBack className="text-3xl" />
  //     </button>

  //     {/* Movie Background */}
  //     <div className="absolute z-[-1] inset-0">
  //       <img
  //         className="w-full h-full object-cover object-center fixed brightness-50"
  //         src={`https://${movie.images.fanart[0]}?w=248&fit=crop&auto=format`}
  //         alt={movie.title}
  //       />
  //     </div>

  //     {/* Content Container */}
  //     <div className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-10 rounded-lg w-[80%] mx-auto mt-10">
  //       {/* Movie Poster */}
  //       <div className="w-[250px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
  //         <img
  //           className="w-full h-auto object-cover"
  //           srcSet={`https://${movie.images.poster[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
  //           src={`https://${movie.images.poster[0]}?w=248&fit=crop&auto=format`}
  //           alt={movie.title}
  //         />
  //       </div>

  //       <div className="text-white opacity-100">
  //         <p className="text-7xl font-bold text-blue-500 movie-title">
  //           {movie.title}
  //         </p>
  //         <p className="italic text-gray-300">{movie.tagline}</p>
  //         <p className="text-xl">{movie.overview}</p>

  //         <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xl">
  //           <p>
  //             <strong>📅 Released:</strong>{" "}
  //             <span className=" font-bold text-blue-500">
  //               {movie.released
  //                 ? movie.released
  //                 : movie.first_aired.slice(0, 10)}
  //             </span>
  //           </p>
  //           <p>
  //             <strong>⏳ Runtime:</strong>
  //             <span className="text-blue-500">
  //               {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
  //             </span>
  //           </p>
  //           <p>
  //             <strong>🌍 Country:</strong>{" "}
  //             <span className="text-blue-500">
  //               {movie.country.toUpperCase()}
  //             </span>
  //           </p>
  //           <p>
  //             <strong>⭐ Rating:</strong>{" "}
  //             <span className="text-blue-500">{movie.rating.toFixed(2)}</span> (
  //             {movie.votes} votes )
  //           </p>
  //           <p>
  //             <strong>🗣 Language:</strong>{" "}
  //             <span className="text-blue-500">
  //               {movie.language.toUpperCase()}
  //             </span>
  //           </p>
  //           <p>
  //             <strong>🎭 Genres:</strong>{" "}
  //             <span className="text-blue-500">{movie.genres?.join(", ")}</span>
  //           </p>
  //           <p>
  //             <strong>🎥 Network:</strong>{" "}
  //             <span className="text-blue-500">{movie.network}</span>
  //           </p>
  //           <p>
  //             <strong>🥤 Status:</strong>{" "}
  //             <span className="text-blue-500">{movie.status}</span>
  //           </p>
  //         </div>

  //         {/* Trailer, Homepage & Watchlist Buttons */}
  //         <div className="flex gap-4 mt-4">
  //           <button
  //             onClick={() => handleShowTrailer(movie.trailer)}
  //             className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition-all"
  //           >
  //             🎬 Watch Trailer
  //           </button>
  //           <a
  //             href={movie.homepage}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition-all"
  //           >
  //             🌐 Visit Homepage
  //           </a>
  //           <button
  //             onClick={toggleWatchlist}
  //             className={`px-4 py-2 rounded-lg font-semibold transition-all ${
  //               isInWatchlist
  //                 ? "bg-green-600 hover:bg-green-700 text-white"
  //                 : "bg-gray-600 hover:bg-gray-700 text-white"
  //             }`}
  //           >
  //             {isInWatchlist ? "✅ Added to Watchlist" : "➕ Add to Watchlist"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative">
      {movie && 
      <MovieComponent movie={movie} handleShowTrailer={handleShowTrailer} />
      }
      {showTrailer && (
        <div className="fixed h-[100vh] inset-0 z-15 bg-black">
          <Trailer src={trailerSrc} />
          <button
            onClick={handleHideTrailer}
            className="fixed z-15 top-20 right-5 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full "
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
