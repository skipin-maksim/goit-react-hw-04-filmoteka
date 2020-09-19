import React, { Component } from 'react';

import { fetchCast } from '../../services/movieAPI';
import replaceUrl from '../../helpers/replaceUrl';

export default class Cast extends Component {
  state = { castData: [] };

  componentDidMount() {
    this.onLoadCastsOnMoviePage();
  }

  onLoadCastsOnMoviePage = async () => {
    const id = this.props.match.params.movieId;

    this.setState({ isLoader: true });

    const { cast } = await fetchCast(id);

    this.setState({ castData: replaceUrl(cast) });
    this.setState({ isLoader: false });
  };

  render() {
    const { castData, isLoader } = this.state;

    return (
      <div className="InfomationWrapper">
        {!isLoader && castData && (
          <ul className="MovieCastList">
            {castData.map(cast => {
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
