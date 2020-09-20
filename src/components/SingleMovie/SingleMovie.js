import React from 'react';

import s from './SingleMovie.module.scss';

export default function SingleMovie({ movie }) {
  const {
    title,
    poster_path,
    genres,
    vote_average,
    overview,
    release_date,
  } = movie;

  return (
    <div className={s.SingleMovie}>
      <img className={s.PosterImg} src={poster_path} alt={title} />
      <div className={s.WrapperDetails}>
        <h2 className={(s.MovieDetailsTitle, s.MainTitle)}>
          {title} ({release_date})
        </h2>
        <p>User Score: {vote_average * 10}%</p>

        <h2 className={s.MovieDetailsTitle}>Overview</h2>
        <p>{overview}</p>
        <h2 className={s.MovieDetailsTitle}>Genres</h2>

        {genres && (
          <ul className={s.GenresMovie}>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
