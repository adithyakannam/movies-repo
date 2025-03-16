import React, { useEffect, useState, useMemo } from "react";
import Api from "../../API/Api";
import Features from "./Features";
import {
  useLocation,
  useParams,
  useSearchParams,
  NavLink,
} from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  const fetchMovie = async (movie) => {
    try {
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

  const memoizedData = useMemo(() => data, [data]);

  return (
    <>
      <div className="w-[80%] m-auto p-2">
        <div className="search-container m-auto w-[60%] my-5">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="w-[80%] h-[2.5em] text-black"
              type="search"
              name="query"
              value={search}
              placeholder="Search..."
              onChange={handleChange}
            />
            <button className="">Search</button>
          </form>
        </div>
        <div className="mt-3">
          {/* <Features
            movieList={memoizedData}
            overflow={true}
            title={"Search Result"}
          /> */}
        </div>
      </div>

      <>
        <h2 className="section-title">Search Result</h2>
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1`}
        >
          {data.map((item, index) => {
            const isMovie = item.type === "movie";
            const content = isMovie ? item.movie : item.show;
            let imageUrl =
              content.images.poster?.[0] ||
              "https://cdn.pixabay.com/photo/2024/10/04/03/58/ai-generated-9095259_1280.jpg";

            if (imageUrl && !imageUrl.startsWith("https://")) {
              imageUrl = "https://" + imageUrl; // Prepend protocol if missing
            }

            return (
              <NavLink
                className="list-item"
                key={imageUrl + index}
                state={`search/${isMovie ? "movies" : "shows"}`}
                to={`${location.pathname}/${isMovie ? "movies" : "shows"}/${
                  content.ids.slug}`}
              >
                <img
                  srcSet={`${imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${imageUrl}?w=248&fit=crop&auto=format`}
                  loading="lazy"
                  alt={content.title}
                />
                <p>{`${content.title.slice(0, 28)}${
                  content.title.length > 28 ? "..." : ""
                }`}</p>
              </NavLink>
            );
          })}
        </div>
      </>
    </>
  );
};

export default Search;
