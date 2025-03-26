import React, { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useSearchParams,
  useParams,
} from "react-router-dom";
import Api from "../API/Api";
import { BiCameraMovie } from "react-icons/bi";
import { LuCircleUser  } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const NavBar = () => {
  const genresRef = useRef(null);
  const [ham, setHam] = useState(false);
  const [showGenres, setShowGenres] = useState(false); // State for toggling genres list
  const containerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { name, type } = useParams();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [name, type, searchParams.get("page")]);

  let userName = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("genres/movies");
        const filteredGenres = response.data.filter(
          (genre) => genre.name !== "None"
        );
        genresRef.current = filteredGenres;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  }, []);

  const activeStyle = {
    textDecoration: "#18a5c8 underline",
  };

  useEffect(() => {
    setHam(false);
  }, [name, type, searchParams]);

  let authenticated = JSON.parse(localStorage.getItem("authenticated"));

  const loginFunction = () => {
    authenticated = JSON.parse(localStorage.getItem("authenticated"));
    if (authenticated) {
      return (
        <span className="text-3xl">
          <FaUserCircle />
        </span>
      );
    } else {
      return "Login";
    }
  };

  const toggleNav = () => {
    setHam((prev) => !prev);
  };

  const toggleGenres = () => {
    setShowGenres((prev) => !prev);
  };

  return (
    <div ref={containerRef}>
      <div className="navbar-container">
        <div className={`hamburger ${ham ? "active" : ""}`} onClick={toggleNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`navbar`}>
          <div className={`menu ${ham ? "active" : ""}`}>
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
              to="up-comming"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Upcoming
            </NavLink>

            {/* Genres Button for Mobile */}
            <button
              className="genres-button flex items-center"
              onClick={toggleGenres}
            >
              Genres
              {showGenres ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )}
            </button>

            {/* Show Genres List on Click */}
            {showGenres && (
              <ul className="genres-list ">
                {genresRef.current.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      style={({ isActive }) => (isActive ? activeStyle : null)}
                      to={`genre/${item.slug}`}
                      state={item.slug}
                      className={"p-1 border-none"}
                      onClick={() => setShowGenres(false)} // Close list on click
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}

            <NavLink
              to="search"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Search
            </NavLink>
          </div>
          <div className={`${ham ? "active" : ""}`}>
            <Link to={"watchlist"}>Watchlist</Link>
            <Link to={`${authenticated ? "profile" : "login"}`}>
              {authenticated ? (
                <p className="text-xl flex flex-column justify-center items-center">
                  <span className="text-xl text-green-800">
                    <LuCircleUser />
                  </span>
                </p>
              ) : (
                "login"
              )}
            </Link>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
