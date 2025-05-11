import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "../../../API/Api";
import { SeasonSkeleton } from "../../Loading/LoadingSkelton";

const Seasons = ({ showName }) => {
  const [seasonsData, setSeasonsData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Api.get(
        `shows/${showName}/seasons?extended=episodes,full,images`
      );
      setSeasonsData(response.data);
      setLoading(false);
      // Set default season to the first season
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showName]);

  const handleSeasonClick = (seasonNumber) => {
    setSearchParams({ season: seasonNumber });
  };
  if (loading) {
    return <SeasonSkeleton />;
  }

  return (
    <div className="bg-transparent">
      <div className="px-4 w-full">
        {seasonsData.length > 0 && (
          <select
            className=" w-[150px] px-4 py-2 mx-1 text-white bg-gray-800 rounded-lg transition cursor-pointer"
            value={searchParams.get("season") || ""}
            onChange={(e) => handleSeasonClick(e.target.value)}
          >
            <option value="" disabled>
              Select Season
            </option>
            {seasonsData
              .filter((item) => item.number != 0)
              .map((season) => (
                <option
                  key={season.number}
                  value={season.number}
                  className={`bg-blue ${
                    searchParams.get("season") == season.number
                      ? "bg-blue-500"
                      : ""
                  }`}
                >
                  {`S${
                    season.number < 10 ? `0${season.number}` : season.number
                  }`}
                </option>
              ))}
          </select>
        )}
      </div>

      {searchParams.get("season") && (
        <div className="season-details bg-transparent text-white">
          {seasonsData
            .filter(
              (season) => season.number === parseInt(searchParams.get("season"))
            )
            .map((season) => (
              <div key={season.number} className="space-y-6 px-4">
                <h2 className="text-3xl font-bold border-l-4 border-blue-500 p-2">
                  Season
                </h2>

                {/* Season Poster and Info */}
                <div className="flex flex-col md:flex-row md:items-start items-center gap-6 max-w-7xl mx-auto">
                  <img
                    src={`https://${season.images.poster[0]}`}
                    alt={`Season ${season.number} Poster`}
                    className="w-full max-w-xs h-auto rounded-lg shadow-lg border border-gray-700"
                  />
                  <div className="px-4 py-4 w-full md:w-[70%] backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black/30 rounded-md">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {season.title}
                    </h2>
                    <p className="text-gray-300 mt-2">{season.overview}</p>
                    <p className="mt-2">Network: {season.network}</p>
                    <p className="mt-1">Rating: {season.rating.toFixed(1)}</p>
                    <p className="mt-1">
                      Released:{" "}
                      {season.first_aired
                        ? season.first_aired.slice(0, 10)
                        : ""}
                    </p>
                    <p className="mt-1">
                      Episodes {season.aired_episodes}/{season.episode_count}
                    </p>
                  </div>
                </div>

                {/* Episodes List */}
                <h3 className="text-2xl font-semibold border-l-4 mt-5 border-blue-500 p-2">
                  Episodes
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                  {season.episodes.map((episode) => (
                    <li
                      key={episode.number}
                      className="rounded-lg p-3 shadow-lg hover:shadow-xl transition backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black/30 flex flex-col sm:flex-row gap-4"
                    >
                      <img
                        src={`https://${episode.images.screenshot[0]}`}
                        alt={`Episode ${episode.number} Screenshot`}
                        className="w-full sm:w-[40%] h-auto object-cover rounded"
                      />
                      <div className="w-full sm:w-[60%]">
                        <h3 className="font-semibold mb-2">
                          Episode {episode.number}: {episode.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {episode.overview}
                        </p>
                        <p className="text-sm text-gray-400">
                          ⭐ {episode.rating.toFixed(1)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Seasons;
