import React, { Component } from 'react';

import { fetchReview } from '../../services/movieAPI';

import s from './Reviews.module.scss';
export default class Reviews extends Component {
  state = { reviewsData: [], reviewId: '' };

  async componentDidMount() {
    const { match } = this.props;

    const { results } = await fetchReview(match.params.movieId);

    this.setState({ reviewsData: results });
  }

  toggleShowFullReview = id => {
    /* non-homework function */
    const { reviewId } = this.state;

    this.setState(prevState => {
      if (prevState !== reviewId) {
        return { reviewId: id };
      }
    });

    if (reviewId === id) {
      return this.setState({ reviewId: '' });
    }
  };

  render() {
    const { reviewsData, reviewId } = this.state;

    return (
      <div className={s.InfomationWrapper}>
        {reviewsData.length > 0 && (
          <ul className={s.MovieReviewsList}>
            {reviewsData.map(review => {
              return (
                <li key={review.id} className={s.MovieReviewsItem}>
                  <h3>Author: {review.author}</h3>
                  {reviewId === review.id && <p>{review.content}</p>}
                  {reviewId !== review.id && (
                    <p>{review.content.slice(0, 250)}</p>
                  )}

                  <button
                    className={s.ReviewsMoreBtn}
                    type="button"
                    onClick={() => this.toggleShowFullReview(review.id)}
                  >
                    {reviewId === review.id ? ' Hide review' : 'Show review'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {reviewsData.length === 0 && (
          <p>We don't have any reviews for this movie.</p>
        )}
      </div>
    );
  }
}
