import React, { useEffect, useState } from "react";
import { newMoviesApi } from "../../API/Api";
import { NavLink } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import LoadingSkelton from "../Loading/LoadingSkelton";
import { useWindowSize } from "@uidotdev/usehooks";

const UpComming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowSize(); // Get window width
  const fallbackImage =
    "img.freepik.com/free-photo/assortment-movie-elements-red-background-with-copy-space_23-2148457859.jpg?t=st=1741628541~exp=1741632141~hmac=a28963ec3815792e81a863be1540adaa17ba85b8acec2b231e909f8a90e3c47a&w=900";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await newMoviesApi.get();
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSkelton props={true} />;
  }

  const getColumnCount = () => {
    if (width > 1200) return 6;
    if (width > 992) return 4;
    if (width > 768) return 3;
    return 2;
  };

  const columnCount = getColumnCount();

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= movies.length) return null;
    const item = movies[index].movie;
    let imageUrl = item.images.poster?.[0] || fallbackImage;

    if (imageUrl && !imageUrl.startsWith("https://")) {
      imageUrl = "https://" + imageUrl; // Prepend protocol if missing
    }

    return (
      <div style={style}>
        <NavLink
          to={`/up-comming/movies/${item.ids.slug}`}
          state={"movies"}
          className={`list-item `}
        >
          <div className="movie-card">
            <img src={imageUrl} alt={item.title} className="" />
            <p className="movie-title-card text-lg">{item.title}</p>
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      {movies && (
        <div
          style={{
            height: "100vh",
            width: "100%",
            paddingTop: "5em",
            overflow: "hidden",
          }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                columnCount={columnCount}
                columnWidth={width / (columnCount + 0.5)}
                height={height}
                rowCount={Math.ceil(movies.length / columnCount)}
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
