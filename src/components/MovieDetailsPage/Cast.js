import React, { Component } from 'react';

import { fetchCase } from '../../services/movieAPI';
import replaceUrl from '../../helpers/replaceUrl';

export default class Cast extends Component {
  state = { castData: [] };

  componentDidMount() {
    const id = this.props.match.params.movieId;

    fetchCase(id).then(results => {
      this.setState({ castData: replaceUrl(results) });
    });
  }

  render() {
    const { castData } = this.state;

    return (
      <div className="InfomationWrapper">
        {castData.cast && (
          <ul className="MovieCastList">
            {castData.cast.map(cast => {
              return (
                <li key={cast.cast_id} className="MovieCastItem">
                  <img src={cast.profile_path} alt={cast.name} />
                  <h3 className="MovieCastName">Name: {cast.name}</h3>
                  <div>Character: {cast.character}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
