import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import MoviesPage from "./page/MoviesPage";
import MovieDetailsPage from "./page/MovieDetailsPage";
import MovieCast from "./components/Movie/MovieCast";
import MovieReviews from "./components/Movie/MovieReviews";
import NotFoundPage from "./page/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="App">
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
