import "./App.css";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import SearchPage from "./Pages/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import React, { createContext } from "react";

export const ApiResponseContext = createContext();
function App() {
  const [apiResponse, setApiResponse] = useState(null); // api data stored
  const [searchKey, setSearchKey] = useState(null); // input search key stored
  const [type, setType] = useState("movie"); // type of search
  const [page, setPage] = useState(1); // page number

  const API_KEY = "69f85e4e"; // Your OMDB API Key

  const getSearchKey = useCallback(
    (key) => {
      setSearchKey(key);
    },
    [searchKey]
  );

  // fetch movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchKey}&type=${type}&page=${page}`
      );
      setApiResponse(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch API when search type changes or page number changes
  useEffect(() => {
    searchKey != null ? fetchMovies() : null;
  }, [type, page]);

  return (
    <BrowserRouter>
      <div className="lg:container flex flex-col mx-auto">
        <div className="flex justify-center">
          <NavBar getSearchKey={getSearchKey} fetchMovies={fetchMovies} />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/search"
            element={
              <ApiResponseContext.Provider
                value={{ apiResponse, setApiResponse, page, setPage }}
              >
                <SearchPage searchKey={searchKey} setType={setType} />
              </ApiResponseContext.Provider>
            }
          />
          <Route path="/movieDetails/:id" element={<MovieDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
