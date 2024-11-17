import { useState, useEffect } from "react";
import { getTrendingMovies } from "../server/tmdb";
import MovieList from "../components/Movie/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Trending movies</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
