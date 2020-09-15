import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { fetchDetailsMovieAPI } from '../../services/movieAPI';

import Container from '../Container';
import Loader from '../Loader/Loader';

export default class MovieDetailsPage extends Component {
  state = {
    movie: {},
    isLoader: false,
  };

  componentDidMount() {
    this.handleOpenMovieDetails();
  }

  handleOpenMovieDetails = async () => {
    const { match } = this.props;

    this.setState({ isLoader: true });

    try {
      const { data } = await fetchDetailsMovieAPI(match.params.movieId);

      this.setState({ movie: data });
    } catch (error) {
    } finally {
      this.setState({ isLoader: false });
    }
  };

  sliceReleaseDate = date => date.slice(0, 4);

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

    const { location } = this.props;

    const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

    console.log(movie);
    console.log(genres);

    return (
      <Container>
        {isLoader && <Loader />}

        <Link to={location.state.from} className="BackBtn">
          Back
        </Link>

        <div className="SingleMovie">
          <img
            className="PosterImg"
            src={`${baseUrlImg}${poster_path}`}
            alt={title}
          />
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
      </Container>
    );
  }
}
