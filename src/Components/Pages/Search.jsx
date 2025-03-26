import React, { useEffect, useState, useMemo } from "react";
import Api from "../../API/Api";
import Features from "./Features";
import {
  useLocation,
  useParams,
  useSearchParams,
  NavLink,
} from "react-router-dom";
import LoadingSkelton from "../Loading/LoadingSkelton";
import { MdHeight } from "react-icons/md";

const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const fallbackImage =
    "https://cdn.pixabay.com/photo/2024/10/04/03/58/ai-generated-9095259_1280.jpg";
  const fetchMovie = async (movie) => {
    try {
      setLoading(true);
      const response1 = await Api.get(
        `search/movie,show?query=${movie}&extended=images`
      );
      setData(response1.data);
      localStorage.setItem("searchData", JSON.stringify(response1.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: search });
    fetchMovie(search);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearch(query);
      fetchMovie(query);
    } else {
      const cachedData = localStorage.getItem("searchData");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      }
    }
  }, []);

  const searchResults = (
    <>
      <h2 className="section-title">Search Result</h2>
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4`}>
        {data.map((item, index) => {
          const isMovie = item.type === "movie";
          const content = isMovie ? item.movie : item.show;
          let imageUrl = content.images.poster?.[0] || fallbackImage;

          if (imageUrl && !imageUrl.startsWith("https://")) {
            imageUrl = "https://" + imageUrl; // Prepend protocol if missing
          }

          return (
            <NavLink
              className="list-item"
              key={imageUrl + index}
              state={`search/${isMovie ? "movies" : "shows"}`}
              to={`${location.pathname}/${isMovie ? "movies" : "shows"}/${
                content.ids.slug
              }`}
            >
              <div >
                <img
                  srcSet={`${imageUrl}`}
                  loading="lazy"
                  alt={content.title}
                />
              </div>
              <p>{`${content.title.slice(0, 28)}${
                content.title.length > 28 ? "..." : ""
              }`}</p>
            </NavLink>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <div className="search-container">

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="text-black"
            type="search"
            name="query"
            value={search}
            placeholder="🎬 Every Movie Tells a Story — Find Yours & Start Watching! 🍿"
            onChange={handleChange}
          />
          <button className="">Search</button>
        </form>
      </div>
      {loading ? <LoadingSkelton props={true} /> : searchResults}
    </>
  );
};

export default Search;
