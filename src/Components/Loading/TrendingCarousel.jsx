import React, { useEffect, useState, useMemo } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Api from "../../API/Api";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/movies/trending?extended=images", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key":
              "c1d431718bc40bb776f78f8659ed86740079f00ed5449f9218d872bda609a60b",
          },
        });
        setTrending(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const memoizedCarouselItems = useMemo(() => {
    return trending.map((item, index) => {
      let imageUrl =
        item.movie.images.fanart?.[0] || "https://via.placeholder.com/150";

      if (imageUrl && !imageUrl.startsWith("https://")) {
        imageUrl = "https://" + imageUrl; // Prepend protocol if missing
      }

      return (
        <div key={index}>
          <img src={imageUrl} alt={item.movie.title} />
          <p className="legend">{item.movie.title}</p>
        </div>
      );
    });
  }, [trending]);

  return (
    <div>
      {trending.length > 0 ? (
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          dynamicHeight={true}
        >
          {memoizedCarouselItems}
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrendingCarousel;
