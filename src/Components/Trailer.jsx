import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Trailer = ({ src }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (src) {
      const url = new URL(src);
      const videoId = url.searchParams.get('v');
      if (videoId) {
        const newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        setVideoUrl(newUrl);
      }
    }else{
        setVideoUrl(null)
        console.log("nope")
    }
  }, [src]);

  console.log("running");

  return (
    <div className="relative flex justify-center items-center w-full h-full overflow-hidden ">
      {videoUrl ? (
        <iframe
          width="914"
          height="514"
          src={videoUrl}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <h2>Oops! No video found</h2>
      )}
    </div>
  );
};

export default Trailer;
