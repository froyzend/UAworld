import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import MoviesPage from "./page/MoviePage/MoviesPage";
import MovieDetailsPage from "./page/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/Movie/MovieCast/MovieCast";
import MovieReviews from "./components/Movie/MovieReviews/MovieReviews";
import NotFoundPage from "./page/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
