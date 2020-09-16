import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { fetchMoviesWithQuery } from '../../services/moviesApi';
import routes from '../../routes';
import styles from './SearchPage.module.css';

function SearchPage(props) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [notice, setNotice] = useState('');
  const location = useLocation();
  const search = queryString.parse(location.search);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    props.history.push({
      search: `query=${query}`,
    });
    setQuery('');
  };

  useEffect(() => {
    search.query &&
      fetchMoviesWithQuery(search.query)
        .then(results => {
          if (results.length) {
            setNotice('');
            setMovies(results);
          } else {
            setMovies([]);
            setNotice(
              'Not found:( Enter the correct movie name and try again.',
            );
          }
        })
        .catch(error => setNotice(error.response.data.status_message));
  }, [search.query]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search movies</h2>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
        />

        <button type="submit" className={styles.btn}>
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>

      <ul className={styles.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.moviesListItem}>
            <Link
              to={{
                pathname: `${routes.movies}/${movie.id}`,
                state: {
                  search: location && location.search ? location.search : '',
                  from: props.location.pathname,
                },
              }}
            >
              <span className={styles.moviesName}>
                {movie.title || movie.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {notice && <p className={styles.notice}>{notice}</p>}
    </div>
  );
}

SearchPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default SearchPage;
