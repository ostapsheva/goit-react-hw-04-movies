import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import routes from '../../routes';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <NavLink
            exact
            to={routes.home}
            className={styles.Link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink
            to={{
              pathname: `${routes.movies}`,
            }}
            className={styles.Link}
            activeClassName={styles.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default withRouter(Nav);
