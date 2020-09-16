import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/moviesApi';

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      const getMovieReviews = await fetchMovieReviews(movieId);
      setReviews(getMovieReviews);
    })();
  }, [movieId]);

  return (
    <>
      {(reviews.length && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )) || <p>No reviews for this movie.</p>}
    </>
  );
}
