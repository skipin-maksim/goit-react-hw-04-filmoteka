import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'cc24e28d216ef164940b9fd9893ff62a';

export const fetchMoviePopularAPI = async (pageNum = 1) => {
  try {
    const request = await axios.get(
      `/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${pageNum}`,
    );

    // throw new Error('ppc');

    if (request) {
      return request.data;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchDetailsMovieAPI = async id => {
  try {
    const request = await axios.get(`/movie/${id}?api_key=${apiKey}`);

    if (request) {
      return request;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchReview = async id => {
  try {
    const request = await axios.get(`movie/${id}/reviews?api_key=${apiKey}`);

    if (request) {
      return request.data;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCase = async id => {
  try {
    const request = await axios.get(`movie/${id}/credits?api_key=${apiKey}`);

    if (request) {
      return request.data;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchSearchMovie = async searchValue => {
  if (!searchValue) {
    return;
  }

  try {
    const request = await axios.get(
      `/search/movie?query=${searchValue}&page=1&api_key=${apiKey}`,
    );

    if (request) {
      return request.data.results;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
