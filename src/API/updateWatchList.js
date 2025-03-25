import Api, { userFetch } from "./Api";

export const updateWatchList = async (movies, userDetails) => {
  if (!userDetails?.id) {
    console.warn("No user details found in localStorage.");
    return;
  }

  if (!movies || movies.length === 0) {
    console.log("No movies in the watchlist.");
    return;
  }

  const moviesId = movies.map((item) => item.id);
  const userId = userDetails.id;

  try {
    // Fetch existing watchlist entries for the user
    const response = await userFetch.get(`/watchlist?id=${userId}`);
    let watchList = response.data;
    const moviesId = movies.map((item) => item.id);
    let newWatchList = {
      id: userId,
      moviesList: moviesId,
    };

    if (Array.isArray(watchList) && watchList.length > 0) {

      console.log("Updating existing watchlist:", newWatchList);

      // Update only one record (assumption: one user should have one watchlist entry)
      await userFetch.put(`/watchlist/${userId}`, newWatchList);
      console.log("Watchlist updated successfully.");
    } else {
      console.log("Creating new watchlist:", newWatchList);
      await userFetch.post("/watchlist", newWatchList);
      console.log("Watchlist created successfully.");
    }
  } catch (error) {
    console.error("Error updating watchlist:", error);
  }
};
