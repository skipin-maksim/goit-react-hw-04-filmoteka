import React from 'react';

export default function Reviews({ movieReviews }) {
  return (
    <div className="InfomationWrapper">
      <ul className="MovieReviewsList">
        {movieReviews.map(review => {
          return (
            <li key={review.id} className="MovieReviewsItem">
              <h3>Author {review.author}</h3>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
