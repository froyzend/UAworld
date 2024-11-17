import { Link } from "react-router-dom";
import { defaultImg, BASE_IMAGE_URL } from "../../page/MovieDetailsPage";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <div>
              <img
                src={
                  movie.poster_path
                    ? `${BASE_IMAGE_URL}${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <p>{movie.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
