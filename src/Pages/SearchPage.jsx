import React from "react";
import MovieList from "../Components/MovieList";
import { motion } from "framer-motion"; // Import Framer Motion

function SearchPage({ searchKey, setType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation
      animate={{ opacity: 1, y: 0 }} // Smooth fade-in and slide-up
      transition={{ duration: 0.5 }}
      className="mt-20 mb-10 p-10"
    >
      {/* Search Result Title and Filter */}
      <motion.div
        className="flex flex-col w-fit gap-3 my-2"
        initial={{ opacity: 0, y: 10 }} // Subtle animation for filter section
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.h3
          className="font-bold text-lg"
          whileHover={{ scale: 1.1, color: "#00a8e1" }} // Animation on hover
        >
          Result for "{searchKey}"
        </motion.h3>

        <motion.select
          name="type"
          id="type"
          onChange={(e) => {
            e.preventDefault();
            setType(e.target.value);
          }}
          className="bg-gray-800 text-white max-w-fit p-3 rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 focus:ring-2 focus:ring-[#00a8e1] transition-all duration-200 ease-linear"
          whileFocus={{ scale: 1.05 }} // Slight scale when focused
          whileHover={{ scale: 1.02 }} // Slight scale when hovered
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </motion.select>
      </motion.div>

      <hr className="border-gray-700 my-4" />

      {/* Movie List Component */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <MovieList />
      </motion.div>
    </motion.div>
  );
}

export default SearchPage;
