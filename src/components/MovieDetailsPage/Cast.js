import React from 'react';

import replaceUrl from '../../helpers/replaceUrl';

export default function Cast({ movieCast }) {
  const newDetailsData = replaceUrl(movieCast);

  return (
    <div className="InfomationWrapper">
      {newDetailsData.cast && (
        <ul className="MovieCastList">
          {newDetailsData.cast.map(cast => {
            return (
              <li key={cast.cast_id} className="MovieCastItem">
                <img src={cast.profile_path} alt={cast.name} />
                <h3 className="MovieCastName">Name: {cast.name}</h3>
                <p>Character: {cast.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
