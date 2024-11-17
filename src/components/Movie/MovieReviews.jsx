import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../server/tmdb";
import { useState, useEffect } from "react";

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
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.author} - {review.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
