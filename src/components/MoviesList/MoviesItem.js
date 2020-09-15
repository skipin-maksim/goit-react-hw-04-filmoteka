import React from 'react';
import { Link } from 'react-router-dom';

export default function MoviesItem({ id, poster_path, title, match }) {
  const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

  return (
    <li className="MoviesItem">
      <Link
        to={{
          pathname: `movies/${id}`,
          state: { from: match.url },
        }}
      >
        <img
          className="ItemMovieImg"
          src={`${baseUrlImg}${poster_path}`}
          alt={title}
        />
        <h3 className="ItemMovieTitle">{title}</h3>
      </Link>
    </li>
  );
}

// onClick={() => onOpenMovieDetails(id)}
