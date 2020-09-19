import React, { Component } from 'react';

import { fetchReview } from '../../services/movieAPI';
export default class Reviews extends Component {
  state = { reviewsData: [] };

  componentDidMount() {
    this.onLoadReviewsOnMoviePage();
  }

  onLoadReviewsOnMoviePage = async () => {
    const { match } = this.props;

    const { results } = await fetchReview(match.params.movieId);

    this.setState({ reviewsData: results });
  };

  render() {
    const { reviewsData } = this.state;

    return (
      <div className="InfomationWrapper">
        {reviewsData.length > 0 && (
          <ul className="MovieReviewsList">
            {reviewsData.map(review => {
              return (
                <li key={review.id} className="MovieReviewsItem">
                  <h3>Author: {review.author}</h3>
                  <p>{review.content}</p>
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
