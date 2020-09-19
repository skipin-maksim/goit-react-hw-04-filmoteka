import React, { Component } from 'react';

import { fetchSearchMovie } from '../services/movieAPI';
import { collectFullUrlInArrayMovies } from '../helpers/collectFullUrl';
import getQueryParams from '../utils/get-query-params';

import Loader from '../components/Loader/Loader';
import SearchForm from '../components/SearchForm/SearchForm';
import MoviesList from '../components/MoviesList/MoviesList';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    inputValue: '',
    isLoader: false,
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const { query } = getQueryParams(location.search);

      this.onSearchFetch(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;

    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(location.search);

    if (prevQuery !== nextQuery) {
      this.onSearchFetch(nextQuery);
    }
  }

  onSearchFetch = async query => {
    this.setState({ isLoader: true });

    const results = await fetchSearchMovie(query);
    const newArrMovies = collectFullUrlInArrayMovies(results);

    this.setState({
      movies: newArrMovies,
    });

    this.setState({ isLoader: false });
  };

  getSearchQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (inputValue) {
      this.getSearchQuery(inputValue);
    }

    this.resetStateInputValue();
  };

  handleOnChangeInput = targetValue => {
    this.setState({ inputValue: targetValue });
  };

  resetStateInputValue = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue, isLoader, movies } = this.state;
    return (
      <>
        <SearchForm
          inputValue={inputValue}
          onChangeInput={this.handleOnChangeInput}
          onSubmit={this.handleSubmit}
        />

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
