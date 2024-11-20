import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{
  /*
  import HomePage from "./page/HomePage/HomePage";
import MoviesPage from "./page/MoviePage/MoviesPage";
import MovieDetailsPage from "./page/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/Movie/MovieCast/MovieCast";
import MovieReviews from "./components/Movie/MovieReviews/MovieReviews";
import NotFoundPage from "./page/NotFoundPage"; */
}

import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./page/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./page/MoviePage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./page/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/Movie/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/Movie/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
