import axios from "axios";

const currentDate = new Date().toISOString().split("T")[0];

const Api = axios.create({
  baseURL: "https://api.trakt.tv/",
  headers: {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key":
      "c1d431718bc40bb776f78f8659ed86740079f00ed5449f9218d872bda609a60b",
  },
});

export default Api;

const newMoviesApi = axios.create({
  baseURL: `https://api.trakt.tv/calendars/all/movies/${currentDate}/7?extended=full,images`,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 0c736800fd8a97765c32ff619e3d458490119f417a0a49979e0dc38a448f14f1",
    "trakt-api-version": "2",
    "trakt-api-key":
      "c1d431718bc40bb776f78f8659ed86740079f00ed5449f9218d872bda609a60b",
  },
});
export { newMoviesApi };
