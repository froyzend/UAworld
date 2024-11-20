import { useState, useEffect, Suspense } from "react";
import { Link, useParams, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../server/tmdb";
import { ThreeDots } from "react-loader-spinner";
import BtnBack from "../../components/BtnBack/BtnBack";
import css from "./MovieDetailsPage.module.css";

export const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <ThreeDots visible={true} height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.errorContainer}>
        <p style={{ color: "red" }}>{error}</p>
        <BtnBack />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const {
    title = "Unknown title",
    overview = "No description",
    release_date = "Unknown date",
    vote_average = "No rating",
    poster_path,
  } = movie;

  return (
    <div className={css.container}>
      <BtnBack />
      <div className={css.gridContainer}>
        <img
          className={css.movieImg}
          src={poster_path ? `${BASE_IMAGE_URL}${poster_path}` : defaultImg}
          alt={title}
        />
        <div className={css.contentColumn}>
          <h2 className={css.detailsTitle}>{title}</h2>
          <div className={css.descriptionContainer}>
            <p>
              <strong>About the movie:</strong> {overview}
            </p>
          </div>
          <div className={css.movieInfo}>
            <p className={css.text}>
              <strong>Date of release:</strong> {release_date}
            </p>
            <p className={css.text}>
              <strong>Rating:</strong> {vote_average} / 10
            </p>
          </div>
        </div>
        <div className={css.linkContainer}>
          <Link className={css.link} to="cast" state={{ from: location }}>
            Cast
          </Link>
          <Link className={css.link} to="reviews" state={{ from: location }}>
            Reviews
          </Link>
        </div>
      </div>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <ThreeDots visible={true} height="80" width="80" color="#4fa94d" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
