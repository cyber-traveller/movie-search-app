import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieResultCard from "../Components/MovieResultCard";
import axios from "axios";
import { motion } from "framer-motion"; // Importing Framer Motion for animations

function MovieDetailPage() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const API_KEY = "69f85e4e"; // Your API key

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/search">
        <motion.div
          className="flex bg-white w-fit text-black rounded-md text-center px-2 py-1 ml-3 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-symbols-outlined">arrow</span>
          <span className="font-bold text-lg"> Back</span>
        </motion.div>
      </Link>

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MovieResultCard movieData={data} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default MovieDetailPage;
