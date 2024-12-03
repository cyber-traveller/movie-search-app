import React from "react";
import placeholder from "../assets/poster-placeholder.jpg";
import { Link } from "react-router-dom";
function MovieCard({ movie }) {
  return (
    <div className="flex group hover:scale-[1.10] transition-all duration-300 ease-in-out">
      <div className="rounded-lg group-hover:rounded-r-none shadow-lg cursor-pointer">
        <Link to={`/movieDetails/${movie.imdbID}`}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
            alt="Poster"
            className="w-64 h-96 rounded-lg group-hover:rounded-r-none object-cover"
          />
        </Link>
      </div>
      <div
        id="info"
        className="bg-gray-800 text-white h-96 p-4 opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-64  rounded-r-lg shadow-xl transition-all duration-300 ease-in-out"
      >
        <div className="w-72 ">
          <h1 className="text-sm font-bold line-clamp-2 min-h-[3.5rem] w-[50%] ">
            {movie.Title}
          </h1>
          <p className="text-gray-300 mb-2">Year: {movie.Year}</p>
          <p className="text-gray-300 capitalize">Type: {movie.Type}</p>
          <Link to={`/movieDetails/${movie.imdbID}`}>
            <p className="text-blue-400 mt-4 hover:underline cursor-pointer">Read more</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
