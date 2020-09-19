import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
// import queryString from '../../utils/get-query-params';

import { fetchDetailsMovieAPI } from '../../services/movieAPI';
import routes from '../../routes';
import { collectFullUrlInOneMovie } from '../../helpers/collectFullUrl';

import Loader from '../Loader/Loader';
import Cast from './Cast';
import Reviews from './Reviews';
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

    console.log(newArrMovies);

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
                  pathname: `${match.url}${routes.Cast}`,
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
                  pathname: `${match.url}${routes.Reviews}`,
                  state: { from: this.checkLocationState() },
                }}
                className="InfomationBtn"
                activeClassName="ActiveInfomationBtn"
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Route path={`${match.path}${routes.Cast}`} component={Cast} />
          <Route path={`${match.path}${routes.Reviews}`} component={Reviews} />
        </div>
      </>
    );
  }
}
