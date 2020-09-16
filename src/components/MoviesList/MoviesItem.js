import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

export default function MoviesItem({
  id,
  poster_path,
  title,
  match,
  location,
}) {
  //todo
  // const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

  return (
    <li className="MoviesItem">
      <Link
        to={{
          pathname: `${routes.MoviesPage}/${id}`,
          state: { from: location },
        }}
      >
        <img className="ItemMovieImg" src={poster_path} alt={title} />
        <h3 className="ItemMovieTitle">{title}</h3>
      </Link>
    </li>
  );
}
