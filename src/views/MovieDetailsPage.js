import React, { Component, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

import { fetchDetailsMovieAPI } from '../services/movieAPI';
import { collectFullUrlInOneMovie } from '../helpers/collectFullUrl';
import routes from '../routes';

import Loader from '../components/Loader/Loader';
import SingleMovie from '../components/SingleMovie/SingleMovie';
import AditionalInfomationList from '../components/AditionalInfomationList/AditionalInfomationList';

const AsyncCast = lazy(() =>
  import('../components/Cast/Cast' /* webpackChunkName: "details-cast" */),
);

const AsyncReviews = lazy(() =>
  import(
    '../components/Reviews/Reviews' /* webpackChunkName: "details-reviews" */
  ),
);

export default class MovieDetailsPage extends Component {
  state = {
    movie: {},
    isLoader: false,
    reviewsData: [],
    castData: [],
  };

  componentDidMount() {
    this.handleOpenMovieDetails();
  }

  handleOpenMovieDetails = async () => {
    const { match, history } = this.props;

    this.setState({ isLoader: true });

    const { data } = await fetchDetailsMovieAPI(match.params.movieId, history);
    if (data) {
      const newArrMovies = collectFullUrlInOneMovie(data);

      this.setState({ movie: newArrMovies });
      this.setState({ isLoader: false });
    }
  };

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    return history.push(routes.MoviesPage);
  };

  checkLocationState = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return state.from;
    }

    return '';
  };

  render() {
    const { movie, isLoader } = this.state;
    const { match } = this.props;

    return (
      <>
        {isLoader && (
          <div className="Loader">
            <Loader />
          </div>
        )}

        <button className="BackBtn" type="button" onClick={this.handleGoBack}>
          Back
        </button>

        <SingleMovie movie={movie} />

        <div className="AditionalInfomation">
          <h2>Aditional infomation</h2>

          <AditionalInfomationList
            url={match.url}
            onCheckLocationState={this.checkLocationState}
          />

          <Suspense fallback={<div>Loading...</div>}>
            <Route path={`${match.path}${routes.Cast}`} component={AsyncCast} />
            <Route
              path={`${match.path}${routes.Reviews}`}
              component={AsyncReviews}
            />
          </Suspense>
        </div>
      </>
    );
  }
}
