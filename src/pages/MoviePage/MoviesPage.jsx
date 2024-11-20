import { searchMovies } from "../../server/tmdb";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { FcSearch } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  {
    /* Работа с URL-параметрами */
  }

  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  {
    /* Локальное состояние для поля ввода, начальное значение из URL-параметров */
  }

  const [movies, setMovies] = useState([]);
  {
    /* Состояние для сохранения списка фильмов */
  }

  const query = searchParams.get("query") || "";
  {
    /* Получаем текущий параметр поиска из URL или пустую строку */
  }

  useEffect(() => {
    if (query.trim() === "") {
      {
        /* Если запрос пуст, очищаем список фильмов */
      }
      setMovies([]);
      return;
    }
    const fetchMovies = async () => {
      try {
        const searchResults = await searchMovies(query);
        {
          /* Запрос к API для поиска фильмов */
        }
        setMovies(searchResults);
        {
          /* Сохраняем результаты поиска в состоянии */
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [query]);
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      /* Предотвращаем перезагрузку страницы */
    }

    const trimmedQuery = inputValue.trim();
    {
      /* Убираем лишние пробелы в начале и конце строки */
    }

    if (trimmedQuery) {
      setSearchParams({ query: trimmedQuery });
      {
        /* Обновляем URL-параметры для выполнения поиска */
      }
    }
  };

  return (
    <div className={css.containerPage}>
      <h2 className={css.titleSearch}>Search your movie</h2>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          value={
            inputValue
          } /* Значение поля ввода привязано к локальному состоянию */
          onChange={(e) =>
            setInputValue(e.target.value)
          } /* Обновляем состояние `inputValue` при изменении текста */
          placeholder="Search movies..."
        />
        <button className={css.searchButton} type="submit">
          Search
          <FcSearch />
        </button>
      </form>
      <MovieList movies={movies} />
      {/* Передаем список найденных фильмов в компонент `MovieList` */}
    </div>
  );
};

export default MoviesPage;
