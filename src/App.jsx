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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
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
            <Route path="up-comming" element={<UpComming />} />
            <Route path="up-comming/movies/:name" element={<Movie />} />
            <Route path="trailer" element={<Trailer />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="watchlist/:type/:name" element={<Movie />} />
            <Route path="*" element={<Fallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
