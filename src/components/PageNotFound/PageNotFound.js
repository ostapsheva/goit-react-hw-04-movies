import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageNotFound.module.css';

function PageNotFound(props) {
  const handelClick = () => {
    props.history.push({
      pathname: '/',
    });
  };

  return (
    <>
      <button type="button" onClick={handelClick} className={styles.btn}>
        Home
      </button>
      <h2 className="descr">Oops! Page not found:(</h2>
    </>
  );
}

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default PageNotFound;
