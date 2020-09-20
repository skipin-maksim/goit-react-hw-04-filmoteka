import React, { Component } from 'react';

import { fetchCast } from '../../services/movieAPI';
import replaceUrl from '../../helpers/replaceUrl';

import s from './Cast.module.scss';

export default class Cast extends Component {
  state = { castData: [] };

  async componentDidMount() {
    const id = this.props.match.params.movieId;

    this.setState({ isLoader: true });

    const { cast } = await fetchCast(id);

    this.setState({ castData: replaceUrl(cast) });
    this.setState({ isLoader: false });
  }

  render() {
    const { castData, isLoader } = this.state;

    return (
      <div className={s.InfomationWrapper}>
        {!isLoader && castData && (
          <ul className={s.MovieCastList}>
            {castData.map(cast => {
              return (
                <li key={cast.cast_id} className={s.MovieCastItem}>
                  <img src={cast.profile_path} alt={cast.name} />
                  <h3 className={s.MovieCastName}>Name: {cast.name}</h3>
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
