import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/moviesApi';
import routes from '../../routes';
import styles from './HomePage.module.css';

function HomePage(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    })();
  }, []);

  return (
    <>
      <h1 className={styles.title}>Trending Today</h1>
      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.moviesListItem}>
            <Link
              to={{
                pathname: `${routes.movies}/${movie.id}`,
                state: { from: props.location.pathname },
              }}
            >
              <span className={styles.moviesName}>
                {movie.title || movie.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default HomePage;
