import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
// import queryString from '../../utils/get-query-params';

import {
  fetchDetailsMovieAPI,
  fetchReview,
  fetchCase,
} from '../../services/movieAPI';
import routes from '../../routes';
import { collectFullUrl } from '../../helpers/collectFullUrl';

import Container from '../Container';
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

    try {
      const { data } = await fetchDetailsMovieAPI(match.params.movieId);

      const collectUrlImg = collectFullUrl(data);

      this.setState({ movie: collectUrlImg });
    } catch (error) {
    } finally {
      this.setState({ isLoader: false });
    }
  };

  sliceReleaseDate = date => date.slice(0, 4);

  handleOpenReviews = id => {
    fetchReview(id).then(res => {
      const { results } = res;

      this.setState({ reviewsData: results });
    });
  };

  handleOpenCast = id => {
    fetchCase(id).then(results => {
      this.setState({ castData: results });
      console.log('fuf', results);
    });
  };

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      history.push(location.state.from);
    }
  };

  render() {
    const { movie, isLoader, reviewsData, castData } = this.state;
    const {
      id,
      title,
      poster_path,
      genres,
      vote_average,
      overview,
      release_date,
    } = movie;

    const { location, match } = this.props;

    // const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

    return (
      <Container>
        {isLoader && <Loader />}

        <button className="BackBtn" type="button" onClick={this.handleGoBack}>
          Back
        </button>

        <div className="SingleMovie">
          <img className="PosterImg" src={poster_path} alt={title} />
          <div className="WrapperDetails">
            <h2 className="MovieDetailsTitle MainTitle">
              {title} ({release_date && this.sliceReleaseDate(release_date)})
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
        <div>
          <h2>Aditional infomation</h2>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}${routes.Cast}`,
                  state: { from: location.state.from },
                }}
                exact
                onClick={() => this.handleOpenCast(id)}
                activeClassName="ActiveInfomationBtn"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}${routes.Reviews}`,
                  state: { from: location.state.from },
                }}
                onClick={() => this.handleOpenReviews(id)}
                activeClassName="ActiveInfomationBtn"
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Route
            path={`${match.path}${routes.Cast}`}
            render={props => <Cast {...props} movieCast={castData} />}
          />
          <Route
            path={`${match.path}${routes.Reviews}`}
            render={props => <Reviews {...props} movieReviews={reviewsData} />}
          />
        </div>
      </Container>
    );
  }
}
