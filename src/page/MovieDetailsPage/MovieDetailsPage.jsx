import { useState, useEffect, Suspense } from "react";
import { Link, useParams, Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [movieData, setMovieData] = useState({
    movie: null,
    cast: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [movieDetails, movieCredits, movieReviews] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieReviews(movieId),
        ]);

        if (isMounted) {
          setMovieData({
            movie: movieDetails,
            cast: movieCredits.cast,
            reviews: movieReviews,
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch movie data", err);
          setError("Failed to fetch movie data");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
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

  if (!movieData.movie) {
    return <div>Movie not found</div>;
  }

  const {
    title = "Unknown title",
    overview = "No description",
    release_date = "Unknown date",
    vote_average = "No rating",
    poster_path,
  } = movieData.movie;

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
          {movieData.cast.length > 0 && (
            <Link className={css.link} to="cast" state={{ from: location }}>
              Cast
            </Link>
          )}
          {movieData.reviews.length > 0 && (
            <Link className={css.link} to="reviews" state={{ from: location }}>
              Reviews
            </Link>
          )}
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
