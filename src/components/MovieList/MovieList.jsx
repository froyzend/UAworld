import { Link, useLocation } from "react-router-dom";
import {
  defaultImg,
  BASE_IMAGE_URL,
} from "../../page/MovieDetailsPage/MovieDetailsPage";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.listMovies}>
      {movies.map((movie) => (
        <li className={css.itemMovie} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <div>
              <img
                className={css.img}
                src={
                  movie.poster_path
                    ? `${BASE_IMAGE_URL}${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
              />
              <p className={css.title}>{movie.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
