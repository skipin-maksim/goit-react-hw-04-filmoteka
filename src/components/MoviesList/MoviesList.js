import React from 'react';

import MoviesItem from './MoviesItem';

export default function MoviesList({ movies, ...props }) {
  return (
    <ul className="MoviesList">
      {movies.map(({ id, ...moviesProps }) => (
        <MoviesItem key={id} id={id} {...moviesProps} {...props} />
      ))}
    </ul>
  );
}
