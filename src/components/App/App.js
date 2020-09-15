import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { fetchMoviePopularAPI } from '../../services/movieAPI';

// import Container from '../Container';
// import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';
import HomePage from '../HomePage/HomePage';
import MoviesPage from '../MoviesPage/MoviesPage';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';

class App extends Component {
  state = {
    films: [],
    page: 1,
    isLoader: false,
  };

  componentDidMount() {
    this.startFetch();
  }

  componentDidUpdate(prevProps, prevState) {}

  startFetch = async () => {
    const { page } = this.state;

    this.setState({ isLoader: true });

    try {
      const { results } = await fetchMoviePopularAPI(page);

      this.setState(prevState => ({
        films: [...prevState.films, ...results],
        page: prevState.page + 1,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoader: false });
    }
  };

  render() {
    const { isLoader, films } = this.state;

    return (
      <>
        <Navbar />

        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <HomePage {...props} isLoader={isLoader} moviesData={films} />
            )}
          />

          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
        </Switch>
      </>
    );
  }
}

export default App;
