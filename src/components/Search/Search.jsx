import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(false);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDEzNzA5NWE3MmQ5NjcyOWYxMTBjNjk0ZmFhMDMwNyIsIm5iZiI6MTczMTIyMTM0MC4zMDMxNjczLCJzdWIiOiI2NzMwNTY2NTNjMTA0ZDg4YmRjNWIzOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XI7vyfkTZ58ehE5FkpCracS9BL-3bZW9o0QSUfMj8CM",
      },
    };

    try {
      const [nowPlayingData, popularData, topRatedData, upcomingData] =
        await Promise.all([
          fetch(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            options
          ).then((res) => res.json()),
          fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
            options
          ).then((res) => res.json()),
          fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            options
          ).then((res) => res.json()),
          fetch(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
            options
          ).then((res) => res.json()),
        ]);

      const allMovies = [
        ...nowPlayingData.results,
        ...popularData.results,
        ...topRatedData.results,
        ...upcomingData.results,
      ];

      const uniqueMovies = Array.from(
        new Map(allMovies.map(movie => [movie.id, movie])).values()
      );

      setMovies(uniqueMovies);
      setFilteredMovies(uniqueMovies);
    } catch (err) {
      setError(true);
      console.log("Error while fetching data from TMDB", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Movie...."
        />
      </div>
      {loading && <div>Loading....</div>}
      {error && <div>Error fetching data. Please try again later.</div>}
      {filteredMovies.length > 0 && (
        <div className="movies-list">
          <h2>Search Results</h2>
          <div className="movie-cards">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="movie-poster"
                />
                <h3>{movie.original_title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
