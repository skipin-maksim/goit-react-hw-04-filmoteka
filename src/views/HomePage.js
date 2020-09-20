import React, { Component } from 'react';

import { collectFullUrlInArrayMovies } from '../helpers/collectFullUrl';
import { fetchMoviePopularAPI } from '../services/movieAPI';

import Loader from '../components/Loader/Loader';
import MoviesList from '../components/MoviesList/MoviesList';

import s from './allViewsStyles.module.scss';

export default class HomePage extends Component {
  state = {
    movies: [],
    isLoader: false,
  };

  componentDidMount() {
    this.onLoadHomePageFetch();
  }

  onLoadHomePageFetch = async () => {
    const { page } = this.state;

    this.setState({ isLoader: true });

    const { results } = await fetchMoviePopularAPI(page);

    const newArrMovies = collectFullUrlInArrayMovies(results);

    this.setState({
      movies: newArrMovies,
    });

    this.setState({ isLoader: false });
  };

  render() {
    const { isLoader, movies } = this.state;

    return (
      <>
        <h2 className={s.HomeTitle}>Popular today</h2>

        {isLoader && (
          <div className="Loader">
            <Loader />
          </div>
        )}

        {movies.length > 0 && <MoviesList movies={movies} {...this.props} />}
      </>
    );
  }
}
