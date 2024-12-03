import React, { useState, useEffect } from "react";
import alienBanner from "../assets/bannerImages/alien.png";
import kkBanner from "../assets/bannerImages/kk.png";
import armBanner from "../assets/bannerImages/arm.png";
import tmkBanner from "../assets/bannerImages/tmk.png";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  const banners = [
    { image: alienBanner, alt: "Alien Banner" },
    { image: kkBanner, alt: "KK Banner" },
    { image: armBanner, alt: "Arm Banner" },
    { image: tmkBanner, alt: "TMK Banner" },
  ];

  const API_KEY = "69f85e4e"; // Your OMDB API Key

  // Fetch movies based on category keywords
  useEffect(() => {
    const fetchMoviesByCategory = async (keyword, setMovies) => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}&type=movie`
        );
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error(`Failed to fetch ${keyword} movies:`, error);
      }
    };

    // Fetch movies for different categories
    fetchMoviesByCategory("Avengers", setPopularMovies);
    fetchMoviesByCategory("Inception", setTopRatedMovies);
    fetchMoviesByCategory("Spider-Man", setNowPlayingMovies);
    fetchMoviesByCategory("Batman", setComingSoonMovies);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1);
  };

  // Section Component
  const MovieSection = ({ title, movies }) => (
    <section className="mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#00a8e1]">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No movies available.
          </p>
        )}
      </div>
    </section>
  );

  return (
    <div className="h-[100vh] bg-gray-900 text-gray-100">
      {/* Banner Section */}
      <section className="relative h-[150px] lg:h-[500px] overflow-hidden">
        <div className="relative h-full w-full">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute h-full w-full transform transition-all duration-500 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Banner Image */}
              <img
                src={banner.image}
                alt={banner.alt}
                className="lg:h-full lg:w-full lg:object-cover opacity-80"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "bg-[#00a8e1] w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Movie Sections */}
      <MovieSection title="Popular Movies" movies={popularMovies} />
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
      <MovieSection title="Now Playing" movies={nowPlayingMovies} />
      <MovieSection title="Coming Soon" movies={comingSoonMovies} />
    </div>
  );
}

export default HomePage;
