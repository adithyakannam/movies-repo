import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import Api from "../../API/Api";
import LoadingSkelton from "../Loading/LoadingSkelton";
import ButtonComponent from "../../ButtonFunctions/ButtonComponent";
import ButtonType from "../../ButtonFunctions/ButtonType";
import { MdHeight } from "react-icons/md";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const pageRef = useRef(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      let type = searchParams.get("type") || "played";
      try {
        setLoading(true)
        const response1 = await Api.get(
          `/shows/${type}?extended=images&page=${searchParams.get(
            "page"
          )}&limit=24`);
        setShows(response1.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageRef.current, searchParams]);



  if (loading) {
    return (
      <LoadingSkelton />
    );
  }

  return (
    <div className="container" >
      <h2 className="text-center heading">Popular Tv Shows</h2>
      <div className=" my-3">
        <ButtonType prop={"watched"}>
          {"Most Watched"}
        </ButtonType>
        <ButtonType prop={"trending"}>
          {"trending"}
        </ButtonType>
        <ButtonType prop={"favorited"}>
          {"favorited"}
        </ButtonType>
      </div>
      <div className="movie-cardsmovie-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {shows.map((item, index) => {
          let imageUrl =
            item.show.images.poster?.[0] || item.show.images.thumb?.[0] || "";

          if (imageUrl && !imageUrl.startsWith("https://")) {
            imageUrl = "https://" + imageUrl; // Prepend protocol if missing
          }
          return (
            <NavLink
              to={`/shows/${item.show.ids.slug}?season=1`}
              key={item.show.ids.trakt}
              state={"shows"}
              className={`list-item`}
            >
              <div className="movie-card rounded-lg overflow-hidden ">
                <img
                  src={imageUrl}
                  alt={item.show.title}
                  className=""
                />
                <p className="movie-title-card">
                  {item.show.title}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
      <ButtonComponent />
    </div>
  );
};

export default TvShows;
