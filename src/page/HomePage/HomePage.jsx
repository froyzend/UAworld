import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../server/tmdb";
import MovieList from "../../components/Movie/MovieList/MovieList";
import css from "./HomePage.module.css";

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
    <main>
      <div className={css.homePage}>
        <h2 className="homeTitle">Trending movies</h2>
        <MovieList movies={movies} />
      </div>
    </main>
  );
};

export default HomePage;
