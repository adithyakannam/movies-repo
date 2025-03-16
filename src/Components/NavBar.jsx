import React, { useMemo, useRef, useEffect } from "react";
import { NavLink, Link, Outlet, useSearchParams, useParams } from "react-router-dom";
import Api from "../API/Api";
import { BiCameraMovie } from "react-icons/bi";

const NavBar = () => {
  const [genres, setGenres] = React.useState([]);
  const containerRef = useRef(null);
  const [searchParams] = useSearchParams()
  const {name,type} = useParams();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [name,type]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("genres/movies");
        const filteredGenres = response.data.filter(
          (genre) => genre.name !== "None"
        );
        setGenres(filteredGenres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const activeStyle = {
    textDecoration: "#18a5c8 underline",
  };

  return (
    <div ref={containerRef}>
      <nav className="navbar">
        <div>
          <NavLink to="/">
            <span className="inline-block text-4xl">
              <BiCameraMovie />
            </span>
          </NavLink>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Home
          </NavLink>
          <NavLink
            to="popular"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Popular
          </NavLink>

          <NavLink
            to="shows"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Tv Shows
          </NavLink>
          <NavLink
            to="upcomming"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Upcoming
          </NavLink>
          <NavLink className={"genres-button"}>Genres</NavLink>
          <ul className="genres-list">
            {genres.map((item, index) => {
              return (
                <li key={item.name}>
                  <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to={`genre/${item.slug}`}
                    state={item.slug}
                    className={"p-1 border-none"}
                  >
                    <span className="">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <NavLink
            to="search"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Search
          </NavLink>
        </div>
        <div>
          <Link
          to={'watchlist'}
          >WatchList</Link>
          <Link
          to={'Login'}
          >Login</Link>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
