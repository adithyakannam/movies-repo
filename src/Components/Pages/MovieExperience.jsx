import { useState } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function MovieExperience() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center  text-white">
      {/* Dark Overlay */}
      <div className="absolute  inset-0 bg-black bg-opacity-10">
        {/* <iframe
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="https://www.youtube.com/embed/CDx2fxb5ZF4?autoplay=1&mute=1&controls=0&loop=1&playlist=CDx2fxb5ZF4&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&fs=0"
          title="Cinematic Background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe> */}
      </div>

      <div className="relative z-10 text-center px-6 md:px-2 py-4 md:py-0">
        {/* Title with Icon */}
        <h1 className="text-6xl font-extrabold flex items-center justify-center space-x-4 neon-text">
          <span className="text-red-500">
            <BiCameraMovie size={70} />
          </span> &nbsp;
          <span className="tracking-widest">Cinema World</span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-2xl text-gray-300 max-w-2xl mx-auto animate-fadeIn">
          "Step into the world of cinema – where every frame tells a story!"
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Search for movies..."
            className="w-96 p-3 text-white text-3xl bg-gray-500 rounded-l-lg focus:outline-none"
          />
          <button
            style={{ padding: "1em" }}
            onClick={() => navigate(`search?query=${name}`)}
            className="bg-blue-600 hover:bg-blue-700 rounded-r-lg text-white font-bold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
