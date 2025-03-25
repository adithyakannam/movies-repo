import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Popular from "./Components/Pages/Popular";
import Movie from "./Components/Movie";
import GenreMovies from "./Components/Pages/GenreMovies";
import TvShows from "./Components/Pages/TvShows";
import Search from "./Components/Pages/Search";
import UpComming from "./Components/Pages/UpComming";
import NavBar from "./Components/NavBar";
import Trailer from "./Components/Trailer";
import Fallback from "./Fallback";
import Watchlist from "./Components/Pages/WatchList";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import SignUp from "./SignUp";
import Profile from "./Components/Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route index element={<Home />} />
            <Route path="popular" element={<Popular />} />
            <Route path="popular/:type/:name" element={<Movie />} />
            <Route path="movies/:name" element={<Movie />} />
            <Route path="search" element={<Search />} />
            <Route path="search/:type/:name" element={<Movie />} />
            <Route path="shows" element={<TvShows />} />
            <Route path="shows/:name" element={<Movie />} />
            <Route path="genre/:type" element={<GenreMovies />} />
            <Route path="genre/:type/movies/:name" element={<Movie />} />
            <Route path="up-comming" element={<PrivateRoute />}>
              <Route index element={<UpComming />} />
              <Route path="movies/:name" element={<Movie />} />
            </Route>
            <Route path="trailer" element={<Trailer />} />
            <Route path="watchlist" element={<PrivateRoute />}>
              <Route index element={<Watchlist />} />
              <Route path=":type/:name" element={<Movie />} />
            </Route>
            <Route path="profile" element={<PrivateRoute/>}>
              <Route index element={<Profile/>} />
            </Route>
            <Route path="*" element={<Fallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
