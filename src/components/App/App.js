import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { fetchMoviePopularAPI } from '../../services/movieAPI';
import routes from '../../routes';
import { collectFullUrl } from '../../helpers/collectFullUrl';

// import Container from '../Container';
// import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';
import HomePage from '../../views/HomePage/HomePage';
import MoviesPage from '../../views/MoviesPage/MoviesPage';
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

      const collectUrlImg = collectFullUrl(results);

      this.setState(prevState => ({
        films: [...prevState.films, ...collectUrlImg],
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
            path={routes.HomePage}
            exact
            render={props => (
              <HomePage {...props} isLoader={isLoader} moviesData={films} />
            )}
          />

          <Route path={routes.MoviesPage} exact component={MoviesPage} />
          <Route path={routes.MovieDetailsPage} component={MovieDetailsPage} />
        </Switch>
      </>
    );
  }
}

export default App;
