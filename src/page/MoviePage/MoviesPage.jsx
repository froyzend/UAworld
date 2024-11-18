import { searchMovies } from "../../server/tmdb";
import { useEffect, useState } from "react";
import MovieList from "../../components/Movie/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { FcSearch } from "react-icons/fc";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={css.containerPage}>
      <h2 className={css.titleSearch}>Search your movie</h2>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={css.searchButton} type="submit">
          Search
          <FcSearch />
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
