import React from 'react';

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
  );
}
