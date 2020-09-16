import React, { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes';
import { fetchMovieDetails } from '../../services/moviesApi';
import { Cast } from '../Cast/Cast';
import { Reviews } from '../Reviews/Reviews';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage(props) {
  const [movie, setMovie] = useState({});
  const [from, setFrom] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      try {
        const getMovieDetails = await fetchMovieDetails(movieId);
        setMovie(getMovieDetails);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.status_message);
        }
      }
    })();
  }, [movieId]);

  useEffect(() => {
    setFrom(location.state && location.state.from ? location.state.from : '/');
    setSearch(
      location.state && location.state.search ? location.state.search : '',
    );
  }, [location.state]);

  const handelClick = () =>
    props.history.push({
      pathname: from,
      search: search,
    });

  return (
    <>
      <button type="button" onClick={handelClick} className={styles.btn}>
        Back
      </button>
      {(movie.id && (
        <>
          <div className={styles.movieCard}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                width="300"
                alt={movie.title || movie.name}
              />
            )}
            <div className={styles.descr}>
              <h2>{movie.title || movie.name}</h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview || 'This movie has no overview yet.'}</p>
              <h3>Genres</h3>
              <ul className={styles.genreList}>
                {movie.genres.map(el => (
                  <li key={el.id} className={styles.genreListItem}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.addInfo}>
            <p className={styles.addInfoTitle}>Additional information:</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${routes.movies}/${movie.id}/cast`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  <span className={styles.addInfoName}>Cast</span>
                </Link>
              </li>{' '}
              <li>
                <Link
                  to={{
                    pathname: `${routes.movies}/${movie.id}/reviews`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  <span className={styles.addInfoName}>Reviews</span>
                </Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path={`${routes.movieDetails}/cast`} component={Cast} />
            <Route
              path={`${routes.movieDetails}/reviews`}
              component={Reviews}
            />
          </Switch>
        </>
      )) ||
        (error && <p className={styles.error}>{error}</p>)}
    </>
  );
}

MovieDetailsPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
