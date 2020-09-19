import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { fetchDetailsMovieAPI } from '../../services/movieAPI';
import { collectFullUrlInOneMovie } from '../../helpers/collectFullUrl';
import routes from '../../routes';

import Loader from '../../components/Loader/Loader';
import CastComponent from '../../components/Cast/Cast';
import ReviewsComponent from '../../components/Reviews/Reviews';

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
    const { match } = this.props;

    this.setState({ isLoader: true });

    const { data } = await fetchDetailsMovieAPI(match.params.movieId);
    const newArrMovies = collectFullUrlInOneMovie(data);

    this.setState({ movie: newArrMovies });

    this.setState({ isLoader: false });
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
    const {
      title,
      poster_path,
      genres,
      vote_average,
      overview,
      release_date,
    } = movie;

    const { path, url } = this.props.match;
    const { Cast, Reviews } = routes;

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

        <div className="SingleMovie">
          <img className="PosterImg" src={poster_path} alt={title} />
          <div className="WrapperDetails">
            <h2 className="MovieDetailsTitle MainTitle">
              {title} ({release_date})
            </h2>
            <p>User Score: {vote_average * 10}%</p>

            <h2 className="MovieDetailsTitle">Overview</h2>
            <p>{overview}</p>
            <h2 className="MovieDetailsTitle">Genres</h2>

            {genres && (
              <ul className="GenresMovie">
                {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="AditionalInfomation">
          <h2>Aditional infomation</h2>
          <ul className="AditionalInfomationList">
            <li>
              <NavLink
                to={{
                  pathname: `${url}${Cast}`,
                  state: { from: this.checkLocationState() },
                }}
                exact
                className="InfomationBtn"
                activeClassName="ActiveInfomationBtn"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}${Reviews}`,
                  state: { from: this.checkLocationState() },
                }}
                className="InfomationBtn"
                activeClassName="ActiveInfomationBtn"
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Route path={`${path}${Cast}`} component={CastComponent} />
          <Route path={`${path}${Reviews}`} component={ReviewsComponent} />
        </div>
      </>
    );
  }
}
