import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import profileplaceholder from "../assets/profile.png";

function NavBar({ getSearchKey, fetchMovies }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Track current route for active link

  // Handle scroll to add blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }} // Initial animation
      animate={{ opacity: 1, y: 0 }} // Fade in and slide down
      transition={{ duration: 0.5 }}
      className={`${isScrolled ? "backdrop-blur-md bg-opacity-70" : null} 
        transition-colors duration-300 text-white p-2 md:p-4 fixed w-full top-0 z-50`}
    >
      <div className="md:container mx-auto flex items-center justify-between px-2 md:px-4">
        {/* Logo and Links */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/">
            <motion.h1
              whileHover={{ scale: 1.1 }}
              className="text-xl md:text-2xl font-bold text-[#00a8e1]"
            >
              MovieApp
            </motion.h1>
          </Link>
          <div className="hidden lg:flex space-x-6">
            <Link to="/">
              <motion.p
                whileHover={{ scale: 1.1 }}
                className={`${
                  location.pathname === "/" ? "text-[#00a8e1]" : "hover:text-[#00a8e1]"
                }`}
              >
                Home
              </motion.p>
            </Link>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-[#00a8e1]"
            >
              TV Shows
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-[#00a8e1]"
            >
              Movies
            </motion.a>
          </div>
        </div>

        {/* Search Bar and Profile */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <motion.input
              initial={{ width: "8rem" }} // Starting width
              whileFocus={{ width: "18rem" }} // Animate to larger width when focused
              className="bg-[#121212] placeholder:opacity-0 md:placeholder:opacity-100 text-white px-2 md:px-4 py-2 rounded-full w-32 sm:w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-[#00a8e1] transition-all duration-300 ease-linear text-sm md:text-base"
              type="text"
              placeholder="Search movies...."
              onChange={(e) => getSearchKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchMovies(); // Call fetchMovies when enter key is pressed
                }
              }}
            />
            <Link to="/search">
              <motion.svg
                onClick={() => fetchMovies()} // Trigger fetchMovies when icon is clicked
                whileHover={{ scale: 1.1 }}
                className="hover:bg-gray-600 p-1 absolute right-1 top-0 h-8 md:h-10 w-8 md:w-10 text-gray-400 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </motion.svg>
            </Link>
          </div>

          {/* Notifications and Profile */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="hover:text-[#00a8e1]"
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </motion.button>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={profileplaceholder}
              alt="Profile"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
