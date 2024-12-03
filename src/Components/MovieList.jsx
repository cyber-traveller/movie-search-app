import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { ApiResponseContext } from "../App";
import flimbg from "../assets/flimbg.png";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function MovieList() {
  const { apiResponse, page, setPage } = useContext(ApiResponseContext);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Movies grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 gap-y-8 md:gap-y-10 place-items-center p-3 md:p-4">
        {apiResponse && apiResponse.Search ? (
          // Animate the list of movie cards
          apiResponse.Search.map((movie, index) => (
            <motion.div
              key={index}
              className="w-full"
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              variants={cardVariants}
            >
              {/* Pass the movie data to the MovieCard component */}
              <MovieCard movie={movie} />
            </motion.div>
          ))
        ) : (
          // No results found section
          <motion.div
            className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={flimbg}
              alt="No Results"
              className="mx-auto w-32 h-32 object-cover"
            />
            <p className="text-lg font-bold text-gray-600">No Results Found...</p>
          </motion.div>
        )}
      </section>

      {/* Pagination buttons */}
      <div className="flex justify-center items-center gap-3">
        {page > 1 ? (
          <motion.button
            onClick={() => setPage(page - 1)}
            className="bg-blue-600 text-white p-2 rounded-lg px-3 font-bold shadow-md hover:shadow-lg transition-all duration-300 ease-linear"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        ) : (
          <button
            className="bg-gray-400 text-white p-2 rounded-lg px-3 font-bold opacity-50 cursor-not-allowed"
            disabled
          >
            Previous
          </button>
        )}
        {apiResponse && apiResponse.totalResults > page * 10 ? (
          <motion.button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white p-2 rounded-lg px-3 font-bold shadow-md hover:shadow-lg transition-all duration-300 ease-linear"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        ) : (
          <button
            className="bg-gray-400 text-white p-2 rounded-lg px-3 font-bold opacity-50 cursor-not-allowed"
            disabled
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieList;
