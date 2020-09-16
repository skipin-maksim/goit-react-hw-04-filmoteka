import React from 'react';

import Container from '../../components/Container';
import Loader from '../../components/Loader/Loader';
import MoviesItem from '../../components/MoviesList/MoviesItem';

export default function HomePage({ moviesData, isLoader, ...otherProps }) {
  return (
    <Container>
      <h2 className="HomeTitle">Popular today</h2>

      {isLoader && (
        <div className="Loader">
          <Loader />
        </div>
      )}

      {moviesData.length > 0 && (
        <ul className="MoviesList">
          {moviesData.map(({ id, ...moviesProps }) => (
            <MoviesItem key={id} id={id} {...moviesProps} {...otherProps} />
          ))}
        </ul>
      )}
    </Container>
  );
}
