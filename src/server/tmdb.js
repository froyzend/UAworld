import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzlkYjhkMGZlMTg1NTBkMmRlMzgzNmI1YzJlY2JmZCIsIm5iZiI6MTczMTY4MDQ0OC4yNzMyNDQ2LCJzdWIiOiI2NzJjODNiZGQ5OGJiYzM5NzdhZDFlOTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._1syfXQ8vtlXXneE4RJBJfKxPYaoM8VgLNavyHMQzi8";

const BASE_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await apiClient.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await apiClient.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await apiClient(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const { data } = await apiClient.get(`/movie/${movieId}/credits`);
  return data;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await apiClient.get(`/movie/${movieId}/reviews`);
  return data.results;
};
