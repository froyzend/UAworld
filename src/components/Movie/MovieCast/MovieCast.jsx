import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../../server/tmdb";
import { useState, useEffect } from "react";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const movieCast = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    movieCast();
  }, [movieId]);
  return (
    <div className={css.cast}>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li className={css.castItem} key={actor.id}>
            {actor.profile_path && (
              <img
                className={css.castImg}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p className={css.info}>{actor.name}</p>
            <p className={css.info}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
