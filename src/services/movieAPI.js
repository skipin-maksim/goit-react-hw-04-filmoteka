import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'cc24e28d216ef164940b9fd9893ff62a';

export const fetchMoviePopularAPI = async (pageNum = 1) => {
  try {
    const request = await axios.get(
      `/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${pageNum}`,
    );

    return request.data;
  } catch (err) {
    throw err;
  }
};

export const fetchDetailsMovieAPI = async id => {
  try {
    const request = await axios.get(`/movie/${id}?api_key=${apiKey}`);

    return request;
  } catch (err) {
    throw err;
  }
};

export const fetchReview = async id => {
  try {
    const request = await axios.get(`movie/${id}/reviews?api_key=${apiKey}`);

    return request.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCase = async id => {
  try {
    const request = await axios.get(`movie/${id}/credits?api_key=${apiKey}`);

    return request.data;
  } catch (err) {
    throw err;
  }
};

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
// https://api.themoviedb.org/3/movie/724989?api_key=cc24e28d216ef164940b9fd9893ff62a&language=en-US
