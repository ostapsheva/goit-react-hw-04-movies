import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchMovieCast } from '../../services/moviesApi';
import styles from './Cast.module.css';

export function Cast() {
  const [cast, setCast] = useState([]);
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      const getMovieCast = await fetchMovieCast(movieId);
      setCast(getMovieCast);
    })();
  }, [movieId]);

  return (
    <>
      {(cast.length && (
        <ul className={styles.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={styles.castListItem}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  width="200"
                  alt={actor.name}
                />
              )}
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )) || <p className={styles.notFound}>Not found.</p>}
    </>
  );
}
