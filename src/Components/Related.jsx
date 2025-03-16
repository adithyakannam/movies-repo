import React, { useEffect, useState } from "react";
import { useLocation, useParams, NavLink, useNavigate } from "react-router-dom";
import Api from "../API/Api";

const Related = () => {
  const [related, setRelated] = useState([]);
  const { name, type, genreType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchType = location.pathname.includes("/genre/")
  ? "movies"
  : location.pathname.includes("/movies/")
  ? "movies"
  : "shows";
  useEffect(() => {
    const fetchData = async () => {
      let searchUrl;
      if (genreType) {
        searchUrl = `movies/${name}`;
      } else {
        searchUrl = type ? `${type}/${name}` : location.pathname;
      }
      try {
        const response4 = await Api.get(`${searchType}/${name}/related?extended=images`);
        setRelated(response4.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name, type, genreType, location.pathname]);

  const handlePosterClick = (slug) => {
    const pathParts = location.pathname.split('/');
    pathParts[pathParts.length - 1] = slug;
    const newPath = pathParts.join('/');
    navigate(newPath, { state: { from: location.pathname } });
  };

  return (
    <div className="recommendation-section mx-2">
      <h2 className="text-3xl font-bold border-l-4  border-blue-500 p-2 my-4">Related Recommendations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {related.map((item) => (
          <div key={item.ids.trakt} className="related-item">
            <div
              onClick={() => handlePosterClick(item.ids.slug)}
              className="cursor-pointer"
            >
              <img
                src={`https://${item.images.poster[0]}`}
                alt={item.title}
                className="related-poster m-auto border-1 w-[200px] h-auto object-cover rounded-lg shadow-md"
              />
              <p className="related-title mt-2 text-center text-white">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Related;
