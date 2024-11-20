import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../server/tmdb";
import MovieList from "../../components/Movie/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        console.error("Failed to fetch trending movies:", err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <div className={css.homePage}>
        <h2 className={css.homeTitle}>Trending movies</h2>
        <MovieList movies={movies} />
      </div>
    </main>
  );
};

export default HomePage;
