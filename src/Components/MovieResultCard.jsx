import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function MovieCard({ movieData }) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={staggerContainer}
        >
          {/* Left Section - Poster */}
          <motion.div
            className="lg:w-1/3"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={movieData.Poster}
              alt={movieData.Title}
              className="w-full h-[500px] object-cover rounded-xl shadow-2xl"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Right Section - Details */}
          <motion.div
            className="lg:w-2/3 space-y-6"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white">{movieData.Title}</h1>

            {/* Year, Runtime, Rated */}
            <motion.div
              className="flex items-center gap-4 text-gray-400"
              variants={fadeIn}
            >
              <span className="bg-gray-800 px-3 py-1 rounded-full">
                {movieData.Year}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">
                {movieData.Runtime}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">
                {movieData.Rated}
              </span>
            </motion.div>

            {/* Genres */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              {movieData.Genre.split(", ").map((genre, idx) => (
                <motion.span
                  key={idx}
                  className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  {genre}
                </motion.span>
              ))}
            </motion.div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {movieData.Plot}
            </p>

            {/* Director and Cast */}
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-gray-500">Director:</span>{" "}
                {movieData.Director}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Cast:</span> {movieData.Actors}
              </p>
            </div>

            {/* Ratings */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={staggerContainer}
            >
              <motion.div
                className="bg-gray-800 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
                variants={fadeIn}
              >
                <div className="text-2xl font-bold text-yellow-500">
                  {movieData.imdbRating}
                </div>
                <div className="text-sm text-gray-400">IMDb Rating</div>
              </motion.div>
              {movieData.Ratings.map((rating, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-800 rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  variants={fadeIn}
                >
                  <div className="text-2xl font-bold text-yellow-500">
                    {rating.Value}
                  </div>
                  <div className="text-sm text-gray-400">{rating.Source}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="border-t border-gray-800 pt-6 space-y-2"
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Box Office:</span>
                <span className="text-green-500 font-semibold">
                  {movieData.BoxOffice}
                </span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">Awards:</span>{" "}
                {movieData.Awards}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MovieCard;
