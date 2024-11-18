import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../../server/tmdb";
import { useState, useEffect } from "react";

import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const movieReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    };

    movieReviews();
  }, [movieId]);
  return (
    <div className={css.reviews}>
      <h2>Reviews</h2>
      <ul className={css.reviewsList}>
        {reviews.map((review) => (
          <li className={css.reviewsItem} key={review.id}>
            {review.author} - {review.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
