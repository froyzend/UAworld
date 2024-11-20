import { useState, useEffect, Suspense } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
} from "../../server/tmdb";
import { ThreeDots } from "react-loader-spinner";
import BtnBack from "../../components/BtnBack/BtnBack";
import css from "./MovieDetailsPage.module.css";

export const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({
    movie: null,
    cast: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [movieDetails, movieCredits, movieReviews] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieReviews(movieId),
        ]);

        setMovieData({
          movie: movieDetails,
          cast: movieCredits.cast,
          reviews: movieReviews,
        });
      } catch (err) {
        console.error("Failed to fetch movie data", err);
        setError("Failed to fetch movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
        />
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
  }

  if (!movieData.movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className={css.container}>
      <BtnBack />
      <div className={css.gridContainer}>
        <img
          className={css.movieImg}
          src={
            movieData.movie.poster_path
              ? `${BASE_IMAGE_URL}${movieData.movie.poster_path}`
              : defaultImg
          }
          alt={movieData.movie.title}
        />
        <div className={css.contentColumn}>
          <h2 className={css.detalisTitle}>{movieData.movie.title}</h2>
          <div className={css.descriptionContainer}>
            <p>
              <strong>About the movie:</strong>{" "}
              {movieData.movie.overview || "No description"}
            </p>
          </div>
          <div className={css.movieInfo}>
            <p className={css.text}>
              <strong>Date of release:</strong>{" "}
              {movieData.movie.release_date || "No date"}
            </p>
            <p className={css.text}>
              <strong>Rating:</strong>{" "}
              {movieData.movie.vote_average || "No rating"} / 10
            </p>
          </div>
        </div>
        <div className={css.linkContainer}>
          <Link className={css.link} to="cast">
            Cast
          </Link>

          <Link className={css.link} to="reviews">
            Reviews
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
