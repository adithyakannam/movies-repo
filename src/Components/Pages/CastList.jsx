import React, { useEffect, useState } from "react";
import Api from "../../API/Api";
import { useLocation, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoadingSkelton, { CastSkeleton } from "../Loading/LoadingSkelton";

const CastList = () => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name, type } = useParams();
  const location = useLocation();
  let searchType = location.pathname.includes("/genre/")
    ? "movies"
    : location.pathname.includes("/movies/")
    ? "movies"
    : "shows";
  const fetchCast = async () => {
    try {
      setLoading(true);
      const response = await Api.get(
        `${searchType}/${name}/people?extended=full,images`
      );
      setCast(response.data.cast || []);
      setCrew(response.data.crew || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCast();
  }, [name]);

  if(loading){
    return <CastSkeleton/>
  }

  return (
    <div className="h-full">
          <h1 className="text-center">Meet the Cast</h1>
          <ul className="grid-container">
            {cast.slice(0, 10).map((member) => (
              <li key={member.person.ids.slug} className="grid-item">
                <div className="w-[200px] h-[300px] overflow-hidden border-1">
                  <img
                    src={`https://${
                      member.images.headshot?.[0] ||
                      "cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png"
                    }`}
                    alt={member.person.name}
                    className="cast-photo object-cover h-full w-full "
                  />
                </div>
                <p className="m-0">{member.person.name}</p>
                <p className="text-gray-400 m-0 italic">{member.character}</p>
              </li>
            ))}
          </ul>
    </div>
  );
};

export default CastList;
