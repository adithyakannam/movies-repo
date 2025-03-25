import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import fallback from "../../assets/movie_fallback.jpg";

const Features = ({ movieList, title, ranking }) => {
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  return (
    <>
      <h2 className="section-title m-0">{title}</h2>
      <div className={`list-container`}>
        {movieList.map((item, index) => {
          let imageUrl = item.movie.images.poster?.[0] || fallbackImage;

          if (imageUrl && !imageUrl.startsWith("https://")) {
            imageUrl = "https://" + imageUrl; // Prepend protocol if missing
          }

          return (
            <NavLink
              className="list-item"
              key={imageUrl + index}
              to={`/movies/${item.movie.ids.slug}`}
              state={"movies"}
            >
              <div>
                <img
                  src={`${imageUrl}`}
                  loading="lazy"
                  alt={item.movie.title}
                  className="h-[22em]"
                />
                {ranking && <span className="index">{index + 1}</span>}
              </div>
              <p>{item.movie.title}</p>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(Features);
