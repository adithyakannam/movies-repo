import React, { useCallback, useEffect, useState } from "react";
import { newMoviesApi } from "../../API/Api";
import { NavLink } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import LoadingSkelton from "../Loading/LoadingSkelton";

const UpComming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await newMoviesApi.get();
      setMovies(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading){
    return <LoadingSkelton props={true}/>
  }

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 6 + columnIndex;
    if (index >= movies.length) return null;
    const item = movies[index].movie;
    let imageUrl = item.images.poster?.[0] || fallbackImage;

    if (imageUrl && !imageUrl.startsWith("https://")) {
      imageUrl = "https://" + imageUrl; // Prepend protocol if missing
    }

    return (
      <div style={style}>
        <NavLink
          className="list-item"
          to={`/up-comming/movies/${item.ids.slug}`}
          state={"movies"}
        >
          <img
            srcSet={`${imageUrl}`}
            src={`${imageUrl}`}
            loading="lazy"
            alt={item.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <p className="text-center mt-2">{item.title}</p>
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <h2 className="section-title mt-2">Up Comming</h2>
      {movies && (
        <div style={{ height: "82vh", width: "100vw", overflowY: "auto" }}>
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                columnCount={6}
                columnWidth={width / 6.1}
                height={height}
                rowCount={Math.ceil(movies.length / 6)}
                rowHeight={350}
                width={width}
              >
                {Cell}
              </Grid>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default UpComming;
