import axios from "axios";

// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCv_cAQhBHc1G72izpdxtjgL2l80UjbmDw",
//   authDomain: "movies-6a915.firebaseapp.com",
//   projectId: "movies-6a915",
//   storageBucket: "movies-6a915.firebasestorage.app",
//   messagingSenderId: "505970984411",
//   appId: "1:505970984411:web:8197700b074546769f53fe",
//   measurementId: "G-Y5E4Z8531B"
// };

// const app = initializeApp(firebaseConfig);

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

const userFetch = () => {
  baseURL: "localhost:3000";
};
export { userFetch };


